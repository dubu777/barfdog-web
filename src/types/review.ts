import { REVIEW_STATUS, REVIEW_TYPE } from "@/constants";
import {ImageFile, Page} from "@/types";

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
  ReviewItemType,
  ReviewStatus,
  ReviewDetailItem,
  ReviewDetailImage,
  ReviewFormData,
  UpdateReviewDetail,
  CreateReviewDetail,
  SurveyKey,
  SurveyValue,
  SurveyQuestionType,
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

interface BestReviewDetail {
  reviewDto: ReviewListItem;
  reviewImageDtoList: ImageFile[];
}

interface ReviewList {
  reviewList: BestReviewDetail[];
  page: Page;
}

interface WrittenReviewItem extends BaseReviewItem {
  title: string;
  reviewType: ReviewItemType;
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
  reviewType: ReviewItemType;
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
  reviewType: ReviewItemType;
}

interface ReviewDetailImage extends ImageFile {
  id: number;
}

interface ReviewDetail {
  reviewDto: ReviewDetailItem;
  reviewImageDtoList: ReviewDetailImage[];
}

interface ReviewFormData {
  id?: number;
  title: string;
  reviewType: ReviewItemType | null;

  name?: string;
  thumbnailUrl?: string;
  writtenDate?: string;
  star?: number;
  titleByAdmin?: null | string;
  contents?: string;

  orderId: number | null;
  targetId?: number;
  imageUrl?: string;
  orderedDate?: string;
}

interface UpdateReviewDetail {
  contents: string;
  star: number;
  addImageIdList?: number[];
  deleteImageIdList?: number[];
}

interface CreateReviewDetail extends UpdateReviewDetail{
  id: number;
  orderId: number | null;
  targetId?: number;
  reviewType: ReviewItemType | null;
  reviewImageIdList: number[];
}

type ReviewItemType = keyof typeof REVIEW_TYPE;
type ReviewStatus = keyof typeof REVIEW_STATUS;


type SurveyKey = "preference" | "freshness" | "deliveryStatus";
type SurveyValue = "dislike" | "normal" | "like" | null;

interface SurveyQuestionType {
  key: SurveyKey;
  label: string;
}
