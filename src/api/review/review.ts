import axiosInstance from "@/api/axiosInstance";
import { BestReviewDetail, ReviewList } from "@/types";
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

export {
  getReviewList,
  getBestReviewList,
  getBestReviewDetail,
};