import { QdrantClient } from "@qdrant/js-client-rest";

export function getQdrantClient() {
  const url = process.env.QDRANT_URL;
  const apiKey = process.env.QDRANT_API_KEY;

  if (!url) {
    throw new Error("QDRANT_URL is required for Qdrant operations.");
  }

  return new QdrantClient({
    url,
    apiKey
  });
}
