
export enum Role {
  SURVIVOR = 'Survivor',
  KILLER = 'Killer'
}

export enum PerkCategory {
  CHASE = 'Chase',
  STEALTH = 'Stealth',
  OBJECTIVE = 'Objective',
  INFO = 'Information',
  SURVIVAL = 'Survival',
  DISRUPTION = 'Disruption'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PerkDetails {
  id: string;
  name: string;
  role: Role;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Ultra Rare';
  category: PerkCategory;
  source: string; // The character name or 'General'
  description: string;
  hiddenMechanics: string[];
  usageSteps: string[];
  bestCaseScenario: string;
  quiz: QuizQuestion[];
  untoldTips: string;
}

export interface GameStatus {
  name: string;
  effect: string;
  icon: string;
}
