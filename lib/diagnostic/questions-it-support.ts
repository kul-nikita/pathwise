import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

export const itSupportQuestions: DiagnosticQuestion[] = [
  // it-hardware
  {
    id: "ithw-b",
    skillId: "it-hardware",
    difficulty: "beginner",
    prompt: "Which component stores data persistently when the machine is powered off?",
    options: ["RAM", "The SSD or hard drive", "The CPU cache", "The GPU"],
    correctIndex: 1
  },
  {
    id: "ithw-i",
    skillId: "it-hardware",
    difficulty: "intermediate",
    prompt: "A desktop powers on, fans spin, but there is no display and no beep. What should you check first?",
    options: [
      "Reinstall the operating system",
      "Reseat the RAM and confirm the monitor cable and input source",
      "Replace the hard drive",
      "Update the antivirus"
    ],
    correctIndex: 1
  },
  {
    id: "ithw-a",
    skillId: "it-hardware",
    difficulty: "advanced",
    prompt: "A laptop runs fine briefly, then slows sharply under load. What is the most likely cause?",
    options: [
      "A failing network card",
      "Thermal throttling from dust or dried thermal paste reducing heat dissipation",
      "An expired software licence",
      "Insufficient disk partitions"
    ],
    correctIndex: 1
  },

  // it-operating-systems
  {
    id: "itos-b",
    skillId: "it-operating-systems",
    difficulty: "beginner",
    prompt: "What does an operating system's user account control primarily provide?",
    options: [
      "Faster boot times",
      "Separation of privileges, so routine work does not run with administrative rights",
      "Automatic backups",
      "Better graphics performance"
    ],
    correctIndex: 1
  },
  {
    id: "itos-i",
    skillId: "it-operating-systems",
    difficulty: "intermediate",
    prompt: "A machine boots to a black screen after an update. What is the appropriate first step?",
    options: [
      "Reinstall Windows immediately",
      "Boot into safe mode to isolate whether a driver or service is responsible",
      "Replace the motherboard",
      "Reset the user's password"
    ],
    correctIndex: 1
  },
  {
    id: "itos-a",
    skillId: "it-operating-systems",
    difficulty: "advanced",
    prompt: "Why does a user with local administrator rights increase risk beyond their own machine?",
    options: [
      "Admin accounts consume more memory",
      "Malware inherits those rights, letting it disable protections and harvest credentials for lateral movement",
      "It slows down the domain controller",
      "It prevents updates from installing"
    ],
    correctIndex: 1
  },

  // it-networking-fundamentals
  {
    id: "itnet-b",
    skillId: "it-networking-fundamentals",
    difficulty: "beginner",
    prompt: "What does DHCP do on a network?",
    options: [
      "Resolves domain names to addresses",
      "Automatically assigns IP configuration to devices when they connect",
      "Encrypts wireless traffic",
      "Routes traffic between networks"
    ],
    correctIndex: 1
  },
  {
    id: "itnet-i",
    skillId: "it-networking-fundamentals",
    difficulty: "intermediate",
    prompt: "A user can reach a site by IP address but not by name. What is the likely fault?",
    options: [
      "The network cable is unplugged",
      "DNS resolution — the address works, so routing is fine but name lookup is failing",
      "The firewall blocks all traffic",
      "The IP address is static"
    ],
    correctIndex: 1
  },
  {
    id: "itnet-a",
    skillId: "it-networking-fundamentals",
    difficulty: "advanced",
    prompt: "A device shows an address in the 169.254.x.x range. What does that indicate?",
    options: [
      "It has a valid public address",
      "It self-assigned a link-local address because no DHCP server responded",
      "It is connected via VPN",
      "The subnet mask is too large"
    ],
    correctIndex: 1
  },

  // it-customer-service
  {
    id: "itcs-b",
    skillId: "it-customer-service",
    difficulty: "beginner",
    prompt: "A frustrated user says nothing ever works. What is the best opening response?",
    options: [
      "Point out that the last three tickets were user error",
      "Acknowledge the frustration and ask them to walk you through what happened",
      "Transfer the call immediately",
      "Explain that the system is working as designed"
    ],
    correctIndex: 1
  },
  {
    id: "itcs-i",
    skillId: "it-customer-service",
    difficulty: "intermediate",
    prompt: "A fix will take two days. What should you tell the user?",
    options: [
      "Say it will be fixed shortly to keep them calm",
      "Give the realistic timeframe, the reason, and when you will next update them",
      "Say nothing until it is resolved",
      "Suggest they raise a new ticket tomorrow"
    ],
    correctIndex: 1
  },
  {
    id: "itcs-a",
    skillId: "it-customer-service",
    difficulty: "advanced",
    prompt: "Why does explaining a fix in plain language matter as much as the fix itself?",
    options: [
      "It shortens the ticket record",
      "It lets the user recognise or avoid the problem next time, and preserves their trust in asking again",
      "It is required for compliance",
      "Technical terms are usually inaccurate"
    ],
    correctIndex: 1
  },

  // it-command-line
  {
    id: "itcli-b",
    skillId: "it-command-line",
    difficulty: "beginner",
    prompt: "Which command displays the current IP configuration on Windows?",
    options: ["ping", "ipconfig", "chkdsk", "tasklist"],
    correctIndex: 1
  },
  {
    id: "itcli-i",
    skillId: "it-command-line",
    difficulty: "intermediate",
    prompt: "In PowerShell, what does the pipeline pass between commands?",
    options: [
      "Plain text lines",
      "Objects, so properties can be accessed without parsing text",
      "File handles",
      "Exit codes only"
    ],
    correctIndex: 1
  },
  {
    id: "itcli-a",
    skillId: "it-command-line",
    difficulty: "advanced",
    prompt: "Why test a bulk administrative script against one account before running it estate-wide?",
    options: [
      "Scripts run faster the second time",
      "A logic error applied to every account at once is far harder to reverse than a single mistake",
      "Because scripts must be run twice to take effect",
      "To warm up the directory cache"
    ],
    correctIndex: 1
  },

  // it-troubleshooting
  {
    id: "ittrb-b",
    skillId: "it-troubleshooting",
    difficulty: "beginner",
    prompt: "What is the first step of a structured troubleshooting process?",
    options: [
      "Apply the most likely fix",
      "Identify the problem by gathering information and reproducing it",
      "Escalate to the vendor",
      "Document the resolution"
    ],
    correctIndex: 1
  },
  {
    id: "ittrb-i",
    skillId: "it-troubleshooting",
    difficulty: "intermediate",
    prompt: "Why change only one variable at a time while diagnosing?",
    options: [
      "It is faster overall",
      "If several changes are made together, you cannot tell which one fixed it — or broke something else",
      "Systems only accept one change per session",
      "It reduces network traffic"
    ],
    correctIndex: 1
  },
  {
    id: "ittrb-a",
    skillId: "it-troubleshooting",
    difficulty: "advanced",
    prompt: "Several users on one floor lose network access simultaneously. What does that pattern suggest?",
    options: [
      "Each machine has a separate fault",
      "A shared component — a switch, uplink, or wireless access point serving that area",
      "A problem with each user's account",
      "The internet provider is down globally"
    ],
    correctIndex: 1
  },

  // it-directory-services
  {
    id: "itdir-b",
    skillId: "it-directory-services",
    difficulty: "beginner",
    prompt: "What is a security group used for in a directory service?",
    options: [
      "Storing user passwords",
      "Assigning permissions to many accounts at once through a single membership",
      "Backing up user files",
      "Monitoring network traffic"
    ],
    correctIndex: 1
  },
  {
    id: "itdir-i",
    skillId: "it-directory-services",
    difficulty: "intermediate",
    prompt: "A user's new group membership has not taken effect. What is the usual reason?",
    options: [
      "The group was created incorrectly",
      "Their existing session still carries the old token — they need to sign out and back in",
      "Directory services cannot change memberships",
      "The account must be recreated"
    ],
    correctIndex: 1
  },
  {
    id: "itdir-a",
    skillId: "it-directory-services",
    difficulty: "advanced",
    prompt: "Why assign permissions to groups rather than to individual users?",
    options: [
      "Individual permissions are not supported",
      "Group-based access stays auditable and revocable as people join, move, and leave",
      "It uses less disk space",
      "Groups authenticate faster"
    ],
    correctIndex: 1
  },

  // it-network-configuration
  {
    id: "itncfg-b",
    skillId: "it-network-configuration",
    difficulty: "beginner",
    prompt: "What does a VLAN accomplish?",
    options: [
      "Increases the physical cable speed",
      "Separates one physical network into isolated logical segments",
      "Encrypts all traffic on the switch",
      "Assigns public IP addresses"
    ],
    correctIndex: 1
  },
  {
    id: "itncfg-i",
    skillId: "it-network-configuration",
    difficulty: "intermediate",
    prompt: "What is the purpose of a default gateway?",
    options: [
      "It stores the DNS cache",
      "It is where a device sends traffic destined outside its own subnet",
      "It assigns MAC addresses",
      "It filters spam"
    ],
    correctIndex: 1
  },
  {
    id: "itncfg-a",
    skillId: "it-network-configuration",
    difficulty: "advanced",
    prompt: "Wireless users report intermittent drops in one area while wired users are fine. What should you investigate?",
    options: [
      "The DHCP scope only",
      "Channel overlap, interference, and access-point coverage or client density in that area",
      "The server's disk usage",
      "The users' account permissions"
    ],
    correctIndex: 1
  },

  // it-endpoint-security
  {
    id: "itsec-b",
    skillId: "it-endpoint-security",
    difficulty: "beginner",
    prompt: "Why does full-disk encryption matter on a laptop?",
    options: [
      "It speeds up the drive",
      "If the device is lost or stolen, the data is unreadable without the key",
      "It prevents all malware",
      "It is required for wireless access"
    ],
    correctIndex: 1
  },
  {
    id: "itsec-i",
    skillId: "it-endpoint-security",
    difficulty: "intermediate",
    prompt: "Why is timely patching one of the most effective endpoint controls?",
    options: [
      "Patches improve battery life",
      "Most successful attacks exploit known vulnerabilities for which a fix already exists",
      "Patching replaces the need for antivirus",
      "It reduces licensing cost"
    ],
    correctIndex: 1
  },
  {
    id: "itsec-a",
    skillId: "it-endpoint-security",
    difficulty: "advanced",
    prompt: "What does the principle of least privilege require?",
    options: [
      "Every user gets an administrator account for convenience",
      "Each account holds only the permissions its role actually needs, and no more",
      "All permissions are reviewed once a decade",
      "Privileges are assigned by seniority"
    ],
    correctIndex: 1
  },

  // it-ticketing
  {
    id: "ittkt-b",
    skillId: "it-ticketing",
    difficulty: "beginner",
    prompt: "What makes a ticket title useful?",
    options: [
      "It records who is to blame",
      "It states the specific symptom, so it can be found and understood at a glance",
      "It is as short as possible",
      "It contains the resolution"
    ],
    correctIndex: 1
  },
  {
    id: "ittkt-i",
    skillId: "it-ticketing",
    difficulty: "intermediate",
    prompt: "What distinguishes an incident from a service request?",
    options: [
      "Incidents are always resolved faster",
      "An incident is an unplanned interruption; a service request is a routine, expected ask",
      "Service requests are only raised by managers",
      "There is no practical difference"
    ],
    correctIndex: 1
  },
  {
    id: "ittkt-a",
    skillId: "it-ticketing",
    difficulty: "advanced",
    prompt: "Why record the diagnostic steps that did not work, not just the fix?",
    options: [
      "To justify the time spent",
      "It stops the next technician repeating dead ends, and reveals patterns when the issue recurs",
      "Ticketing systems require a minimum length",
      "Failed steps are needed for billing"
    ],
    correctIndex: 1
  }
];
