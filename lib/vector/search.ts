import { getQdrantClient } from "@/lib/vector/qdrant";
import { embedText } from "@/lib/vector/embeddings";

export const COLLECTION = "learning_resources";

export type SemanticHit = {
  resourceId: string;
  similarity: number;
};

/**
 * Widens the candidate pool when a learner's phrasing doesn't line up with any
 * skill tag ("catching phishing emails"). Returns resource ids only — every hit
 * still has to pass the Neo4j prerequisite gate before it can be shown, so this
 * can never smuggle a resource past sequencing.
 */
export async function searchResources(query: string, limit = 10): Promise<SemanticHit[]> {
  const vector = await embedText(query, "RETRIEVAL_QUERY");
  const client = getQdrantClient();

  // This client exposes the unified `query` endpoint rather than `search`.
  const { points } = await client.query(COLLECTION, {
    query: vector,
    limit,
    with_payload: true
  });

  return points
    .map((hit) => ({
      resourceId: String(hit.payload?.resourceId ?? ""),
      similarity: hit.score
    }))
    .filter((hit) => hit.resourceId.length > 0);
}
