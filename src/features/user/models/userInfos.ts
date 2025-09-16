export interface UserInfos {
  id: string;
  email: string;
  totalXp: number;
  level: number;
  xpRequiredForNextLevel: number;
  xpForThisLevel: number;
  isInvestmentUnlocked: boolean;
  levelRequiredToUnlockInvestment: number;
}
