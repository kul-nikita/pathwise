import { closeMongoClient, getDb } from "@/lib/db/mongo";
import { learningResourceSchema } from "@/lib/db/schemas";
import { allResources } from "@/seed/data";
import { demoEvidence } from "@/lib/data/demo-catalog";
import { DEMO_LEARNER_ID } from "@/lib/constants";
import type { LearningResource } from "@/lib/types";

async function main() {
  const parsed = allResources.map((resource) => learningResourceSchema.parse(resource));
  const db = await getDb();
  const collection = db.collection<LearningResource & { _id: string }>("learning_resources");

  await collection.deleteMany({});
  await collection.insertMany(parsed.map((resource) => ({ ...resource, _id: resource.id })));
  await collection.createIndex({ skillTags: 1 });
  await collection.createIndex({ id: 1 }, { unique: true });

  // Learner-state collections: indexed now so the first real write is fast.
  await db.collection("learner_profile").createIndex({ learnerId: 1 }, { unique: true });
  await db.collection("events").createIndex({ learnerId: 1, timestamp: 1 });
  await db.collection("evidence").createIndex({ learnerId: 1, createdAt: 1 });

  // Auth collections. The unique email index is what makes concurrent signups
  // safe; TTL on sessions/attempts expires them without a cleanup job.
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("users").createIndex({ id: 1 }, { unique: true });
  await db.collection("sessions").createIndex({ tokenHash: 1 }, { unique: true });
  await db.collection("sessions").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await db.collection("login_attempts").createIndex({ key: 1 }, { unique: true });
  await db.collection("login_attempts").createIndex({ firstAttemptAt: 1 }, { expireAfterSeconds: 3600 });

  // Sample wallet for the demo learner, so the evidence page has real rows to read.
  const evidence = db.collection("evidence");
  await evidence.deleteMany({ learnerId: DEMO_LEARNER_ID });
  await evidence.insertMany(demoEvidence.map((row) => ({ ...row, learnerId: DEMO_LEARNER_ID })));

  console.log(`Seeded ${parsed.length} learning resources into MongoDB (db: ${db.databaseName}).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(closeMongoClient);
