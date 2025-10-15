import { Pagination } from "./common";

// 공통
interface BaseReviewItem {
  reviewId: number;
  titleByAdmin: null | string;
  contents: string;
  reviewer: string;
  writtenDate: string;
}

interface ReviewImage {
  reviewId: number;
  displayImageUrl: {
    url: string;
  };
}

interface ReviewImageList {
  reviewImageList: ReviewImage[];
}

// 베스트 리뷰
interface BestReviewItem extends BaseReviewItem, ReviewImageList {
  leakedOrder: number;
}

interface BestReviewList {
  bestReviewList: BestReviewItem[];
}

// 리뷰 목록
interface ReviewListItem extends BaseReviewItem {
  star: number;
  hasReviewImages: boolean;
}

interface ReviewList {
  pagination: Pagination;
  itemReviewList: ReviewListItem[];
}

export type {
  ReviewImage,
  ReviewImageList,
  BestReviewItem,
  BestReviewList,
  ReviewListItem,
  ReviewList,
};
