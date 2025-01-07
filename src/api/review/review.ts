import axiosInstance from "@/api/axiosInstance";
import {
  BestReviewDetail, CreateReviewDetail,
  ReviewDetail,
  ReviewList,
  UpdateReviewDetail,
  WritableReviewList,
  WrittenReviewList
} from "@/types/review";

export {
  getBestReviewList,
  getReviewList,
  getBestReviewDetail,
  getWritableReviewList,
  getWrittenReviewList,
  getReviewDetail,
  updateReviewDetail,
  createReviewDetail,
  deleteReview,
};

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

const getBestReviewDetail = async (reviewId: number): Promise<BestReviewDetail> => {
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

const getReviewDetail = async (reviewId: number): Promise<ReviewDetail> => {
  const { data } = await axiosInstance.get(`/api/reviews/${reviewId}`);
  return data;
}

const updateReviewDetail = async (reviewId: number, body: UpdateReviewDetail) => {
  const { data } = await axiosInstance.put(`/api/reviews/${reviewId}`, body);
  return data;
}

const createReviewDetail = async (body: CreateReviewDetail) => {
  const { data } = await axiosInstance.post(`/api/reviews`, body);
  return data;
}

const deleteReview = async (reviewId: number) => {
  const { data } = await axiosInstance.delete(`/api/reviews/${reviewId}`);
  return data;
}