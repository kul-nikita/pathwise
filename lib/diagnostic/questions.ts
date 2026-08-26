import { dataAnalyticsQuestions } from "@/lib/diagnostic/questions-data-analytics";
import { webDevelopmentQuestions } from "@/lib/diagnostic/questions-web-development";
import { cloudDevopsQuestions } from "@/lib/diagnostic/questions-cloud-devops";
import { aiMachineLearningQuestions } from "@/lib/diagnostic/questions-ai-machine-learning";
import { uxDesignQuestions } from "@/lib/diagnostic/questions-ux-design";
import { productManagementQuestions } from "@/lib/diagnostic/questions-product-management";
import { mobileDevelopmentQuestions } from "@/lib/diagnostic/questions-mobile-development";
import { itSupportQuestions } from "@/lib/diagnostic/questions-it-support";
import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

export type { DiagnosticQuestion };

/**
 * One question per (skill, difficulty). The adaptive ladder in engine.ts relies
 * on every skill a role requires having all three tiers present.
 */
const cybersecurityQuestions: DiagnosticQuestion[] = [
  // networking-basics
  {
    id: "net-b",
    skillId: "networking-basics",
    difficulty: "beginner",
    prompt: "Which port does HTTPS use by default?",
    options: ["21", "80", "443", "3389"],
    correctIndex: 2
  },
  {
    id: "net-i",
    skillId: "networking-basics",
    difficulty: "intermediate",
    prompt: "A host has IP 10.0.5.37/24. What is its network address?",
    options: ["10.0.0.0", "10.0.5.0", "10.0.5.1", "10.0.5.255"],
    correctIndex: 1
  },
  {
    id: "net-a",
    skillId: "networking-basics",
    difficulty: "advanced",
    prompt: "In a TCP three-way handshake, what does the server send in response to a SYN?",
    options: ["ACK only", "SYN only", "SYN-ACK", "RST-ACK"],
    correctIndex: 2
  },

  // linux-fundamentals
  {
    id: "lin-b",
    skillId: "linux-fundamentals",
    difficulty: "beginner",
    prompt: "Which command prints the current working directory?",
    options: ["ls", "pwd", "cd", "whoami"],
    correctIndex: 1
  },
  {
    id: "lin-i",
    skillId: "linux-fundamentals",
    difficulty: "intermediate",
    prompt: "What do the permissions `-rwxr-xr--` grant to members of the file's group?",
    options: ["Read and write", "Read and execute", "Read only", "Full control"],
    correctIndex: 1
  },
  {
    id: "lin-a",
    skillId: "linux-fundamentals",
    difficulty: "advanced",
    prompt: "A binary has the setuid bit set and is owned by root. What is the security implication?",
    options: [
      "It runs with the privileges of the user who launched it",
      "It runs with root privileges regardless of who launched it",
      "It cannot be executed by non-root users",
      "It is automatically sandboxed by the kernel"
    ],
    correctIndex: 1
  },

  // log-analysis
  {
    id: "log-b",
    skillId: "log-analysis",
    difficulty: "beginner",
    prompt: "Which Windows Event ID records a successful account logon?",
    options: ["4624", "4625", "1102", "7045"],
    correctIndex: 0
  },
  {
    id: "log-i",
    skillId: "log-analysis",
    difficulty: "intermediate",
    prompt: "You see many 4625 events for one account from one source in 60 seconds. What does this most likely indicate?",
    options: [
      "A password spraying attack across many accounts",
      "A brute-force attempt against a single account",
      "Normal service account behaviour",
      "Log source time drift"
    ],
    correctIndex: 1
  },
  {
    id: "log-a",
    skillId: "log-analysis",
    difficulty: "advanced",
    prompt: "Why is normalising timestamps to UTC the first step when correlating logs from several sources?",
    options: [
      "It compresses the log volume",
      "It prevents log tampering",
      "It makes event ordering across sources reliable",
      "It is required for regex matching"
    ],
    correctIndex: 2
  },

  // siem-querying
  {
    id: "siem-b",
    skillId: "siem-querying",
    difficulty: "beginner",
    prompt: "What is the primary purpose of a SIEM?",
    options: [
      "To centrally collect, correlate, and alert on security events",
      "To encrypt data at rest",
      "To patch vulnerable hosts",
      "To act as a network firewall"
    ],
    correctIndex: 0
  },
  {
    id: "siem-i",
    skillId: "siem-querying",
    difficulty: "intermediate",
    prompt: "In Splunk SPL, which command aggregates results into counts grouped by a field?",
    options: ["table", "stats count by", "eval", "rex"],
    correctIndex: 1
  },
  {
    id: "siem-a",
    skillId: "siem-querying",
    difficulty: "advanced",
    prompt: "A detection rule fires on every admin logon and is 95% false positive. What is the best first tuning step?",
    options: [
      "Disable the rule entirely",
      "Raise the alert severity",
      "Add context conditions that exclude known-good baseline behaviour",
      "Reduce the log retention window"
    ],
    correctIndex: 2
  },

  // alert-triage
  {
    id: "tri-b",
    skillId: "alert-triage",
    difficulty: "beginner",
    prompt: "What is a false positive in alert triage?",
    options: [
      "An alert that correctly identifies malicious activity",
      "An alert raised on benign activity",
      "Malicious activity that produced no alert",
      "An alert that arrived late"
    ],
    correctIndex: 1
  },
  {
    id: "tri-i",
    skillId: "alert-triage",
    difficulty: "intermediate",
    prompt: "Two alerts arrive at once: possible adware on a test VM, and credential dumping on a domain controller. Which do you take first and why?",
    options: [
      "The adware, because it arrived first",
      "The credential dumping, because asset criticality and impact are higher",
      "Either, priority is set only by alert severity field",
      "The adware, because it is easier to close"
    ],
    correctIndex: 1
  },
  {
    id: "tri-a",
    skillId: "alert-triage",
    difficulty: "advanced",
    prompt: "Which outcome is the most costly failure mode for a SOC triage process?",
    options: [
      "A false positive that consumes analyst time",
      "A false negative that leaves a real intrusion undetected",
      "A duplicate alert",
      "An alert closed with a short note"
    ],
    correctIndex: 1
  },

  // mitre-attack
  {
    id: "att-b",
    skillId: "mitre-attack",
    difficulty: "beginner",
    prompt: "What does the MITRE ATT&CK framework catalogue?",
    options: [
      "Adversary tactics and techniques observed in the real world",
      "Software licence compliance requirements",
      "Encryption algorithm strengths",
      "Network hardware specifications"
    ],
    correctIndex: 0
  },
  {
    id: "att-i",
    skillId: "mitre-attack",
    difficulty: "intermediate",
    prompt: "In ATT&CK terms, what is the difference between a tactic and a technique?",
    options: [
      "A tactic is the adversary's goal; a technique is how they achieve it",
      "A tactic is a tool; a technique is a vulnerability",
      "They are interchangeable terms",
      "A tactic is defensive; a technique is offensive"
    ],
    correctIndex: 0
  },
  {
    id: "att-a",
    skillId: "mitre-attack",
    difficulty: "advanced",
    prompt: "An adversary uses `rundll32.exe` to execute a malicious DLL. Which ATT&CK tactic does this primarily support?",
    options: ["Reconnaissance", "Defense Evasion", "Impact", "Resource Development"],
    correctIndex: 1
  },

  // incident-documentation
  {
    id: "doc-b",
    skillId: "incident-documentation",
    difficulty: "beginner",
    prompt: "Why does an incident ticket need a timeline of actions taken?",
    options: [
      "To satisfy a word count requirement",
      "To make the investigation reproducible and auditable",
      "To assign blame to an analyst",
      "To replace the alert itself"
    ],
    correctIndex: 1
  },
  {
    id: "doc-i",
    skillId: "incident-documentation",
    difficulty: "intermediate",
    prompt: "Which item belongs in the 'indicators of compromise' section rather than the summary?",
    options: [
      "A narrative of what happened",
      "The malicious file's SHA-256 hash",
      "The business impact assessment",
      "The recommended remediation owner"
    ],
    correctIndex: 1
  },
  {
    id: "doc-a",
    skillId: "incident-documentation",
    difficulty: "advanced",
    prompt: "What distinguishes a good root-cause statement from a good containment statement?",
    options: [
      "Root cause explains why it happened; containment describes how spread was stopped",
      "They are the same thing written for different audiences",
      "Root cause is technical; containment is always non-technical",
      "Containment must always precede root cause in the report"
    ],
    correctIndex: 0
  },

  // web-security-basics
  {
    id: "web-b",
    skillId: "web-security-basics",
    difficulty: "beginner",
    prompt: "What does XSS stand for?",
    options: ["Cross-Site Scripting", "Extended Secure Sockets", "XML Schema Signing", "Cross-Server Sync"],
    correctIndex: 0
  },
  {
    id: "web-i",
    skillId: "web-security-basics",
    difficulty: "intermediate",
    prompt: "Which HTTP response header most directly mitigates clickjacking?",
    options: ["Content-Type", "X-Frame-Options", "Cache-Control", "Accept-Encoding"],
    correctIndex: 1
  },
  {
    id: "web-a",
    skillId: "web-security-basics",
    difficulty: "advanced",
    prompt: "Why does the SameSite cookie attribute reduce CSRF risk?",
    options: [
      "It encrypts the cookie value",
      "It stops the browser sending the cookie on cross-site requests",
      "It shortens the cookie lifetime",
      "It hides the cookie from JavaScript"
    ],
    correctIndex: 1
  },

  // burp-suite
  {
    id: "burp-b",
    skillId: "burp-suite",
    difficulty: "beginner",
    prompt: "What is the core function of Burp Suite's Proxy tool?",
    options: [
      "Intercepting and modifying HTTP traffic between browser and server",
      "Scanning network ports",
      "Cracking password hashes",
      "Disassembling binaries"
    ],
    correctIndex: 0
  },
  {
    id: "burp-i",
    skillId: "burp-suite",
    difficulty: "intermediate",
    prompt: "Which Burp tool is designed for automating customised request payloads against a single insertion point?",
    options: ["Repeater", "Intruder", "Decoder", "Comparer"],
    correctIndex: 1
  },
  {
    id: "burp-a",
    skillId: "burp-suite",
    difficulty: "advanced",
    prompt: "Why must Burp's CA certificate be installed in the browser to test HTTPS traffic?",
    options: [
      "To speed up TLS negotiation",
      "So the browser trusts Burp's dynamically generated per-host certificates",
      "To disable HTTPS on the target",
      "To store credentials for the target site"
    ],
    correctIndex: 1
  },

  // sql-injection
  {
    id: "sqli-b",
    skillId: "sql-injection",
    difficulty: "beginner",
    prompt: "What is the root cause of SQL injection?",
    options: [
      "Untrusted input being concatenated into a SQL query",
      "Using HTTPS instead of HTTP",
      "Storing passwords in a database",
      "Running the database on a non-standard port"
    ],
    correctIndex: 0
  },
  {
    id: "sqli-i",
    skillId: "sql-injection",
    difficulty: "intermediate",
    prompt: "Which defence reliably prevents SQL injection?",
    options: [
      "Escaping single quotes with string replace",
      "Parameterised queries / prepared statements",
      "Hiding SQL errors from the response",
      "Blocking the word SELECT in input"
    ],
    correctIndex: 1
  },
  {
    id: "sqli-a",
    skillId: "sql-injection",
    difficulty: "advanced",
    prompt: "A query returns identical output regardless of input, but a `SLEEP(5)` payload delays the response. What class of SQLi is this?",
    options: ["Union-based", "Error-based", "Time-based blind", "Second-order"],
    correctIndex: 2
  },

  // pentest-reporting
  {
    id: "rep-b",
    skillId: "pentest-reporting",
    difficulty: "beginner",
    prompt: "Who is the primary audience for a pentest report's executive summary?",
    options: [
      "Business decision-makers who need risk and impact",
      "The developers who will patch the code",
      "The penetration testers themselves",
      "External regulators only"
    ],
    correctIndex: 0
  },
  {
    id: "rep-i",
    skillId: "pentest-reporting",
    difficulty: "intermediate",
    prompt: "Which element makes a finding actionable rather than merely descriptive?",
    options: [
      "A CVSS score alone",
      "Reproduction steps plus a specific remediation recommendation",
      "A screenshot of the vulnerable page",
      "The date the finding was discovered"
    ],
    correctIndex: 1
  },
  {
    id: "rep-a",
    skillId: "pentest-reporting",
    difficulty: "advanced",
    prompt: "Two findings share a CVSS base score of 7.5. What most justifies ranking one higher in the report?",
    options: [
      "Alphabetical order of the affected host",
      "Business context: exposure and criticality of the affected asset",
      "Which one was found first",
      "The length of the proof-of-concept"
    ],
    correctIndex: 1
  },

  // cloud-fundamentals
  {
    id: "cld-b",
    skillId: "cloud-fundamentals",
    difficulty: "beginner",
    prompt: "Under the shared responsibility model for IaaS, who secures the guest operating system?",
    options: ["The cloud provider", "The customer", "Neither party", "An external auditor"],
    correctIndex: 1
  },
  {
    id: "cld-i",
    skillId: "cloud-fundamentals",
    difficulty: "intermediate",
    prompt: "Which is the most common root cause of public cloud storage data exposure?",
    options: [
      "Weak encryption algorithms",
      "Misconfigured access policies on the bucket or container",
      "Provider hypervisor compromise",
      "Expired TLS certificates"
    ],
    correctIndex: 1
  },
  {
    id: "cld-a",
    skillId: "cloud-fundamentals",
    difficulty: "advanced",
    prompt: "Why does a security group differ fundamentally from a traditional network firewall rule set?",
    options: [
      "It is stateful and attaches to the workload rather than a network perimeter",
      "It can only block, never allow",
      "It operates at the application layer only",
      "It requires manual reload after every change"
    ],
    correctIndex: 0
  },

  // iam-basics
  {
    id: "iam-b",
    skillId: "iam-basics",
    difficulty: "beginner",
    prompt: "What does the principle of least privilege require?",
    options: [
      "Granting only the permissions needed to perform a task",
      "Granting admin rights to speed up work",
      "Rotating passwords every 30 days",
      "Using a single shared account per team"
    ],
    correctIndex: 0
  },
  {
    id: "iam-i",
    skillId: "iam-basics",
    difficulty: "intermediate",
    prompt: "Why is an IAM role generally preferred over long-lived access keys for a workload?",
    options: [
      "Roles are cheaper to run",
      "Roles supply short-lived, automatically rotated credentials",
      "Roles bypass audit logging",
      "Roles cannot be misconfigured"
    ],
    correctIndex: 1
  },
  {
    id: "iam-a",
    skillId: "iam-basics",
    difficulty: "advanced",
    prompt: "A policy allows `iam:PassRole` with a wildcard resource. Why is that dangerous?",
    options: [
      "It prevents the role from being deleted",
      "It can let a lower-privileged user attach a high-privilege role and escalate",
      "It disables CloudTrail logging",
      "It forces MFA on every request"
    ],
    correctIndex: 1
  },

  // cloud-logging
  {
    id: "clog-b",
    skillId: "cloud-logging",
    difficulty: "beginner",
    prompt: "What does AWS CloudTrail primarily record?",
    options: [
      "API calls and account activity",
      "Application performance metrics",
      "Billing forecasts",
      "Raw network packet captures"
    ],
    correctIndex: 0
  },
  {
    id: "clog-i",
    skillId: "cloud-logging",
    difficulty: "intermediate",
    prompt: "Which log source best answers 'which IP connected to this VM and was it allowed?'",
    options: ["Audit/API activity logs", "VPC flow logs", "Application stdout logs", "Billing reports"],
    correctIndex: 1
  },
  {
    id: "clog-a",
    skillId: "cloud-logging",
    difficulty: "advanced",
    prompt: "Why should audit logs be written to a separate account or project with restricted write access?",
    options: [
      "To reduce storage cost",
      "To stop an attacker who compromises the workload account from deleting the evidence",
      "To improve query performance",
      "To satisfy a naming convention"
    ],
    correctIndex: 1
  }
];

/** Every seeded domain contributes its own ladder. */
export const questionBank: DiagnosticQuestion[] = [
  ...cybersecurityQuestions,
  ...dataAnalyticsQuestions,
  ...webDevelopmentQuestions,
  ...cloudDevopsQuestions,
  ...aiMachineLearningQuestions,
  ...uxDesignQuestions,
  ...productManagementQuestions,
  ...mobileDevelopmentQuestions,
  ...itSupportQuestions
];
