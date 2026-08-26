import { Resolver } from "node:dns/promises";
import { MongoClient, type Db } from "mongodb";

const DB_NAME = process.env.MONGODB_DB ?? "skillforge";

/**
 * `mongodb+srv://` requires SRV + TXT lookups. Some environments (Next.js dev
 * here) hand Node a loopback resolver that answers ECONNREFUSED, and Node does
 * not fall through to the next server. Mutating the global resolver list races
 * with framework init, so instead we resolve the records ourselves with an
 * explicit resolver and hand the driver a plain `mongodb://` seed list.
 * Set DNS_SERVERS to point at your own resolvers.
 */
const DNS_SERVERS = (process.env.DNS_SERVERS ?? "8.8.8.8,1.1.1.1").split(",").map((s) => s.trim());

/**
 * Each serverless instance keeps its own pool, so a large pool multiplied by
 * many concurrent instances can exhaust an Atlas free-tier connection limit.
 */
const MAX_POOL_SIZE = Number(process.env.MONGODB_MAX_POOL_SIZE ?? 10);

/**
 * Returns the original `mongodb+srv://` URI when explicit resolution is not
 * possible, letting the driver do its own SRV lookup. Serverless sandboxes
 * (Vercel) may block outbound DNS to a public resolver, and there the platform
 * resolver works fine — so the workaround must never be the only path.
 */
async function resolveSrvUri(uri: string): Promise<string> {
  if (!uri.startsWith("mongodb+srv://")) {
    return uri;
  }

  try {
    return await resolveSrvViaExplicitDns(uri);
  } catch (error) {
    console.warn(
      `[mongo] explicit SRV resolution failed (${
        error instanceof Error ? error.message : error
      }); falling back to the driver's own SRV lookup.`
    );
    return uri;
  }
}

async function resolveSrvViaExplicitDns(uri: string): Promise<string> {
  const url = new URL(uri);
  const srvHost = url.hostname;
  const resolver = new Resolver();
  resolver.setServers(DNS_SERVERS);

  const [records, txtChunks] = await Promise.all([
    resolver.resolveSrv(`_mongodb._tcp.${srvHost}`),
    resolver.resolveTxt(srvHost).catch(() => [] as string[][])
  ]);

  if (records.length === 0) {
    throw new Error(`No SRV records for ${srvHost}`);
  }

  const seedList = records.map((record) => `${record.name}:${record.port}`).join(",");
  const params = new URLSearchParams(url.search);
  // TXT carries connection options (authSource, replicaSet); explicit ones win.
  for (const [key, value] of new URLSearchParams(txtChunks.flat().join("&"))) {
    if (!params.has(key)) {
      params.set(key, value);
    }
  }
  params.set("tls", "true");
  params.set("authSource", params.get("authSource") ?? "admin");

  const credentials = url.username ? `${url.username}:${url.password}@` : "";
  return `mongodb://${credentials}${seedList}/${url.pathname.replace(/^\//, "")}?${params}`;
}

/**
 * Cached on globalThis for the same reason as the Neo4j driver: Next.js dev
 * HMR would otherwise open a new connection pool on every reload.
 */
const globalForMongo = globalThis as typeof globalThis & {
  __mongoConnecting?: Promise<MongoClient>;
};

export async function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is required for MongoDB operations.");
  }

  // Share one in-flight connect across concurrent route handlers and reloads.
  globalForMongo.__mongoConnecting ??= resolveSrvUri(uri).then((resolved) =>
    new MongoClient(resolved, { maxPoolSize: MAX_POOL_SIZE }).connect()
  );

  try {
    return await globalForMongo.__mongoConnecting;
  } catch (error) {
    globalForMongo.__mongoConnecting = undefined; // let the next request retry
    throw error;
  }
}

export async function getDb(): Promise<Db> {
  return (await getMongoClient()).db(DB_NAME);
}

export async function closeMongoClient() {
  const pending = globalForMongo.__mongoConnecting;
  globalForMongo.__mongoConnecting = undefined;
  await pending?.then((c) => c.close()).catch(() => undefined);
}
