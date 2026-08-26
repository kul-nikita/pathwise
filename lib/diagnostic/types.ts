import type { Difficulty } from "@/lib/types";

export type DiagnosticQuestion = {
  id: string;
  skillId: string;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  correctIndex: number;
};
