import axiosInstance from "@/api/axiosInstance";
import { ApiResponse } from "@/types";
import { ReviewList, ReviewImageList, BestReviewList, BestReviewItem } from "@/types/review";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";
import { AxiosInstance } from "axios";

const getBestReviewList = async (instance: AxiosInstance = axiosInstance): Promise<BestReviewItem[]> => {
  const { data }: { data: ApiResponse<BestReviewList> } = await instance.get(`/api/v2/public/reviews/best`);
  const responseData = validateApiResponse(data, "베스트 리뷰 목록 조회에 실패했습니다.");
  return responseData.bestReviewList;
}

const getReviewImageList = async (reviewId: number): Promise<ReviewImageList> => {
  const { data }: { data: ApiResponse<ReviewImageList> } = await axiosInstance.get(`/api/v2/public/reviews/${reviewId}/images`);
  return validateApiResponse(data, "상품 리뷰 이미지 목록 조회에 실패했습니다.");
}

const getReviewList = async ({
  itemId,
  page,
  size = 5,
  instance = axiosInstance,
}: {
  page: number;
  itemId?: number;
  size?: number;
  instance?: AxiosInstance;
}): Promise<ReviewList> => {
  const params = itemId ? { itemId, page, size } : { page, size };

  const { data }: { data: ApiResponse<ReviewList> } = await instance.get(`/api/v2/public/reviews`, {
    params: {
      ...params,
    },
  });
  return validateApiResponse(data, "리뷰 목록 조회에 실패했습니다.");
}

export {
  getBestReviewList,
  getReviewImageList,
  getReviewList,
};