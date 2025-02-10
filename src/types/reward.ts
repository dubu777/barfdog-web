export type {
  RewardFilterType,
  RewardData,
  RewardListData,
  RewardResponse,
  RewardListDataWithTotals,
  InviteRewardList,
};

type RewardFilterType = 'ALL' | 'SAVED' | 'USED' | 'EXPIRED';

type RewardStatus = 'SAVED' | 'USED';

interface RewardData {
  name: string;
  tradeReward: number;
  rewardStatus: RewardStatus;
  createdTime: string;
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
}

interface RewardListDataWithTotals extends RewardListData {
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

interface InviteRewardList {
  recommend: string | null;
  joinedCount: number;
  orderedCount: number;
  totalRewards: number;
  rewardList: RewardData[];
  page: Page;
}