import axiosInstance from "@/api/axiosInstance";
import {
  BestReviewDetail, CreateReviewDetail,
  ReviewDetail, ReviewImage,
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
  getReviewDetailImages,
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

const getWritableReviewList = async ({
  pageParam = 0,
  size = 5,
}: { pageParam: number; size: number }): Promise<WritableReviewList> => {
  const { data } = await axiosInstance.get(`/api/reviews/writeable`, {
    params: { page: pageParam, size }
  });
  const writableReviewList = data?._embedded?.queryWriteableReviewsDtoList || [];
  const page = data?.page || { number: 0, totalPages: 1 };

  return {
    writableReviewList,
    page
  }
};

const getWrittenReviewList = async ({
  pageParam = 0,
  size = 5,
}: { pageParam: number; size: number }): Promise<WrittenReviewList> => {
  const { data } = await axiosInstance.get(`/api/reviews`, {
    params: { page: pageParam, size }
  });
  const writtenReviewList = data?._embedded?.queryReviewsDtoList || [];
  const page = data?.page || { number: 0, totalPages: 1 };

  return {
    writtenReviewList,
    page
  }
};

const getReviewDetail = async (reviewId: number): Promise<ReviewDetail> => {
  const { data } = await axiosInstance.get(`/api/reviews/${reviewId}`);
  return data;
}

const getReviewDetailImages = async (reviewId: number): Promise<ReviewImage[]> => {
  const { data } = await axiosInstance.get(`/api/reviews/${reviewId}/images`);
  return data._embedded.queryReviewImagesDtoList || [];
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