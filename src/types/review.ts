import { reviewStatus, reviewType } from "@/constants";
import { Page } from "@/types";

export type {
  BestReviewItem,
  ReviewList,
  ReviewDetail,
  ReviewItem,
  ReviewImage,
  WrittenReviewItem,
  WrittenReviewList,
  WritableReviewItem,
  WritableReviewList,
  ReviewType,
  ReviewStatus,
};

interface BaseReviewItem {
  id: number;
  thumbnailUrl?: string;
  star: number;
  titleByAdmin: null | string;
  contents: string;
  username?: string;
}

interface BestReviewItem extends BaseReviewItem {
  imageUrl: string;
  leakedOrder: number;
  orderType: string;
}

interface ReviewItem extends BaseReviewItem{
  username: string;
  writtenDate: string;
  orderType?: string;
}

interface ReviewImage {
  filename: string;
  url: string;
}

interface ReviewDetail {
  reviewDto: ReviewItem;
  reviewImageDtoList: ReviewImage[];
}

interface ReviewList {
  reviewList: ReviewDetail[];
  page: Page;
}

interface WrittenReviewItem extends BaseReviewItem {
  title: string;
  reviewType: ReviewType;
  createdDate: string;
  imageUrl: string;
  imageCount: number;
  status: ReviewStatus;
  returnReason: string;
}

interface WrittenReviewList {
  writtenReviewList: WrittenReviewItem[];
  page: Page;
}

interface WritableReviewItem {
  id: number;
  targetId: number;
  reviewType: ReviewType;
  imageUrl: string;
  title: string;
  orderedDate: string;
}

interface WritableReviewList {
  writableReviewList: WritableReviewItem[];
  page: Page;
}

type ReviewType = keyof typeof reviewType;
type ReviewStatus = keyof typeof reviewStatus;