import axiosInstance from "@/api/axiosInstance";
import {
  CreateReview,
  ReviewDetail,
  ReviewListType,
  UpdateReview,
} from "@/types/mypage/review";
import { AxiosInstance } from "axios";

const getMypageReviewList = async ({
  type,
  pageParam = 0,
  instance = axiosInstance
}: { type: ReviewListType; pageParam: number; instance?: AxiosInstance; }) => {
  const isWriteable = type === 'writeable';

  const { data } = await instance.get(`/api/reviews${isWriteable ? '/writeable' : ''}`, {
    params: { page: pageParam, size: 20 }
  });

  const key = isWriteable ? 'queryWriteableReviewsDtoList' : 'queryReviewsDtoList';
  const reviewList = data?._embedded?.[key] ?? [];
  const page = data?.page || { number: 0, totalPages: 1 };

  return {
    reviewList,
    page
  }
};

const getReviewDetail = async (reviewId: number, instance: AxiosInstance = axiosInstance): Promise<ReviewDetail> => {
  const { data } = await instance.get(`/api/reviews/${reviewId}`);
  return {
    reviewInfo: data.reviewDto,
    reviewImageList: data.reviewImageDtoList.map(image => ({
      fileId: image.id,
      fileName: image.filename,
      folder: 'review',
      fileStatus: null,
      displayImageUrl: { url: image.url },
    }))
  };
}

const getReviewDetailImages = async (reviewId: number) => {
  const { data } = await axiosInstance.get(`/api/reviews/${reviewId}/images`);
  return data._embedded.queryReviewImagesDtoList || [];
}

const updateReview = async (reviewId: number, body: UpdateReview) => {
  const { data } = await axiosInstance.put(`/api/reviews/${reviewId}`, body);
  return {
    ...data,
    reviewId,
  };
}

const createReview = async (body: CreateReview) => {
  const { data } = await axiosInstance.post(`/api/reviews`, body);
  return {
    ...data,
    reviewId: body.id,
  };
}

export {
  getMypageReviewList,
  getReviewDetail,
  getReviewDetailImages,
  updateReview,
  createReview,
};