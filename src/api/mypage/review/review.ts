import axiosInstance from "@/api/axiosInstance";
import { REVIEW_LIST_KEY } from "@/constants";
import { ApiResponse } from "@/types";
import {
  CreateReview,
  ReviewItemType,
  MyPageReviewList,
  ReviewListType,
  UpdateReview,
} from "@/types/mypage/review";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";
import { AxiosInstance } from "axios";

const getMypageReviewList = async ({
  type,
  pageParam = 0,
  instance = axiosInstance
}: { type: ReviewListType; pageParam: number; instance?: AxiosInstance; }) => {
  const isWritable = type === 'writable';

  const { data }: { data: ApiResponse<MyPageReviewList> } = await instance.get(`/api/v2/user/reviews${isWritable ? '/writable' : ''}`, {
    params: { page: pageParam, size: 20 }
  });
	
	const errorMessage = isWritable
		? "작성 가능한 리뷰 목록 조회에 실패했습니다."
		: "리뷰 목록 조회에 실패했습니다.";

  const responseData = validateApiResponse(data, errorMessage);

  return {
    reviewList: responseData[REVIEW_LIST_KEY[type]] ?? [],
    page: responseData.pagination,
  };
};

const getReviewDetail = async ({
  reviewId, 
  reviewType,
  instance = axiosInstance,
}: { 
  reviewId: number;
  reviewType: ReviewItemType;
  instance?: AxiosInstance;
}) => {
  const { data } = await instance.get(`/api/v2/user/reviews/${reviewId}?reviewType=${reviewType}`);
  return validateApiResponse(data, '리뷰 상세 조회에 실패했습니다.');
}

const updateReview = async (reviewId: number, body: UpdateReview) => {
  const { data } = await axiosInstance.put(`/api/v2/user/reviews/${reviewId}`, body);
  const responseData = validateApiResponse(data, '리뷰 수정에 실패했습니다.');
  return {
    responseData,
    reviewId,
  };
}

const createReview = async (body: CreateReview) => {
  const { data } = await axiosInstance.post(`/api/v2/user/reviews`, body);
  return validateApiResponse(data, '리뷰 등록에 실패했습니다.');
}

export {
  getMypageReviewList,
  getReviewDetail,
  updateReview,
  createReview,
};