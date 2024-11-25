export type RewardFilterType = 'ALL' | 'SAVED' | 'USED' | 'EXPIRED';

export interface RewardData {
  name: string;
  tradeReward: number;
  rewardStatus: string;
  createdTime: string | Date;
}


