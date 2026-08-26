import { defineDomain, resource } from "@/lib/data/catalog-helpers";

const V = "2026-08-26";

/** Every URL below returned HTTP 200 on 2026-08-26. */
export const itSupport = defineDomain({
  domain: {
    id: "it-support",
    name: "IT Support & Networking",
    description: "Keep people working: fix devices, run the network, and document what you did."
  },

  roles: [
    {
      id: "help-desk-technician",
      title: "Help Desk Technician",
      description: "First line of support — diagnose, resolve, escalate, and write it down clearly.",
      requiredSkills: [
        { skillId: "it-hardware", importance: 0.9 },
        { skillId: "it-operating-systems", importance: 1 },
        { skillId: "it-troubleshooting", importance: 1 },
        { skillId: "it-ticketing", importance: 0.9 },
        { skillId: "it-customer-service", importance: 1 },
        { skillId: "it-command-line", importance: 0.6 },
        { skillId: "it-networking-fundamentals", importance: 0.6 },
        { skillId: "it-endpoint-security", importance: 0.7 }
      ]
    },
    {
      id: "network-administrator",
      title: "Network Administrator",
      description: "Configure and defend the network the rest of the organisation runs on.",
      requiredSkills: [
        { skillId: "it-networking-fundamentals", importance: 1 },
        { skillId: "it-network-configuration", importance: 1 },
        { skillId: "it-command-line", importance: 0.8 },
        { skillId: "it-endpoint-security", importance: 0.9 },
        { skillId: "it-operating-systems", importance: 0.8 },
        { skillId: "it-directory-services", importance: 0.8 },
        { skillId: "it-hardware", importance: 0.6 },
        { skillId: "it-troubleshooting", importance: 0.8 }
      ]
    }
  ],

  skills: [
    {
      id: "it-hardware",
      name: "Computer Hardware",
      category: "foundations",
      description: "CPUs, memory, storage, peripherals, and diagnosing a failing component.",
      prerequisites: []
    },
    {
      id: "it-operating-systems",
      name: "Operating Systems",
      category: "foundations",
      description: "Installation, users and permissions, updates, processes, and system settings.",
      prerequisites: []
    },
    {
      id: "it-networking-fundamentals",
      name: "Networking Fundamentals",
      category: "networking",
      description: "IP addressing, subnets, DNS, DHCP, and the layers a packet travels through.",
      prerequisites: []
    },
    {
      id: "it-customer-service",
      name: "Customer Service",
      category: "communication",
      description: "Listening, expectation setting, and explaining a fix without condescension.",
      prerequisites: []
    },
    {
      id: "it-command-line",
      name: "Command Line",
      category: "foundations",
      description: "Navigate, inspect, and repair a system from a shell on Windows or Linux.",
      prerequisites: ["it-operating-systems"]
    },
    {
      id: "it-troubleshooting",
      name: "Troubleshooting Methodology",
      category: "support",
      description: "Isolate the variable, test one change at a time, and verify before closing.",
      prerequisites: ["it-hardware", "it-operating-systems"]
    },
    {
      id: "it-directory-services",
      name: "Directory Services",
      category: "administration",
      description: "Accounts, groups, and policy in Active Directory or a cloud identity provider.",
      prerequisites: ["it-operating-systems"]
    },
    {
      id: "it-network-configuration",
      name: "Network Configuration",
      category: "networking",
      description: "Switches, VLANs, routing, wireless, and diagnosing connectivity end to end.",
      prerequisites: ["it-networking-fundamentals"]
    },
    {
      id: "it-endpoint-security",
      name: "Endpoint Security",
      category: "security",
      description: "Patching, antivirus, disk encryption, least privilege, and safe configuration.",
      prerequisites: ["it-networking-fundamentals"]
    },
    {
      id: "it-ticketing",
      name: "Ticketing & Documentation",
      category: "support",
      description: "Capture the symptom, the steps taken, and the resolution so the next person can reuse it.",
      prerequisites: ["it-customer-service"]
    }
  ],

  resources: [
    resource({
      id: "messer-aplus-1201",
      title: "CompTIA A+ 220-1201 Training Course",
      provider: "Professor Messer",
      url: "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/",
      resourceType: "video",
      skillTags: ["it-hardware"],
      difficulty: "beginner",
      durationMinutes: 1200,
      qualityScore: 0.9,
      evidenceType: "hardware-lab-log",
      lastVerifiedAt: V,
      description: "The full hardware, networking, and mobile-device video course, free in full."
    }),
    resource({
      id: "comptia-aplus-certification",
      title: "CompTIA A+ Certification",
      provider: "CompTIA",
      url: "https://www.comptia.org/en-us/certifications/a/",
      resourceType: "doc",
      skillTags: ["it-hardware"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.76,
      evidenceType: "hardware-lab-log",
      lastVerifiedAt: V,
      description: "The exam objectives, which double as a checklist of what a technician should know."
    }),
    resource({
      id: "messer-aplus-1202",
      title: "CompTIA A+ 220-1202 Training Course",
      provider: "Professor Messer",
      url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/",
      resourceType: "video",
      skillTags: ["it-operating-systems", "it-troubleshooting"],
      difficulty: "beginner",
      durationMinutes: 1200,
      qualityScore: 0.9,
      evidenceType: "support-runbook",
      lastVerifiedAt: V,
      description: "Operating systems, security, software troubleshooting, and operational procedures."
    }),
    resource({
      id: "ms-windows-client-management",
      title: "Windows Client Management",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/windows/client-management/",
      resourceType: "doc",
      skillTags: ["it-operating-systems"],
      difficulty: "intermediate",
      durationMinutes: 300,
      qualityScore: 0.83,
      evidenceType: "support-runbook",
      lastVerifiedAt: V,
      description: "Deploying, configuring, and managing Windows clients across an organisation."
    }),
    resource({
      id: "ms-troubleshoot-windows-client",
      title: "Windows Client Troubleshooting",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/welcome-windows-client",
      resourceType: "doc",
      skillTags: ["it-troubleshooting"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.84,
      prerequisites: ["it-operating-systems"],
      evidenceType: "support-runbook",
      lastVerifiedAt: V,
      description: "Documented diagnostic paths for boot, performance, networking, and update failures."
    }),
    resource({
      id: "ms-troubleshoot-tcpip",
      title: "Troubleshoot TCP/IP Connectivity",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/windows/client-management/troubleshoot-tcpip",
      resourceType: "doc",
      skillTags: ["it-troubleshooting", "it-network-configuration"],
      difficulty: "advanced",
      durationMinutes: 180,
      qualityScore: 0.85,
      prerequisites: ["it-networking-fundamentals"],
      evidenceType: "network-diagnostic-log",
      lastVerifiedAt: V,
      description: "Working a connectivity fault down the stack with packet capture and built-in tools."
    }),
    resource({
      id: "messer-network-plus",
      title: "CompTIA Network+ N10-009 Training Course",
      provider: "Professor Messer",
      url: "https://www.professormesser.com/free-network-plus-training/n10-009/n10-009-video/n10-009-training-course/",
      resourceType: "video",
      skillTags: ["it-networking-fundamentals", "it-network-configuration"],
      difficulty: "intermediate",
      durationMinutes: 1500,
      qualityScore: 0.91,
      evidenceType: "network-diagram",
      lastVerifiedAt: V,
      description: "Media, topologies, protocols, routing, wireless, and network troubleshooting."
    }),
    resource({
      id: "ibm-networking-topic",
      title: "What Is Computer Networking?",
      provider: "IBM",
      url: "https://www.ibm.com/think/topics/networking",
      resourceType: "doc",
      skillTags: ["it-networking-fundamentals"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.75,
      evidenceType: "network-diagram",
      lastVerifiedAt: V,
      description: "Network types, topologies, and core components, as a plain-language primer."
    }),
    resource({
      id: "comptia-network-certification",
      title: "CompTIA Network+ Certification",
      provider: "CompTIA",
      url: "https://www.comptia.org/en-us/certifications/network/",
      resourceType: "doc",
      skillTags: ["it-network-configuration"],
      difficulty: "intermediate",
      durationMinutes: 60,
      qualityScore: 0.76,
      prerequisites: ["it-networking-fundamentals"],
      evidenceType: "network-diagram",
      lastVerifiedAt: V,
      description: "Exam objectives covering implementation, operations, and network security."
    }),
    resource({
      id: "ms-powershell-ps101",
      title: "PowerShell 101",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/00-introduction",
      resourceType: "course",
      skillTags: ["it-command-line"],
      difficulty: "beginner",
      durationMinutes: 300,
      qualityScore: 0.87,
      prerequisites: ["it-operating-systems"],
      evidenceType: "admin-script",
      lastVerifiedAt: V,
      description: "Cmdlets, the pipeline, filtering, and scripting routine administration safely."
    }),
    resource({
      id: "linuxcommand-org",
      title: "LinuxCommand.org",
      provider: "LinuxCommand.org",
      url: "https://linuxcommand.org/",
      resourceType: "doc",
      skillTags: ["it-command-line"],
      difficulty: "beginner",
      durationMinutes: 300,
      qualityScore: 0.82,
      prerequisites: ["it-operating-systems"],
      evidenceType: "admin-script",
      lastVerifiedAt: V,
      description: "Shell basics through to writing your own scripts, aimed squarely at beginners."
    }),
    resource({
      id: "swc-shell-novice",
      title: "The Unix Shell",
      provider: "Software Carpentry",
      url: "https://swcarpentry.github.io/shell-novice/",
      resourceType: "lab",
      skillTags: ["it-command-line"],
      difficulty: "beginner",
      durationMinutes: 180,
      qualityScore: 0.85,
      prerequisites: ["it-operating-systems"],
      evidenceType: "admin-script",
      lastVerifiedAt: V,
      description: "A hands-on lesson with exercises: files, pipes, loops, and shell scripts."
    }),
    resource({
      id: "ms-active-directory-overview",
      title: "Active Directory Domain Services Overview",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview",
      resourceType: "doc",
      skillTags: ["it-directory-services"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.84,
      prerequisites: ["it-operating-systems"],
      evidenceType: "directory-config",
      lastVerifiedAt: V,
      description: "Domains, forests, domain controllers, and how authentication actually resolves."
    }),
    resource({
      id: "ms-entra-rbac-custom",
      title: "Custom Roles in Microsoft Entra",
      provider: "Microsoft Learn",
      url: "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-overview",
      resourceType: "doc",
      skillTags: ["it-directory-services", "it-endpoint-security"],
      difficulty: "advanced",
      durationMinutes: 120,
      qualityScore: 0.8,
      prerequisites: ["it-operating-systems"],
      evidenceType: "directory-config",
      lastVerifiedAt: V,
      description: "Least-privilege role design, and scoping permissions to what a job actually needs."
    }),
    resource({
      id: "ibm-endpoint-security",
      title: "What Is Endpoint Security?",
      provider: "IBM",
      url: "https://www.ibm.com/think/topics/endpoint-security",
      resourceType: "doc",
      skillTags: ["it-endpoint-security"],
      difficulty: "intermediate",
      durationMinutes: 60,
      qualityScore: 0.78,
      prerequisites: ["it-networking-fundamentals"],
      evidenceType: "hardening-checklist",
      lastVerifiedAt: V,
      description: "Endpoint threats and the controls that reduce them, from patching to encryption."
    }),
    resource({
      id: "atlassian-service-request-management",
      title: "Service Request Management",
      provider: "Atlassian",
      url: "https://www.atlassian.com/itsm/service-request-management",
      resourceType: "doc",
      skillTags: ["it-ticketing"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.8,
      prerequisites: ["it-customer-service"],
      evidenceType: "ticket-log",
      lastVerifiedAt: V,
      description: "Intake, categorisation, fulfilment, and the queue behaviour behind good support."
    }),
    resource({
      id: "atlassian-itsm-incident-management",
      title: "Incident Management for IT Teams",
      provider: "Atlassian",
      url: "https://www.atlassian.com/itsm/incident-management",
      resourceType: "doc",
      skillTags: ["it-ticketing"],
      difficulty: "intermediate",
      durationMinutes: 90,
      qualityScore: 0.82,
      prerequisites: ["it-customer-service"],
      evidenceType: "ticket-log",
      lastVerifiedAt: V,
      description: "Severity, escalation, communication, and closing the loop after an outage."
    }),
    resource({
      id: "zendesk-customer-service-skills",
      title: "Customer Service Skills",
      provider: "Zendesk",
      url: "https://www.zendesk.com/blog/customer-service-skills/",
      resourceType: "doc",
      skillTags: ["it-customer-service"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.75,
      evidenceType: "support-transcript",
      lastVerifiedAt: V,
      description: "Active listening, tone, and de-escalation, with concrete phrasing examples."
    }),
    resource({
      id: "helpscout-customer-service-skills",
      title: "Customer Service Skills",
      provider: "Help Scout",
      url: "https://www.helpscout.com/blog/customer-service-skills/",
      resourceType: "doc",
      skillTags: ["it-customer-service"],
      difficulty: "beginner",
      durationMinutes: 30,
      qualityScore: 0.72,
      evidenceType: "support-transcript",
      lastVerifiedAt: V,
      description: "The skills that separate a resolved ticket from a satisfied person."
    })
  ]
});
