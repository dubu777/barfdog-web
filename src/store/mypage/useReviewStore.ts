import { create } from "zustand";
import { CreateReviewDetail } from "@/types";
import { persist } from "zustand/middleware";

interface ReviewState {
	createReview: CreateReviewDetail | null;
	setCreateReview: (review: CreateReviewDetail | null) => void;
}

export const useReviewStore = create(
	persist<ReviewState>(
		(set) => ({
			createReview: null,
			setCreateReview: (review) => set({ createReview: review }),
		}),
		{
			name: 'review',
		}
	)
);