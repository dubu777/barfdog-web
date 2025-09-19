import { Page, Pagination } from "@/types";

// 적립금
type RewardFilterType = 'ALL' | 'SAVED' | 'USED';
type RewardStatus = 'SAVED' | 'USED';

interface RewardInfo {
  name: string;
  tradeReward: number;
  rewardStatus: RewardStatus;
  createdTime: string;
}

interface RewardList {
  pagination: Pagination;
  rewardList: RewardInfo[];
  totalRewards: number;
}

// 친구 초대 적립금
interface InviteRewardList {
  recommend: string | null;
  joinedCount: number;
  orderedCount: number;
  totalRewards: number;
  rewardList: RewardInfo[];
  page: Page;
}

interface InviteRewardResponse {
  joinedCount: number;
  orderedCount: number;
  recommend: string;
  totalRewards: number;
  pagedModel: {
    _embedded: {
      queryRewardsDtoList: RewardInfo[]
    }
    page: Page;
  };
}

export type {
  RewardFilterType,
  RewardInfo,
  RewardList,
  InviteRewardList,
  InviteRewardResponse,
};