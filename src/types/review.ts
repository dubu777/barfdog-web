import { Page } from "@/types";

export type {
  BestReviewItem,
  ReviewList,
  ReviewDetail,
  ReviewItem,
  ReviewImage,
};

interface BestReviewItem {
  id: number;
  imageUrl: string;
  leakedOrder: number;
  titleByAdmin : null | string,
  contents: string;
  username: string;
  orderType: string;
}

interface ReviewItem {
  id: number;
  thumbnailUrl: string;
  star: number;
  titleByAdmin: null | string,
  contents: string;
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