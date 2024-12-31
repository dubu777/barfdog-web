import axiosInstance from "@/api/axiosInstance";
import { ReviewDetail, ReviewList, WritableReviewList, WrittenReviewList } from "@/types/review";

export { getBestReviewList, getReviewList, getReviewDetail, getWritableReviewList, getWrittenReviewList };

const getBestReviewList = async () => {
  const { data } = await axiosInstance.get(`/api/reviews/best`);
  return data._embedded.queryBestReviewsDtoList || [];
}

const getReviewList = async (page = 0, size = 10): Promise<ReviewList> => {
  const { data } = await axiosInstance.get(`/api/reviews/community?page=${page}&size=${size}`);
  return {
    page: data.page,
    reviewList: data?._embedded?.queryCommunityReviewsDtoList || [],
  };
};

const getReviewDetail = async (reviewId: number): Promise<ReviewDetail> => {
  const { data } = await axiosInstance.get(`/api/reviews/${reviewId}/community`);
  return data;
}

const getWritableReviewList = async (page = 0, size = 10): Promise<WritableReviewList> => {
  const { data } = await axiosInstance.get(`/api/reviews/writeable?page=${page}&size=${size}`);
  return {
    page: data.page,
    writableReviewList: data?._embedded?.queryWriteableReviewsDtoList || [],
  };
};

const getWrittenReviewList = async (page = 0, size = 10): Promise<WrittenReviewList> => {
  const { data } = await axiosInstance.get(`/api/reviews?page=${page}&size=${size}`);
  return {
    page: data.page,
    writtenReviewList: data?._embedded?.queryReviewsDtoList || [],
  };
};
