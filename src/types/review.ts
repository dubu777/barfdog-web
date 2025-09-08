import { Page } from "./common";

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
  url: string;
  filename: string;
}

interface ReviewList {
  reviewList: BestReviewDetail[];
  page: Page;
}

export type {
  BaseReviewItem,
  BestReviewItem,
  ReviewListItem,
  BestReviewDetail,
  ReviewImage,
  ReviewList,
};
