import { ReviewFormData } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialReviewFormData = {
  id: 0,
  title: '',
  reviewType: null,
  orderId: null,
}

const initialState = {
  reviewFormData: initialReviewFormData,
}

interface ReviewStore {
  reviewFormData: ReviewFormData;
  setReviewFormData: (data: ReviewFormData) => void;
  reset: () => void;
}

export const usePersistReviewStore = create(
  persist<ReviewStore>(
    (set) => ({
      reviewFormData: initialReviewFormData,
      setReviewFormData: (reviewFormData) => set({ reviewFormData }),
      reset: () => {
        set(initialState);
      }
    }),
    {
      name: 'review',
    }
  )
);