export {
  RewardFilterType,
  RewardData,
  RewardListData,
  RewardResponse,
};

type RewardFilterType = 'ALL' | 'SAVED' | 'USED' | 'EXPIRED';

interface RewardData {
  name: string;
  tradeReward: number;
  rewardStatus: string;
  createdTime: string | Date;
}

interface Page {
  size?: number;
  totalElements?: number;
  totalPages: number;
  number: number;
}

interface RewardListData {
  page: Page;
  rewardList: RewardData[];
  totalCount: number;
  totalReward: number;
}

interface RewardResponse {
  reward: number;
  pagedModel: {
    _embedded: {
      queryRewardsDtoList: RewardData[]
    }
    page: Page;
  };
}