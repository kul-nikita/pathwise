import { getQdrantClient } from "@/lib/vector/qdrant";
import { embedText } from "@/lib/vector/embeddings";
import { COLLECTION } from "@/lib/vector/search";
import { pointIdForResource } from "@/lib/vector/point-id";
import type { LearningResource } from "@/lib/types";

/** Same text shape the seed script embeds, so ranking stays comparable. */
function documentText(resource: LearningResource) {
  return `${resource.title}\n${resource.description}\n${resource.skillTags.join(" ")}`;
}

export async function indexResource(resource: LearningResource): Promise<void> {
  const vector = await embedText(documentText(resource), "RETRIEVAL_DOCUMENT");

  await getQdrantClient().upsert(COLLECTION, {
    wait: true,
    points: [
      {
        id: pointIdForResource(resource.id),
        vector,
        payload: {
          resourceId: resource.id,
          skillTags: resource.skillTags,
          difficulty: resource.difficulty,
          resourceType: resource.resourceType
        }
      }
    ]
  });
}

export async function removeResourceFromIndex(resourceId: string): Promise<void> {
  await getQdrantClient().delete(COLLECTION, {
    wait: true,
    points: [pointIdForResource(resourceId)]
  });
}
