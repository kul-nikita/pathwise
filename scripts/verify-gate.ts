import { gateResources } from "@/lib/graph/queries";

/**
 * The prerequisite gate is Cypher, so vitest cannot reach it — this asserts the
 * rule against the real seeded graph instead. Run with `npm run graph:verify`.
 *
 * The case that matters: a resource declaring NO prerequisites of its own must
 * still be blocked by the prerequisite chain of the skill it teaches. Without
 * that, any catalog row could unlock any skill just by leaving a field empty.
 */
const CASES: Array<{
  name: string;
  resourceId: string;
  mastery: Record<string, number>;
  expectUnmet: string[];
}> = [
  {
    name: "resource with no declared prerequisites is still gated by the taught skill's chain",
    resourceId: "kaggle-data-visualization",
    mastery: {},
    expectUnmet: ["spreadsheet-fundamentals", "statistics-basics"]
  },
  {
    name: "partially met chain reports only what is still missing",
    resourceId: "kaggle-data-visualization",
    mastery: { "spreadsheet-fundamentals": 0.9 },
    expectUnmet: ["statistics-basics"]
  },
  {
    name: "fully met chain unlocks the resource",
    resourceId: "kaggle-data-visualization",
    mastery: { "spreadsheet-fundamentals": 0.9, "statistics-basics": 0.9 },
    expectUnmet: []
  },
  {
    name: "a resource is never blocked by a skill it teaches itself",
    resourceId: "data-to-viz",
    mastery: { "spreadsheet-fundamentals": 0.9, "statistics-basics": 0.9 },
    expectUnmet: []
  },
  {
    name: "transitive chain is walked, not just direct prerequisites",
    resourceId: "splunk-search-tutorial",
    mastery: { "networking-basics": 0.9, "linux-fundamentals": 0.9 },
    expectUnmet: []
  }
];

async function main() {
  let failed = 0;

  for (const testCase of CASES) {
    const [gate] = await gateResources([testCase.resourceId], testCase.mastery);
    const actual = [...(gate?.unmetPrerequisites ?? [])].sort();
    const expected = [...testCase.expectUnmet].sort();
    const ok = JSON.stringify(actual) === JSON.stringify(expected);

    if (!ok) {
      failed += 1;
    }
    console.log(`${ok ? "PASS" : "FAIL"}  ${testCase.name}`);
    if (!ok) {
      console.log(`      expected [${expected}] but got [${actual}]`);
    }
  }

  console.log(failed === 0 ? "\nGate holds." : `\n${failed} gate check(s) failed.`);
  process.exit(failed === 0 ? 0 : 1);
}

main();
