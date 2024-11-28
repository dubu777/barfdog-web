export type RewardFilterType = 'ALL' | 'SAVED' | 'USED' | 'EXPIRED';

export interface RewardData {
  name: string;
  tradeReward: number;
  rewardStatus: string;
  createdTime: string | Date;
}

export interface Page {
  size?: number;
  totalElements?: number;
  totalPages: number;
  number: number;
}

export interface RewardListData {
  page: Page;
  rewardList: RewardData[];
  totalCount: number;
  totalReward: number;
}

export interface RewardResponse {
  reward: number;
  pagedModel: {
    _embedded: {
      queryRewardsDtoList: RewardData[]
    }
    page: Page;
  };
}