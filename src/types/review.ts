import { Page, Pagination } from "./common";

interface BaseReviewItem {
  id: number;
  thumbnailUrl?: string;
  star: number;
  titleByAdmin?: null | string;
  contents: string;
  username?: string;
}

interface BestReviewItem extends BaseReviewItem {
  imageUrl: string;
  leakedOrder: number;
  orderType: string;
}

interface ReviewListItem extends BaseReviewItem{
  username: string;
  writtenDate: string;
  orderType?: string;
}

interface BestReviewDetail {
  reviewDto: ReviewListItem;
  reviewImageDtoList: ReviewImage[];
}

interface ReviewImage {
  reviewId: number;
  displayImageUrl: {
    url: string;
  };
}

interface ReviewList {
  reviewList: BestReviewDetail[];
  page: Page;
}

interface ReviewImageList {
  reviewImageList: ReviewImage[];
}

interface StoreItemDetailReview {
  reviewId: number;
  star: number;
  titleByAdmin: null | string;
  reviewer: string;
  contents: string;
  writtenDate: string;
  hasReviewImages: boolean;
}

interface StoreItemDetailReviewList {
  pagination: Pagination;
  itemReviewList: StoreItemDetailReview[];
}

export type {
  BaseReviewItem,
  BestReviewItem,
  ReviewListItem,
  BestReviewDetail,
  ReviewImage,
  ReviewList,
  ReviewImageList,
  StoreItemDetailReviewList,
};
