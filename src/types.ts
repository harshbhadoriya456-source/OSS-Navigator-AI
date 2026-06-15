export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface RepoTechnology {
  name: string;
  color: string;
}

export interface RepoOverview {
  purpose: string;
  technologies: RepoTechnology[];
  difficulty: DifficultyLevel;
  stars: string;
  forks: string;
  description: string;
  language?: string;
  openIssues?: number;
  friendlinessScore?: number;
  onboardingTime?: string;
  recommendedContributions?: string;
  healthScore?: number;
  readyScore?: number;
  contributorsCount?: number;
  lastUpdated?: string;
}

export interface RepoStructureItem {
  id: string;
  path: string;
  type: "folder" | "file";
  purpose: string;
  importance: "High" | "Medium" | "Low";
}

export interface SetupStep {
  description: string;
  command: string;
}

export interface GettingStartedGuide {
  forkDesc: string;
  cloneCommand: string;
  setupCommands: SetupStep[];
  prerequisites: string[];
}

export interface FirstStep {
  title: string;
  desc: string;
  category: "Code" | "Docs" | "Community";
}

export interface BeginnerIdea {
  title: string;
  difficulty: "Easy" | "Medium";
  filesInvolved: string;
  description: string;
}

export interface ContributionRoadmap {
  suggestedFirstSteps: FirstStep[];
  beginnerIdeas: BeginnerIdea[];
  prChecklist: string[];
}

export interface LearningOutcome {
  title: string;
  desc: string;
  icon: string;
}

export interface CanIContribute {
  contributionScore: number;
  beginnerScore: number;
  learningScore: number;
  complexityScore: number;
  recommendation: "Strongly Recommended" | "Recommended" | "Not Recommended Yet";
  reasoning: string;
}

export interface RepoAnalysis {
  owner: string;
  name: string;
  url: string;
  overview: RepoOverview;
  structure: RepoStructureItem[];
  gettingStarted: GettingStartedGuide;
  roadmap: ContributionRoadmap;
  learningOutcomes: LearningOutcome[];
  architectureOverview?: string;
  beginnerStartGuide?: string;
  canIContribute?: CanIContribute;
}
