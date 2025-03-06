import { REVIEW_STATUS, REVIEW_TYPE } from "@/constants";
import { Page } from "@/types";

export type {
  BaseReviewItem,
  BestReviewItem,
  BestReviewDetail,
  ReviewList,
  ReviewDetail,
  ReviewListItem,
  ReviewImage,
  WrittenReviewItem,
  WrittenReviewList,
  WritableReviewItem,
  WritableReviewList,
  ReviewType,
  ReviewStatus,
  ReviewDetailItem,
  ReviewDetailImage,
  ReviewFormData,
  UpdateReviewDetail,
  CreateReviewDetail,
};

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

interface ReviewImage {
  filename: string;
  url: string;
}

interface BestReviewDetail {
  reviewDto: ReviewListItem;
  reviewImageDtoList: ReviewImage[];
}

interface ReviewList {
  reviewList: BestReviewDetail[];
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
  orderPaymentPrice?: number;
  orderId?: number;
  merchantUid?: string;
}

interface WritableReviewList {
  writableReviewList: WritableReviewItem[];
  page: Page;
}

interface ReviewDetailItem extends BaseReviewItem{
  title: string;
  writtenDate: string;
  name?: string;
  reviewType?: ReviewType;
}

interface ReviewDetailImage extends ReviewImage {
  id: number;
}

interface ReviewDetail {
  reviewDto: ReviewDetailItem;
  reviewImageDtoList: ReviewDetailImage[];
}

interface ReviewFormData {
  id: number;
  title: string;
  reviewType: ReviewType | null;

  name?: string;
  thumbnailUrl?: string;
  writtenDate?: string;
  star?: number;
  titleByAdmin?: null | string;
  contents?: string;

  targetId?: number;
  imageUrl?: string;
  orderedDate?: string;
}

interface UpdateReviewDetail {
  orderId: number;
  contents: string;
  star: number;
  addImageIdList?: number[];
  deleteImageIdList?: number[];
}

interface CreateReviewDetail extends UpdateReviewDetail{
  id: number;
  targetId: number;
  reviewType: ReviewType | null;
  reviewImageIdList: number[];
}

type ReviewType = keyof typeof REVIEW_TYPE;
type ReviewStatus = keyof typeof REVIEW_STATUS;