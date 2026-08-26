import { getDb } from "@/lib/db/mongo";
import type { LearningResource } from "@/lib/types";

const COLLECTION = "learning_resources";

async function collection() {
  return (await getDb()).collection<LearningResource & { _id: string }>(COLLECTION);
}

export async function findResourcesByIds(ids: string[]): Promise<LearningResource[]> {
  if (ids.length === 0) {
    return [];
  }

  const rows = await (await collection()).find({ id: { $in: ids } }).toArray();
  return rows.map(stripMongoId);
}

export async function findResourcesBySkill(skillId: string): Promise<LearningResource[]> {
  const rows = await (await collection()).find({ skillTags: skillId }).toArray();
  return rows.map(stripMongoId);
}

export async function countResources(): Promise<number> {
  return (await collection()).countDocuments();
}

function stripMongoId(row: LearningResource & { _id?: string }): LearningResource {
  const { _id: _ignored, ...resource } = row;
  return resource;
}
