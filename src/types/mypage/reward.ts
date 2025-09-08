import { Page } from "@/types";

type RewardFilterType = 'ALL' | 'SAVED' | 'USED' | 'EXPIRED';

type RewardStatus = 'SAVED' | 'USED';

interface RewardData {
  name: string;
  tradeReward: number;
  rewardStatus: RewardStatus;
  createdTime: string;
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

interface InviteRewardResponse {
  joinedCount: number;
  orderedCount: number;
  recommend: string;
  totalRewards: number;
  pagedModel: {
    _embedded: {
      queryRewardsDtoList: RewardData[]
    }
    page: Page;
  };
}

export type {
  RewardFilterType,
  RewardData,
  RewardListData,
  RewardResponse,
  RewardListDataWithTotals,
  InviteRewardList,
  InviteRewardResponse,
};