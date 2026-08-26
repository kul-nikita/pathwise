import type { Domain, LearningResource, Role, Skill } from "@/lib/types";

export type DomainBundle = {
  domain: Domain;
  roles: Role[];
  skills: Skill[];
  resources: LearningResource[];
};

/**
 * Every resource row repeats the same five fields. Defaulting them here keeps a
 * catalog entry down to what actually varies, so a 30-row domain stays readable
 * and a wrong `costType` is visible instead of buried in boilerplate.
 *
 * `lastVerifiedAt` has no default on purpose — it is a claim about a real check
 * that someone performed on a real day, and defaulting it would let an
 * unverified row inherit a verification date it never earned.
 */
export type ResourceInput = Omit<
  LearningResource,
  "language" | "isCurated" | "costType" | "prerequisites"
> &
  Partial<Pick<LearningResource, "language" | "isCurated" | "costType" | "prerequisites">>;

export function resource(input: ResourceInput): LearningResource {
  return {
    language: "en",
    isCurated: true,
    costType: "free",
    prerequisites: [],
    ...input
  };
}

/**
 * Stamps `domainId` onto a domain's roles and skills so no catalog has to
 * repeat it per row — and, more usefully, so a role and a skill can never
 * disagree about which domain they belong to.
 */
export function defineDomain(input: {
  domain: Domain;
  roles: Array<Omit<Role, "domainId">>;
  skills: Array<Omit<Skill, "domainId">>;
  resources: LearningResource[];
}): DomainBundle {
  const domainId = input.domain.id;

  return {
    domain: input.domain,
    roles: input.roles.map((role) => ({ ...role, domainId })),
    skills: input.skills.map((skill) => ({ ...skill, domainId })),
    resources: input.resources
  };
}
