import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

export const cloudDevopsQuestions: DiagnosticQuestion[] = [
  // devops-linux
  {
    id: "dolin-b",
    skillId: "devops-linux",
    difficulty: "beginner",
    prompt: "Which command shows the currently running processes?",
    options: ["ls -l", "ps aux", "cd /proc", "chmod 755"],
    correctIndex: 1
  },
  {
    id: "dolin-i",
    skillId: "devops-linux",
    difficulty: "intermediate",
    prompt: "A service fails to start. Which command shows its recent logs under systemd?",
    options: ["cat /etc/passwd", "journalctl -u servicename", "top", "df -h"],
    correctIndex: 1
  },
  {
    id: "dolin-a",
    skillId: "devops-linux",
    difficulty: "advanced",
    prompt: "A disk shows free space in `df` but writes fail with \"No space left on device\". What is the likely cause?",
    options: [
      "The disk is physically failing",
      "Inodes are exhausted — the filesystem has no free entries left even though blocks remain",
      "The file is too large for the filesystem",
      "The kernel needs rebooting"
    ],
    correctIndex: 1
  },

  // devops-cloud-networking
  {
    id: "donet-b",
    skillId: "devops-cloud-networking",
    difficulty: "beginner",
    prompt: "What is the purpose of a subnet inside a virtual network?",
    options: [
      "To encrypt all traffic automatically",
      "To divide the address space into segments that can be routed and secured separately",
      "To increase available bandwidth",
      "To assign public DNS names"
    ],
    correctIndex: 1
  },
  {
    id: "donet-i",
    skillId: "devops-cloud-networking",
    difficulty: "intermediate",
    prompt: "What distinguishes a public subnet from a private one?",
    options: [
      "Private subnets use IPv6 only",
      "A public subnet has a route to an internet gateway; a private one reaches out through NAT, if at all",
      "Public subnets are larger",
      "Private subnets cannot host virtual machines"
    ],
    correctIndex: 1
  },
  {
    id: "donet-a",
    skillId: "devops-cloud-networking",
    difficulty: "advanced",
    prompt: "A security group allows inbound 443 but traffic still fails. What should you check next?",
    options: [
      "The instance's CPU usage",
      "The subnet's network ACL and route table, since those are evaluated separately from the security group",
      "The DNS TTL value",
      "The billing account status"
    ],
    correctIndex: 1
  },

  // devops-cloud-core
  {
    id: "docore-b",
    skillId: "devops-cloud-core",
    difficulty: "beginner",
    prompt: "Under the shared responsibility model, who secures the physical data centre?",
    options: ["The customer", "The cloud provider", "Neither party", "A third-party auditor"],
    correctIndex: 1
  },
  {
    id: "docore-i",
    skillId: "devops-cloud-core",
    difficulty: "intermediate",
    prompt: "Why is object storage a poor fit for a database's active data files?",
    options: [
      "It cannot store binary data",
      "It has no in-place partial writes and much higher latency than block storage",
      "It is always more expensive per gigabyte",
      "It cannot be accessed over the network"
    ],
    correctIndex: 1
  },
  {
    id: "docore-a",
    skillId: "devops-cloud-core",
    difficulty: "advanced",
    prompt: "Why attach a role to a compute instance rather than storing access keys on it?",
    options: [
      "Roles are cheaper",
      "Roles supply short-lived rotating credentials, so a compromised host does not leak a long-lived secret",
      "Access keys do not work on virtual machines",
      "Roles remove the need for any permissions"
    ],
    correctIndex: 1
  },

  // devops-scripting
  {
    id: "doscr-b",
    skillId: "devops-scripting",
    difficulty: "beginner",
    prompt: "What does the shebang `#!/usr/bin/env bash` at the top of a script do?",
    options: [
      "Adds a comment for other developers",
      "Tells the system which interpreter should run the file",
      "Enables debug output",
      "Makes the script executable"
    ],
    correctIndex: 1
  },
  {
    id: "doscr-i",
    skillId: "devops-scripting",
    difficulty: "intermediate",
    prompt: "Why should shell variables be quoted, as in `\"$file\"`?",
    options: [
      "Quoting makes scripts run faster",
      "Unquoted expansion splits on whitespace and expands globs, so a filename with a space becomes two arguments",
      "Quotes are required by POSIX for all variables",
      "It prevents the variable from being read-only"
    ],
    correctIndex: 1
  },
  {
    id: "doscr-a",
    skillId: "devops-scripting",
    difficulty: "advanced",
    prompt: "What does `set -euo pipefail` protect against?",
    options: [
      "Syntax errors at parse time",
      "Silently continuing after a failed command, an unset variable, or a failure mid-pipeline",
      "Scripts running as root",
      "Infinite loops"
    ],
    correctIndex: 1
  },

  // devops-containers
  {
    id: "docon-b",
    skillId: "devops-containers",
    difficulty: "beginner",
    prompt: "What is the difference between an image and a container?",
    options: [
      "They are the same thing",
      "An image is the immutable template; a container is a running instance created from it",
      "An image runs, a container stores",
      "Containers are only used in production"
    ],
    correctIndex: 1
  },
  {
    id: "docon-i",
    skillId: "devops-containers",
    difficulty: "intermediate",
    prompt: "Why does copying source code late in a Dockerfile speed up rebuilds?",
    options: [
      "Later instructions compile faster",
      "Layers are cached in order, so dependency layers stay valid when only the source changes",
      "It reduces the final image size to zero",
      "Docker parses the file bottom-up"
    ],
    correctIndex: 1
  },
  {
    id: "docon-a",
    skillId: "devops-containers",
    difficulty: "advanced",
    prompt: "Why does data written inside a container disappear when it is replaced?",
    options: [
      "Containers cannot write to disk",
      "The writable layer belongs to that container instance; persistence requires a volume or external store",
      "The data is encrypted and lost",
      "Docker deletes files on exit by policy"
    ],
    correctIndex: 1
  },

  // devops-iac
  {
    id: "doiac-b",
    skillId: "devops-iac",
    difficulty: "beginner",
    prompt: "What is the main benefit of declaring infrastructure as code?",
    options: [
      "It removes the need for a cloud account",
      "The environment is reproducible and reviewable, because the desired state lives in version control",
      "It makes servers run faster",
      "It eliminates all costs"
    ],
    correctIndex: 1
  },
  {
    id: "doiac-i",
    skillId: "devops-iac",
    difficulty: "intermediate",
    prompt: "What does a Terraform state file record?",
    options: [
      "A log of every command run",
      "The mapping between your configuration and the real resources it has created",
      "The provider's billing history",
      "Encrypted copies of your resources"
    ],
    correctIndex: 1
  },
  {
    id: "doiac-a",
    skillId: "devops-iac",
    difficulty: "advanced",
    prompt: "Why is a change made by hand in the cloud console a problem for infrastructure as code?",
    options: [
      "Console changes are always rejected",
      "It causes drift: the next apply may revert it or fail, because state no longer matches reality",
      "It doubles the cost of the resource",
      "It permanently locks the state file"
    ],
    correctIndex: 1
  },

  // devops-kubernetes
  {
    id: "dok8s-b",
    skillId: "devops-kubernetes",
    difficulty: "beginner",
    prompt: "What is a Pod in Kubernetes?",
    options: [
      "A physical server in the cluster",
      "The smallest deployable unit — one or more containers sharing a network namespace and storage",
      "A storage volume",
      "A cluster-wide configuration file"
    ],
    correctIndex: 1
  },
  {
    id: "dok8s-i",
    skillId: "devops-kubernetes",
    difficulty: "intermediate",
    prompt: "Why is a Service needed in front of Pods?",
    options: [
      "Pods cannot run without one",
      "Pod IPs change as Pods are replaced, so a Service gives a stable address and load-balances across them",
      "Services store the container images",
      "It is only needed for external traffic"
    ],
    correctIndex: 1
  },
  {
    id: "dok8s-a",
    skillId: "devops-kubernetes",
    difficulty: "advanced",
    prompt: "What is the difference between a liveness probe and a readiness probe?",
    options: [
      "They are aliases for the same check",
      "Liveness restarts an unhealthy container; readiness removes it from Service endpoints until it can serve",
      "Readiness restarts the node",
      "Liveness only runs at startup"
    ],
    correctIndex: 1
  },

  // devops-cicd
  {
    id: "docicd-b",
    skillId: "devops-cicd",
    difficulty: "beginner",
    prompt: "What does continuous integration primarily mean in practice?",
    options: [
      "Deploying to production several times a day",
      "Merging work frequently into a shared branch, with an automated build and test on every change",
      "Writing integration tests only",
      "Running the application continuously"
    ],
    correctIndex: 1
  },
  {
    id: "docicd-i",
    skillId: "devops-cicd",
    difficulty: "intermediate",
    prompt: "Why should a pipeline build an artifact once and promote it through environments?",
    options: [
      "It saves storage space",
      "Rebuilding per environment risks shipping something that was never the thing you tested",
      "Build tools cannot run twice",
      "It is required for container registries"
    ],
    correctIndex: 1
  },
  {
    id: "docicd-a",
    skillId: "devops-cicd",
    difficulty: "advanced",
    prompt: "What is the main operational advantage of a blue-green deployment?",
    options: [
      "It halves infrastructure cost",
      "The previous version stays running, so rollback is a traffic switch rather than a redeploy",
      "It removes the need for tests",
      "It guarantees zero bugs"
    ],
    correctIndex: 1
  },

  // devops-observability
  {
    id: "doobs-b",
    skillId: "devops-observability",
    difficulty: "beginner",
    prompt: "Which of these are commonly called the three pillars of observability?",
    options: [
      "Backups, replicas, and snapshots",
      "Metrics, logs, and traces",
      "CPU, memory, and disk",
      "Alerts, dashboards, and runbooks"
    ],
    correctIndex: 1
  },
  {
    id: "doobs-i",
    skillId: "devops-observability",
    difficulty: "intermediate",
    prompt: "Why is a p99 latency figure more useful than a mean for user experience?",
    options: [
      "It is cheaper to compute",
      "The mean hides the slow tail that a meaningful share of users actually experience",
      "p99 is always lower than the mean",
      "Means cannot be computed on latency"
    ],
    correctIndex: 1
  },
  {
    id: "doobs-a",
    skillId: "devops-observability",
    difficulty: "advanced",
    prompt: "Why does high-cardinality labelling — such as user ID — cause problems in a metrics system?",
    options: [
      "Labels must be numeric",
      "Each unique label combination creates a separate time series, so memory and storage explode",
      "It makes queries return no data",
      "Cardinality has no effect on metrics"
    ],
    correctIndex: 1
  },

  // devops-reliability
  {
    id: "dorel-b",
    skillId: "devops-reliability",
    difficulty: "beginner",
    prompt: "What is an SLO?",
    options: [
      "A contractual penalty for downtime",
      "A target level of reliability for a service, expressed against a measured indicator",
      "A log storage format",
      "The maximum number of on-call engineers"
    ],
    correctIndex: 1
  },
  {
    id: "dorel-i",
    skillId: "devops-reliability",
    difficulty: "intermediate",
    prompt: "What is an error budget used for?",
    options: [
      "Estimating cloud spend",
      "Quantifying the unreliability you can afford, so shipping pace and stability work can be traded explicitly",
      "Counting bugs in the tracker",
      "Rating individual engineers"
    ],
    correctIndex: 1
  },
  {
    id: "dorel-a",
    skillId: "devops-reliability",
    difficulty: "advanced",
    prompt: "Why are postmortems written blamelessly?",
    options: [
      "To avoid legal liability",
      "Because fear suppresses the honest detail needed to find the systemic cause",
      "Because individuals are never involved in outages",
      "To keep the document shorter"
    ],
    correctIndex: 1
  }
];
