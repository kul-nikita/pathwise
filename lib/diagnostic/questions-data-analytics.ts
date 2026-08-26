import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

/**
 * Data & Analytics ladder. One question per (skill, difficulty) — `engine.ts`
 * needs all three tiers for every skill a role requires, which
 * `engine.test.ts` asserts for every seeded role.
 */
export const dataAnalyticsQuestions: DiagnosticQuestion[] = [
  // spreadsheet-fundamentals
  {
    id: "sheet-b",
    skillId: "spreadsheet-fundamentals",
    difficulty: "beginner",
    prompt: "Which formula adds up the values in cells A1 through A10?",
    options: ["=ADD(A1:A10)", "=SUM(A1:A10)", "=TOTAL(A1:A10)", "=COUNT(A1:A10)"],
    correctIndex: 1
  },
  {
    id: "sheet-i",
    skillId: "spreadsheet-fundamentals",
    difficulty: "intermediate",
    prompt: "You copy the formula =B2*$C$1 from row 2 down to row 3. What does it become?",
    options: ["=B2*$C$1", "=B3*$C$1", "=B3*$C$2", "=B2*$C$2"],
    correctIndex: 1
  },
  {
    id: "sheet-a",
    skillId: "spreadsheet-fundamentals",
    difficulty: "advanced",
    prompt: "Why does INDEX/MATCH survive a column being inserted when VLOOKUP with a fixed index often breaks?",
    options: [
      "INDEX/MATCH is faster on large sheets",
      "MATCH finds the column by its header value rather than a hardcoded position",
      "VLOOKUP cannot search text columns",
      "INDEX/MATCH automatically sorts the source range"
    ],
    correctIndex: 1
  },

  // statistics-basics
  {
    id: "stat-b",
    skillId: "statistics-basics",
    difficulty: "beginner",
    prompt: "Salaries are 30k, 32k, 35k, 36k, and 400k. Which summary best represents a typical salary?",
    options: ["The mean", "The median", "The maximum", "The sum"],
    correctIndex: 1
  },
  {
    id: "stat-i",
    skillId: "statistics-basics",
    difficulty: "intermediate",
    prompt: "What does a standard deviation of 0 tell you about a column of numbers?",
    options: [
      "The values average to zero",
      "Every value is identical",
      "The values are normally distributed",
      "Half the values are negative"
    ],
    correctIndex: 1
  },
  {
    id: "stat-a",
    skillId: "statistics-basics",
    difficulty: "advanced",
    prompt: "A test returns p = 0.03. What does that actually mean?",
    options: [
      "There is a 3% chance the null hypothesis is true",
      "There is a 97% chance the effect is real",
      "If the null hypothesis were true, data this extreme would occur 3% of the time",
      "The effect size is 3%"
    ],
    correctIndex: 2
  },

  // python-basics
  {
    id: "py-b",
    skillId: "python-basics",
    difficulty: "beginner",
    prompt: "What does len([4, 8, 15, 16]) return?",
    options: ["4", "43", "16", "3"],
    correctIndex: 0
  },
  {
    id: "py-i",
    skillId: "python-basics",
    difficulty: "intermediate",
    prompt: "What is the value of [1, 2, 3, 4, 5][1:3]?",
    options: ["[1, 2]", "[2, 3]", "[2, 3, 4]", "[1, 2, 3]"],
    correctIndex: 1
  },
  {
    id: "py-a",
    skillId: "python-basics",
    difficulty: "advanced",
    prompt: "Why is `def f(items=[])` a common source of bugs?",
    options: [
      "Lists cannot be used as arguments",
      "The default list is created once and shared across every call",
      "Python copies the list on every call, which is slow",
      "The parameter becomes read-only"
    ],
    correctIndex: 1
  },

  // sql-querying
  {
    id: "sql-b",
    skillId: "sql-querying",
    difficulty: "beginner",
    prompt: "Which clause restricts which rows a SELECT returns?",
    options: ["ORDER BY", "WHERE", "GROUP BY", "LIMIT"],
    correctIndex: 1
  },
  {
    id: "sql-i",
    skillId: "sql-querying",
    difficulty: "intermediate",
    prompt: "You need every customer, including those with no orders. Which join do you use?",
    options: [
      "INNER JOIN orders",
      "LEFT JOIN orders",
      "RIGHT JOIN orders",
      "CROSS JOIN orders"
    ],
    correctIndex: 1
  },
  {
    id: "sql-a",
    skillId: "sql-querying",
    difficulty: "advanced",
    prompt: "Why does filtering an aggregate belong in HAVING rather than WHERE?",
    options: [
      "WHERE cannot compare numbers",
      "WHERE is evaluated before rows are grouped, so the aggregate does not exist yet",
      "HAVING runs faster on indexed columns",
      "They are interchangeable in every database"
    ],
    correctIndex: 1
  },

  // data-cleaning
  {
    id: "clean-b",
    skillId: "data-cleaning",
    difficulty: "beginner",
    prompt: "A column of ages contains the value -1 for some rows. What is this most likely to be?",
    options: [
      "A valid age",
      "A sentinel standing in for a missing value",
      "A rounding error",
      "A duplicated record"
    ],
    correctIndex: 1
  },
  {
    id: "clean-i",
    skillId: "data-cleaning",
    difficulty: "intermediate",
    prompt: "A city column has 'NYC', 'nyc ', and 'New York City'. What is the problem called?",
    options: [
      "Missing data",
      "Inconsistent categorical entry that needs normalising before grouping",
      "A type mismatch",
      "Sampling bias"
    ],
    correctIndex: 1
  },
  {
    id: "clean-a",
    skillId: "data-cleaning",
    difficulty: "advanced",
    prompt: "When is filling missing values with the column mean the wrong choice?",
    options: [
      "Whenever any value is missing",
      "When the data is missing for a reason related to its own value, which the mean then hides",
      "When the column is numeric",
      "When fewer than half the rows are missing"
    ],
    correctIndex: 1
  },

  // python-pandas
  {
    id: "pd-b",
    skillId: "python-pandas",
    difficulty: "beginner",
    prompt: "Which call reads a CSV file into a DataFrame?",
    options: ["pd.load_csv(path)", "pd.read_csv(path)", "pd.open(path)", "pd.DataFrame.csv(path)"],
    correctIndex: 1
  },
  {
    id: "pd-i",
    skillId: "python-pandas",
    difficulty: "intermediate",
    prompt: "What does df.groupby('region')['sales'].sum() produce?",
    options: [
      "The total sales across all rows",
      "One summed sales figure per region",
      "The rows where sales is highest",
      "A sorted copy of the DataFrame"
    ],
    correctIndex: 1
  },
  {
    id: "pd-a",
    skillId: "python-pandas",
    difficulty: "advanced",
    prompt: "Why does pandas warn about chained assignment such as df[df.a > 1]['b'] = 0?",
    options: [
      "Comparison operators are not supported on columns",
      "The mask may return a copy, so the write can silently fail to reach the original DataFrame",
      "It always raises a TypeError",
      "Boolean masks are deprecated"
    ],
    correctIndex: 1
  },

  // data-visualization
  {
    id: "viz-b",
    skillId: "data-visualization",
    difficulty: "beginner",
    prompt: "Which chart best shows one metric changing over twelve months?",
    options: ["Pie chart", "Line chart", "Scatter plot of two metrics", "Table of raw values"],
    correctIndex: 1
  },
  {
    id: "viz-i",
    skillId: "data-visualization",
    difficulty: "intermediate",
    prompt: "Why is truncating a bar chart's y-axis so that it starts at 90 rather than 0 misleading?",
    options: [
      "Bars must always be vertical",
      "Bar length encodes magnitude, so a cut axis exaggerates small differences",
      "It makes the chart harder to render",
      "Axes cannot start at a non-zero number"
    ],
    correctIndex: 1
  },
  {
    id: "viz-a",
    skillId: "data-visualization",
    difficulty: "advanced",
    prompt: "Why prefer a box plot or histogram over a bar of group means when comparing distributions?",
    options: [
      "Means are always calculated incorrectly",
      "A mean alone hides spread, skew, and outliers that change the conclusion",
      "Bar charts cannot display numeric data",
      "Box plots are required for more than two groups"
    ],
    correctIndex: 1
  },

  // dashboard-design
  {
    id: "dash-b",
    skillId: "dashboard-design",
    difficulty: "beginner",
    prompt: "Where should the metric a dashboard exists to answer be placed?",
    options: [
      "Bottom right, after supporting detail",
      "Top left, where readers look first",
      "On a second page",
      "Anywhere, position does not matter"
    ],
    correctIndex: 1
  },
  {
    id: "dash-i",
    skillId: "dashboard-design",
    difficulty: "intermediate",
    prompt: "A stakeholder asks for 40 charts on one screen. What is the strongest objection?",
    options: [
      "It will take too long to build",
      "Without a hierarchy nobody can tell what needs action, so the dashboard answers nothing",
      "Most tools cap dashboards at 20 charts",
      "Charts must be on separate pages by convention"
    ],
    correctIndex: 1
  },
  {
    id: "dash-a",
    skillId: "dashboard-design",
    difficulty: "advanced",
    prompt: "Why show a comparison — target, prior period, or benchmark — next to a headline number?",
    options: [
      "To fill empty space in the layout",
      "A number alone carries no judgement of whether it is good or bad",
      "To make the query run faster",
      "Because charts require at least two series"
    ],
    correctIndex: 1
  },

  // data-storytelling
  {
    id: "story-b",
    skillId: "data-storytelling",
    difficulty: "beginner",
    prompt: "What should a findings summary for an executive lead with?",
    options: [
      "The method and data sources used",
      "The recommendation and the finding behind it",
      "A list of every chart produced",
      "The SQL queries that were run"
    ],
    correctIndex: 1
  },
  {
    id: "story-i",
    skillId: "data-storytelling",
    difficulty: "intermediate",
    prompt: "Your analysis is inconclusive. What is the right thing to present?",
    options: [
      "Pick the most favourable cut of the data and present it as the answer",
      "State that the data cannot answer the question yet, and what would be needed to answer it",
      "Present nothing until the result is significant",
      "Report the result without mentioning the uncertainty"
    ],
    correctIndex: 1
  },
  {
    id: "story-a",
    skillId: "data-storytelling",
    difficulty: "advanced",
    prompt: "Why does a correlation found in observational data rarely justify a causal recommendation?",
    options: [
      "Correlation coefficients are usually miscalculated",
      "A confounder can drive both variables, so acting on the correlation may change nothing",
      "Observational datasets are always too small",
      "Causal claims require a p-value below 0.001"
    ],
    correctIndex: 1
  },

  // data-modeling
  {
    id: "model-b",
    skillId: "data-modeling",
    difficulty: "beginner",
    prompt: "In a star schema, what does a fact table typically hold?",
    options: [
      "Descriptive attributes such as product name and category",
      "Measurable events such as individual orders, with keys to the dimensions",
      "Database user permissions",
      "Only pre-aggregated yearly totals"
    ],
    correctIndex: 1
  },
  {
    id: "model-i",
    skillId: "data-modeling",
    difficulty: "intermediate",
    prompt: "What does the 'grain' of a fact table mean?",
    options: [
      "How often the table is refreshed",
      "Exactly what one row represents",
      "The number of columns it has",
      "Which storage format it uses"
    ],
    correctIndex: 1
  },
  {
    id: "model-a",
    skillId: "data-modeling",
    difficulty: "advanced",
    prompt: "A customer moves city. Why does overwriting the city on the dimension row break historical reports?",
    options: [
      "The row will be locked by the database",
      "Past orders are re-attributed to the new city, changing results that were already reported",
      "Overwrites are not permitted in SQL",
      "It doubles the size of the dimension"
    ],
    correctIndex: 1
  },

  // etl-pipelines
  {
    id: "etl-b",
    skillId: "etl-pipelines",
    difficulty: "beginner",
    prompt: "In ETL, what does the 'T' stand for?",
    options: ["Transfer", "Transform", "Truncate", "Trigger"],
    correctIndex: 1
  },
  {
    id: "etl-i",
    skillId: "etl-pipelines",
    difficulty: "intermediate",
    prompt: "Why does a scheduler model jobs as a directed acyclic graph rather than a plain list?",
    options: [
      "To render a nicer diagram in the UI",
      "So each task runs only after the tasks it depends on, and independent tasks can run in parallel",
      "Because lists cannot store more than 100 jobs",
      "To guarantee every task runs exactly once per day"
    ],
    correctIndex: 1
  },
  {
    id: "etl-a",
    skillId: "etl-pipelines",
    difficulty: "advanced",
    prompt: "Why should a pipeline task be idempotent?",
    options: [
      "To make it run faster on the first attempt",
      "So a retry or backfill reproduces the same result instead of double-counting rows",
      "So it can be written in any language",
      "Because schedulers cannot retry non-idempotent tasks"
    ],
    correctIndex: 1
  },

  // ab-testing
  {
    id: "ab-b",
    skillId: "ab-testing",
    difficulty: "beginner",
    prompt: "Why are users assigned to variants at random?",
    options: [
      "To keep the groups exactly the same size",
      "So the groups differ only by chance, leaving the variant as the explanation for any gap",
      "Because it is faster to compute",
      "To reduce how much data must be stored"
    ],
    correctIndex: 1
  },
  {
    id: "ab-i",
    skillId: "ab-testing",
    difficulty: "intermediate",
    prompt: "Why decide the sample size before the experiment starts?",
    options: [
      "To reserve database capacity",
      "So the test is not stopped the moment a difference looks favourable, which inflates false positives",
      "Because tools require it as a configuration field",
      "To make the variants load at the same speed"
    ],
    correctIndex: 1
  },
  {
    id: "ab-a",
    skillId: "ab-testing",
    difficulty: "advanced",
    prompt: "You test 20 metrics at the 5% level and one comes back significant. Why is that weak evidence?",
    options: [
      "Twenty metrics is too few to test",
      "At a 5% threshold roughly one in twenty null metrics is expected to look significant by chance",
      "Significance thresholds do not apply to multiple metrics",
      "The metrics must be tested in a fixed order"
    ],
    correctIndex: 1
  }
];
