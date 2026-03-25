export interface Milestone {
  id: string;
  milestoneId: string;
  label: string;
  percentage: number;
  unlocked: boolean;
  tokenBatch: number;
}

export class MilestoneEngine {
  campaignName: string;
  targetAmount: number;
  currentAmount: number;
  milestones: Milestone[];

  constructor(campaignName: string, targetAmount: number) {
    this.campaignName = campaignName;
    this.targetAmount = targetAmount;
    this.currentAmount = 0;
    this.milestones = [
      { id: 'm1', milestoneId: 'm1', label: 'Launch Phase', percentage: 25, unlocked: false, tokenBatch: Math.floor(targetAmount * 0.1) },
      { id: 'm2', milestoneId: 'm2', label: 'Midway Goal', percentage: 50, unlocked: false, tokenBatch: Math.floor(targetAmount * 0.2) },
      { id: 'm3', milestoneId: 'm3', label: 'Stretch Goal', percentage: 75, unlocked: false, tokenBatch: Math.floor(targetAmount * 0.3) },
    ];
  }

  updateProgress(newAmount: number) {
    this.currentAmount = newAmount;
    const currentPercentage = (this.currentAmount / this.targetAmount) * 100;
    
    for (const milestone of this.milestones) {
      if (currentPercentage >= milestone.percentage) {
        milestone.unlocked = true;
      }
    }
  }

  getProgress() {
    const percentage = Math.min((this.currentAmount / this.targetAmount) * 100, 100);
    return {
      percentage,
      currentAmount: this.currentAmount,
      targetAmount: this.targetAmount,
      milestones: this.milestones,
    };
  }

  getUnlockedStatus() {
    return this.milestones.map(m => ({
      milestoneId: m.milestoneId,
      unlocked: m.unlocked
    }));
  }

  calculateBonusTokens(contributionAmount: number, milestoneId: string): number {
    // 10% bonus for reaching a milestone target
    return contributionAmount * 0.1;
  }
}

export function createMilestoneEngine(campaignName: string, targetAmount: number): MilestoneEngine {
  return new MilestoneEngine(campaignName, targetAmount);
}
