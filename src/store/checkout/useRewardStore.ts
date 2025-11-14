import { create } from "zustand";

interface RewardState {
  userTotalReward: number;
  appliedReward: number;
  maxAvailableReward: number;
  setUserTotalReward: (reward: number) => void;
  setAppliedReward: (reward: number) => void;
  setMaxAvailableReward: (reward: number) => void;
}

export const useRewardStore = create<RewardState>((set) => ({
  userTotalReward: 0,
  appliedReward: 0,
  maxAvailableReward: 0,
  setUserTotalReward: (reward) => set({ userTotalReward: Number(reward) }),
  setAppliedReward: (reward) => set({ appliedReward: Number(reward) }),
  setMaxAvailableReward: (reward) =>
    set({ maxAvailableReward: Number(reward) }),
}));
