import axiosInstance from "@/api/axiosInstance";
import { ApiResponse } from "@/types";
import { ReviewList, BestReviewDetail, ReviewImageList, StoreItemDetailReviewList } from "@/types/review";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";
import { AxiosInstance } from "axios";

const getReviewList = async (page = 0, instance: AxiosInstance = axiosInstance): Promise<ReviewList> => {
  const { data } = await instance.get(`/api/reviews/community?page=${page}&size=20`);
  return {
    page: data.page,
    reviewList: data?._embedded?.queryCommunityReviewsDtoList || [],
  };
};

const getBestReviewList = async (instance: AxiosInstance = axiosInstance) => {
  const { data } = await instance.get(`/api/reviews/best`);
  return data._embedded.queryBestReviewsDtoList || [];
}

const getBestReviewDetail = async (reviewId: number): Promise<BestReviewDetail> => {
  const { data } = await axiosInstance.get(`/api/reviews/${reviewId}/community`);
  return data;
}

const getReviewImageList = async (reviewId: number): Promise<ReviewImageList> => {
  const { data }: { data: ApiResponse<ReviewImageList> } = await axiosInstance.get(`/api/v2/public/reviews/${reviewId}/images`);
  return validateApiResponse(data, "상품 리뷰 이미지 목록 조회에 실패했습니다.");
}

const getStoreItemReviewList = async ({
  itemId,
  page,
  size = 5,
  instance = axiosInstance,
}: {
  itemId: number;
  page: number;
  size?: number;
  instance?: AxiosInstance;
}): Promise<StoreItemDetailReviewList> => {
  const { data }: { data: ApiResponse<StoreItemDetailReviewList> } = await instance.get(`/api/v2/public/reviews`, {
    params: {
      itemId,
      page,
      size,
    },
  });
  return validateApiResponse(data, "상품 리뷰 목록 조회에 실패했습니다.");
}


export {
  getReviewList,
  getBestReviewList,
  getBestReviewDetail,
  getReviewImageList,
  getStoreItemReviewList,
};