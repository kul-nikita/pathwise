import { defineDomain, resource } from "@/lib/data/catalog-helpers";

const V = "2026-08-26";

/** Every URL below returned HTTP 200 on 2026-08-26. */
export const cloudDevops = defineDomain({
  domain: {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    description: "Run software in the cloud: provision it, ship it, observe it, and keep it up."
  },

  roles: [
    {
      id: "cloud-engineer",
      title: "Cloud Engineer",
      description: "Provision and secure cloud infrastructure that others can deploy onto safely.",
      requiredSkills: [
        { skillId: "devops-linux", importance: 0.8 },
        { skillId: "devops-cloud-networking", importance: 0.9 },
        { skillId: "devops-cloud-core", importance: 1 },
        { skillId: "devops-iac", importance: 1 },
        { skillId: "devops-containers", importance: 0.7 },
        { skillId: "devops-observability", importance: 0.7 },
        { skillId: "devops-scripting", importance: 0.7 }
      ]
    },
    {
      id: "site-reliability-engineer",
      title: "Site Reliability Engineer",
      description: "Keep production healthy: automate the toil, measure the service, own the incident.",
      requiredSkills: [
        { skillId: "devops-linux", importance: 0.9 },
        { skillId: "devops-containers", importance: 0.9 },
        { skillId: "devops-kubernetes", importance: 0.9 },
        { skillId: "devops-cicd", importance: 0.8 },
        { skillId: "devops-observability", importance: 1 },
        { skillId: "devops-reliability", importance: 1 },
        { skillId: "devops-cloud-core", importance: 0.7 },
        { skillId: "devops-scripting", importance: 0.8 }
      ]
    }
  ],

  skills: [
    {
      id: "devops-linux",
      name: "Linux for Operations",
      category: "foundations",
      description: "Processes, permissions, systemd, packages, and diagnosing a box over SSH.",
      prerequisites: []
    },
    {
      id: "devops-cloud-networking",
      name: "Cloud Networking",
      category: "foundations",
      description: "Virtual networks, subnets, routing, security groups, load balancing, and DNS.",
      prerequisites: []
    },
    {
      id: "devops-cloud-core",
      name: "Cloud Core Services",
      category: "cloud",
      description: "Compute, storage, identity, and the shared-responsibility model of a cloud provider.",
      prerequisites: []
    },
    {
      id: "devops-scripting",
      name: "Shell Scripting",
      category: "foundations",
      description: "Automate repetitive operations safely, with arguments, exit codes, and error handling.",
      prerequisites: ["devops-linux"]
    },
    {
      id: "devops-containers",
      name: "Containers",
      category: "delivery",
      description: "Images, layers, registries, volumes, and networking between containers.",
      prerequisites: ["devops-linux"]
    },
    {
      id: "devops-iac",
      name: "Infrastructure as Code",
      category: "cloud",
      description: "Declare infrastructure, plan changes, and manage state instead of clicking consoles.",
      prerequisites: ["devops-cloud-core"]
    },
    {
      id: "devops-kubernetes",
      name: "Kubernetes",
      category: "delivery",
      description: "Pods, deployments, services, config, and how a cluster reconciles desired state.",
      prerequisites: ["devops-containers"]
    },
    {
      id: "devops-cicd",
      name: "CI/CD Pipelines",
      category: "delivery",
      description: "Automate build, test, and deploy so a release is routine rather than an event.",
      prerequisites: ["devops-containers"]
    },
    {
      id: "devops-observability",
      name: "Observability",
      category: "operations",
      description: "Metrics, logs, and traces, and building a dashboard that answers a real question.",
      prerequisites: ["devops-cloud-core"]
    },
    {
      id: "devops-reliability",
      name: "Reliability & Incident Response",
      category: "operations",
      description: "SLOs, error budgets, on-call, and blameless postmortems that change something.",
      prerequisites: ["devops-observability"]
    }
  ],

  resources: [
    resource({
      id: "ubuntu-command-line-beginners",
      title: "The Linux Command Line for Beginners",
      provider: "Ubuntu",
      url: "https://ubuntu.com/tutorials/command-line-for-beginners",
      resourceType: "lab",
      skillTags: ["devops-linux"],
      difficulty: "beginner",
      durationMinutes: 120,
      qualityScore: 0.83,
      evidenceType: "linux-runbook",
      lastVerifiedAt: V,
      description: "Navigate the filesystem, manipulate files, and read the manual, hands-on."
    }),
    resource({
      id: "ubuntu-openssh-server",
      title: "OpenSSH Server",
      provider: "Ubuntu Server Docs",
      url: "https://ubuntu.com/server/docs/openssh-server",
      resourceType: "doc",
      skillTags: ["devops-linux"],
      difficulty: "intermediate",
      durationMinutes: 90,
      qualityScore: 0.8,
      evidenceType: "linux-runbook",
      lastVerifiedAt: V,
      description: "Configure, harden, and key-authenticate remote access to a server."
    }),
    resource({
      id: "tldp-bash-beginners",
      title: "Bash Guide for Beginners",
      provider: "The Linux Documentation Project",
      url: "https://tldp.org/LDP/Bash-Beginners-Guide/html/",
      resourceType: "doc",
      skillTags: ["devops-scripting"],
      difficulty: "beginner",
      durationMinutes: 360,
      qualityScore: 0.79,
      prerequisites: ["devops-linux"],
      evidenceType: "automation-script",
      lastVerifiedAt: V,
      description: "Variables, conditionals, loops, and functions, building up to real scripts."
    }),
    resource({
      id: "shellscript-sh-tutorial",
      title: "Shell Scripting Tutorial",
      provider: "shellscript.sh",
      url: "https://www.shellscript.sh/",
      resourceType: "doc",
      skillTags: ["devops-scripting"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.77,
      prerequisites: ["devops-linux"],
      evidenceType: "automation-script",
      lastVerifiedAt: V,
      description: "A practical walkthrough of portable shell scripting, quoting, and exit status."
    }),
    resource({
      id: "explainshell",
      title: "explainshell",
      provider: "explainshell",
      url: "https://explainshell.com/",
      resourceType: "lab",
      skillTags: ["devops-scripting", "devops-linux"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.75,
      evidenceType: "automation-script",
      lastVerifiedAt: V,
      description: "Paste any command line and see each flag mapped back to its manual entry."
    }),
    resource({
      id: "azure-fundamentals-cloud-concepts",
      title: "Describe Cloud Concepts",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/",
      resourceType: "course",
      skillTags: ["devops-cloud-core"],
      difficulty: "beginner",
      durationMinutes: 180,
      qualityScore: 0.84,
      evidenceType: "cloud-architecture-diagram",
      lastVerifiedAt: V,
      description: "Service and deployment models, shared responsibility, and cloud economics."
    }),
    resource({
      id: "gcp-docs-overview",
      title: "Google Cloud Documentation Overview",
      provider: "Google Cloud",
      url: "https://cloud.google.com/docs/overview",
      resourceType: "doc",
      skillTags: ["devops-cloud-core", "devops-cloud-networking"],
      difficulty: "beginner",
      durationMinutes: 150,
      qualityScore: 0.81,
      evidenceType: "cloud-architecture-diagram",
      lastVerifiedAt: V,
      description: "How compute, networking, storage, and identity fit together on one provider."
    }),
    resource({
      id: "azure-cloud-adoption-framework",
      title: "Cloud Adoption Framework: Get Started",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/get-started/",
      resourceType: "doc",
      skillTags: ["devops-cloud-networking"],
      difficulty: "intermediate",
      durationMinutes: 210,
      qualityScore: 0.8,
      evidenceType: "cloud-architecture-diagram",
      lastVerifiedAt: V,
      description: "Landing zones, network topology, and governance decisions made before workloads land."
    }),
    resource({
      id: "terraform-tutorials",
      title: "Terraform Tutorials",
      provider: "HashiCorp",
      url: "https://developer.hashicorp.com/terraform/tutorials",
      resourceType: "lab",
      skillTags: ["devops-iac"],
      difficulty: "intermediate",
      durationMinutes: 420,
      qualityScore: 0.9,
      prerequisites: ["devops-cloud-core"],
      evidenceType: "iac-repo",
      lastVerifiedAt: V,
      description: "Write configuration, plan and apply changes, and manage state across environments."
    }),
    resource({
      id: "ansible-getting-started",
      title: "Ansible Getting Started",
      provider: "Ansible Documentation",
      url: "https://docs.ansible.com/ansible/latest/getting_started/index.html",
      resourceType: "doc",
      skillTags: ["devops-iac"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.83,
      prerequisites: ["devops-cloud-core"],
      evidenceType: "iac-repo",
      lastVerifiedAt: V,
      description: "Inventories, playbooks, and idempotent configuration management over SSH."
    }),
    resource({
      id: "azure-arm-templates-path",
      title: "Deploy and Manage Resources with ARM Templates",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/training/paths/deploy-manage-resource-manager-templates/",
      resourceType: "course",
      skillTags: ["devops-iac"],
      difficulty: "advanced",
      durationMinutes: 300,
      qualityScore: 0.81,
      prerequisites: ["devops-cloud-core"],
      evidenceType: "iac-repo",
      lastVerifiedAt: V,
      description: "Declarative deployment templates, parameters, and repeatable environment builds."
    }),
    resource({
      id: "docker-get-started",
      title: "Docker Get Started",
      provider: "Docker Docs",
      url: "https://docs.docker.com/get-started/",
      resourceType: "lab",
      skillTags: ["devops-containers"],
      difficulty: "beginner",
      durationMinutes: 240,
      qualityScore: 0.89,
      prerequisites: ["devops-linux"],
      evidenceType: "container-image",
      lastVerifiedAt: V,
      description: "Build an image, run a container, persist data, and connect services together."
    }),
    resource({
      id: "docker-dockerfile-concepts",
      title: "Dockerfile Concepts",
      provider: "Docker Docs",
      url: "https://docs.docker.com/build/concepts/dockerfile/",
      resourceType: "doc",
      skillTags: ["devops-containers"],
      difficulty: "intermediate",
      durationMinutes: 150,
      qualityScore: 0.86,
      prerequisites: ["devops-linux"],
      evidenceType: "container-image",
      lastVerifiedAt: V,
      description: "Instructions, build context, layer caching, and writing a lean reproducible image."
    }),
    resource({
      id: "podman-tutorials",
      title: "Podman Tutorials",
      provider: "Podman",
      url: "https://docs.podman.io/en/latest/Tutorials.html",
      resourceType: "lab",
      skillTags: ["devops-containers"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.79,
      prerequisites: ["devops-linux"],
      evidenceType: "container-image",
      lastVerifiedAt: V,
      description: "Running rootless containers and pods without a long-lived daemon."
    }),
    resource({
      id: "kubernetes-basics-tutorial",
      title: "Learn Kubernetes Basics",
      provider: "Kubernetes",
      url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
      resourceType: "lab",
      skillTags: ["devops-kubernetes"],
      difficulty: "intermediate",
      durationMinutes: 300,
      qualityScore: 0.9,
      prerequisites: ["devops-containers"],
      evidenceType: "k8s-manifest",
      lastVerifiedAt: V,
      description: "Deploy, scale, update, and expose an application on a cluster, interactively."
    }),
    resource({
      id: "kubernetes-concepts",
      title: "Kubernetes Concepts",
      provider: "Kubernetes",
      url: "https://kubernetes.io/docs/concepts/",
      resourceType: "doc",
      skillTags: ["devops-kubernetes"],
      difficulty: "advanced",
      durationMinutes: 480,
      qualityScore: 0.88,
      prerequisites: ["devops-containers"],
      evidenceType: "k8s-manifest",
      lastVerifiedAt: V,
      description: "The control plane, workloads, services, storage, and configuration in depth."
    }),
    resource({
      id: "kubernetes-hello-minikube",
      title: "Hello Minikube",
      provider: "Kubernetes",
      url: "https://kubernetes.io/docs/tutorials/hello-minikube/",
      resourceType: "lab",
      skillTags: ["devops-kubernetes"],
      difficulty: "beginner",
      durationMinutes: 90,
      qualityScore: 0.84,
      prerequisites: ["devops-containers"],
      evidenceType: "k8s-manifest",
      lastVerifiedAt: V,
      description: "Run a local cluster and deploy your first application to it end to end."
    }),
    resource({
      id: "github-actions-quickstart",
      title: "GitHub Actions Quickstart",
      provider: "GitHub Docs",
      url: "https://docs.github.com/en/actions/get-started/quickstart",
      resourceType: "doc",
      skillTags: ["devops-cicd"],
      difficulty: "beginner",
      durationMinutes: 120,
      qualityScore: 0.85,
      prerequisites: ["devops-containers"],
      evidenceType: "pipeline-config",
      lastVerifiedAt: V,
      description: "Workflows, triggers, jobs, and running your test suite on every push."
    }),
    resource({
      id: "redhat-what-is-cicd",
      title: "What Is CI/CD?",
      provider: "Red Hat",
      url: "https://www.redhat.com/en/topics/devops/what-is-ci-cd",
      resourceType: "doc",
      skillTags: ["devops-cicd"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.76,
      prerequisites: ["devops-containers"],
      evidenceType: "pipeline-config",
      lastVerifiedAt: V,
      description: "Continuous integration, delivery, and deployment, and where the boundaries sit."
    }),
    resource({
      id: "prometheus-overview",
      title: "Prometheus Overview",
      provider: "Prometheus",
      url: "https://prometheus.io/docs/introduction/overview/",
      resourceType: "doc",
      skillTags: ["devops-observability"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.86,
      prerequisites: ["devops-cloud-core"],
      evidenceType: "dashboard-and-alerts",
      lastVerifiedAt: V,
      description: "The metric model, scraping, and querying time series with PromQL."
    }),
    resource({
      id: "grafana-getting-started",
      title: "Get Started with Grafana",
      provider: "Grafana Labs",
      url: "https://grafana.com/docs/grafana/latest/getting-started/",
      resourceType: "doc",
      skillTags: ["devops-observability"],
      difficulty: "intermediate",
      durationMinutes: 150,
      qualityScore: 0.84,
      prerequisites: ["devops-cloud-core"],
      evidenceType: "dashboard-and-alerts",
      lastVerifiedAt: V,
      description: "Connect a data source, build panels, and set up alerting on a real signal."
    }),
    resource({
      id: "opentelemetry-what-is",
      title: "What Is OpenTelemetry?",
      provider: "OpenTelemetry",
      url: "https://opentelemetry.io/docs/what-is-opentelemetry/",
      resourceType: "doc",
      skillTags: ["devops-observability"],
      difficulty: "advanced",
      durationMinutes: 120,
      qualityScore: 0.85,
      prerequisites: ["devops-cloud-core"],
      evidenceType: "dashboard-and-alerts",
      lastVerifiedAt: V,
      description: "Traces, metrics, and logs under one instrumentation standard, and why it exists."
    }),
    resource({
      id: "google-sre-book",
      title: "Site Reliability Engineering",
      provider: "Google SRE",
      url: "https://sre.google/sre-book/table-of-contents/",
      resourceType: "doc",
      skillTags: ["devops-reliability"],
      difficulty: "advanced",
      durationMinutes: 900,
      qualityScore: 0.94,
      prerequisites: ["devops-observability"],
      evidenceType: "postmortem",
      lastVerifiedAt: V,
      description: "The originating text on SLOs, error budgets, toil, on-call, and postmortem culture."
    }),
    resource({
      id: "google-sre-workbook",
      title: "The Site Reliability Workbook",
      provider: "Google SRE",
      url: "https://sre.google/workbook/table-of-contents/",
      resourceType: "doc",
      skillTags: ["devops-reliability"],
      difficulty: "advanced",
      durationMinutes: 720,
      qualityScore: 0.92,
      prerequisites: ["devops-observability"],
      evidenceType: "postmortem",
      lastVerifiedAt: V,
      description: "The practical companion: implementing SLOs, alerting on them, and running incidents."
    }),
    resource({
      id: "ibm-incident-management",
      title: "What Is Incident Management?",
      provider: "IBM",
      url: "https://www.ibm.com/think/topics/incident-management",
      resourceType: "doc",
      skillTags: ["devops-reliability"],
      difficulty: "intermediate",
      durationMinutes: 60,
      qualityScore: 0.75,
      prerequisites: ["devops-observability"],
      evidenceType: "postmortem",
      lastVerifiedAt: V,
      description: "Detection, triage, escalation, resolution, and the review that follows."
    })
  ]
});
