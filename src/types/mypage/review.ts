import { REVIEW_LIST_KEY, REVIEW_STATUS, REVIEW_TYPE } from "@/constants";
import { Pagination, UploadedFile } from "@/types";

type ReviewListType = keyof typeof REVIEW_LIST_KEY;
type ReviewItemType = keyof typeof REVIEW_TYPE;
type ReviewStatus = keyof typeof REVIEW_STATUS;

interface ReviewListItem {
  // common
  id: number;
  title: string;
  orderId: null | number;
  reviewType: ReviewItemType;

  // written
  star?: number;
  titleByAdmin?: null | string;
  contents?: string;
  memberName?: string;
  status?: ReviewStatus,
  displayItemThumbnailUrl?: {
    url: string;
  };
  returnReason?: null | string;
  writtenDate?: string;
  reviewImageCount?: number;

  // writeable
  targetId?: number;
  displayImageUrl?: null | {
    url: string;
  };
  orderedDate?: string;
  merchantUid?: string;
  orderPaymentPrice?: number;
  subscribeCount?: number;
}

interface MyPageReviewList {
  reviewList: ReviewListItem[];
  reviewableList: ReviewListItem[];
  pagination: Pagination;
}

interface ReviewDetailItem {
  id: number;
  title: string;
  memberName: string;
  reviewType: ReviewItemType;
  star: number;
  titleByAdmin: null | string;
  contents: string;
  displayItemThumbnailUrl: {
    url: string;
  };
  status: ReviewStatus;
  returnReason: null | string;
  writtenDate: string;
  orderId: null | number;
  reviewImageCount: number;
}

interface ReviewDetail {
  reviewInfo: ReviewDetailItem;
  reviewImageList: UploadedFile[];
}

interface CreateReviewDetail {
  id: number;
  targetId: number;
  reviewType: ReviewItemType;
  displayImageUrl?: null | {
    url: string;
  };
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
  orderedDate?: string;
  writtenDate?: string;
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
  MyPageReviewList,
};
