import { allResources } from "@/seed/data";
import { getQdrantClient } from "@/lib/vector/qdrant";
import { EMBEDDING_DIMENSIONS, embedText } from "@/lib/vector/embeddings";
import { COLLECTION } from "@/lib/vector/search";
import { pointIdForResource } from "@/lib/vector/point-id";

/** Spacing between embedding calls, to stay under the free-tier rate limit. */
const REQUEST_SPACING_MS = 400;
const MAX_ATTEMPTS = 6;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Seeding embeds every catalog row in one run, which reliably trips the API's
 * per-minute quota. A 429 is a "wait", not a failure, so honour the server's
 * own retryDelay when it sends one and fall back to exponential backoff.
 */
async function embedWithRetry(text: string): Promise<number[]> {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await embedText(text, "RETRIEVAL_DOCUMENT");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isRateLimit = message.includes("429") || message.includes("RESOURCE_EXHAUSTED");

      if (!isRateLimit || attempt >= MAX_ATTEMPTS) {
        throw error;
      }

      const suggested = Number(message.match(/"retryDelay":\s*"(\d+)s"/)?.[1]);
      const waitMs = Number.isFinite(suggested) ? (suggested + 1) * 1000 : 2 ** attempt * 1000;
      console.log(`  rate limited, waiting ${Math.round(waitMs / 1000)}s (attempt ${attempt})`);
      await sleep(waitMs);
    }
  }
}

async function main() {
  const client = getQdrantClient();

  await client.recreateCollection(COLLECTION, {
    vectors: { size: EMBEDDING_DIMENSIONS, distance: "Cosine" }
  });

  const points = [];
  for (const [index, resource] of allResources.entries()) {
    const vector = await embedWithRetry(
      `${resource.title}\n${resource.description}\n${resource.skillTags.join(" ")}`
    );

    points.push({
      // Derived from the slug so re-indexing one resource replaces its own
      // point. See lib/vector/point-id.
      id: pointIdForResource(resource.id),
      vector,
      payload: {
        resourceId: resource.id,
        skillTags: resource.skillTags,
        difficulty: resource.difficulty,
        resourceType: resource.resourceType
      }
    });

    if ((index + 1) % 25 === 0) {
      console.log(`  embedded ${index + 1}/${allResources.length}`);
    }
    await sleep(REQUEST_SPACING_MS);
  }

  // Upsert in batches so one oversized request body cannot fail the whole run.
  for (let start = 0; start < points.length; start += 100) {
    await client.upsert(COLLECTION, { wait: true, points: points.slice(start, start + 100) });
  }

  console.log(`Indexed ${points.length} resources into Qdrant collection "${COLLECTION}".`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
