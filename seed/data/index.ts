import type { DomainBundle } from "@/lib/data/catalog-helpers";
import { defineDomain } from "@/lib/data/catalog-helpers";
import {
  domain as cybersecurityDomain,
  learningResources as cybersecurityResources,
  roles as cybersecurityRoles,
  skillGraph as cybersecuritySkills
} from "@/lib/data/demo-catalog";
import {
  domain as dataDomain,
  learningResources as dataResources,
  roles as dataRoles,
  skillGraph as dataSkills
} from "@/lib/data/data-analytics-catalog";
import { webDevelopment } from "@/lib/data/domains/web-development";
import { cloudDevops } from "@/lib/data/domains/cloud-devops";
import { aiMachineLearning } from "@/lib/data/domains/ai-machine-learning";
import { uxDesign } from "@/lib/data/domains/ux-design";
import { productManagement } from "@/lib/data/domains/product-management";
import { mobileDevelopment } from "@/lib/data/domains/mobile-development";
import { itSupport } from "@/lib/data/domains/it-support";

export type { DomainBundle };

/**
 * The full seedable catalog. Adding a domain here is the only step needed for
 * the app to support it — nothing downstream hardcodes a domain id.
 *
 * The first two predate `defineDomain` and stamp their own domainId, which is
 * why they are assembled by hand rather than through the helper.
 */
export const domains: DomainBundle[] = [
  {
    domain: cybersecurityDomain,
    roles: cybersecurityRoles,
    skills: cybersecuritySkills.skills,
    resources: cybersecurityResources
  },
  {
    domain: dataDomain,
    roles: dataRoles,
    skills: dataSkills.skills,
    resources: dataResources
  },
  webDevelopment,
  cloudDevops,
  aiMachineLearning,
  uxDesign,
  productManagement,
  mobileDevelopment,
  itSupport
];

export { defineDomain };

export const allResources = domains.flatMap((bundle) => bundle.resources);
export const allSkills = domains.flatMap((bundle) => bundle.skills);
export const allRoles = domains.flatMap((bundle) => bundle.roles);
