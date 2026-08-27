/** Stand-in learner until auth lands; every learner query is already scoped by id. */
export const DEMO_LEARNER_ID = "demo-learner";

export const DEFAULT_PREFERENCES = {
  maxHoursPerStep: 4,
  cost: "free",
  format: "lab"
} as const;

export const DEFAULT_WEEKLY_HOURS = 8;
