import { REVIEW_STATUS, REVIEW_TYPE } from "@/constants";
import { UploadedFile } from "@/types";

type ReviewListType = 'written' | 'writeable';

type ReviewItemType = keyof typeof REVIEW_TYPE;

type ReviewStatus = keyof typeof REVIEW_STATUS;

interface BaseReviewItem {
  id: number;
  thumbnailUrl?: string;
  star: number;
  titleByAdmin?: null | string;
  contents: string;
  username?: string;
}

interface ReviewDetailItem extends BaseReviewItem {
  title: string;
  writtenDate: string;
  name?: string;
  reviewType: ReviewItemType;
}

interface ReviewDetail {
  reviewInfo: ReviewDetailItem;
  reviewImageList: UploadedFile[];
}

interface CreateReviewDetail {
  id: number;
  targetId: number;
  reviewType: ReviewItemType;
  imageUrl: string;
  title: string;
  orderedDate: string;
  orderId: number;
  merchantUid: string;
  orderPaymentPrice: number;
  subscribeCount: number;
}

interface DefaultReviewDetail {
  title: string;
  thumbnailUrl?: string;
  imageUrl?: string;
}

interface BaseReviewFormValues {
  id: number;
  contents: string;
  star: number;
}

interface CreateReview extends BaseReviewFormValues {
  orderId?: number | null;
  targetId?: number;
  reviewType?: ReviewItemType | null;
  reviewImageIdList?: number[];
}

interface UpdateReview extends BaseReviewFormValues {
  addImageIdList?: number[];
  deleteImageIdList?: number[];
}

interface ReviewFormValues extends CreateReview, UpdateReview {}

export type {
  ReviewDetail,
  ReviewListType,
  ReviewItemType,
  ReviewStatus,
  ReviewDetailItem,
  ReviewFormValues,
  CreateReview,
  UpdateReview,
  DefaultReviewDetail,
  CreateReviewDetail,
};
