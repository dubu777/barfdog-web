import { useQueryClient } from "@tanstack/react-query";
import ReviewForm from "../reviewForm/ReviewForm";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import {
  FileChangeInfo,
  ReviewDetail,
  ReviewFormValues,
  ReviewItemType,
} from "@/types";
import { useToastStore } from '@/store/useToastStore';
import { queryKeys } from "@/constants";
import { useUpdateReview } from "@/api/mypage/review/mutations/useUpdateReview";
import { useRouter } from "next/navigation";

interface ReviewDetailProps {
  data: ReviewDetail;
  reviewType: ReviewItemType;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateReviewModal({
  data,
  reviewType,
  isOpen,
  onClose,
}: ReviewDetailProps) {
  const { mutate } = useUpdateReview();
  const { addToast } = useToastStore();

  const queryClient = useQueryClient();
  const router = useRouter();

  const reviewInfo = data?.reviewInfo;
  const reviewImageList = data?.reviewImageList;
  const reviewId = reviewInfo?.id;

  const onSubmit = (data: ReviewFormValues, fileChangeInfo: FileChangeInfo) => {
    const deleteIds = fileChangeInfo.deleteFileIdList;
    const deleteImageIdList = reviewImageList
      .map(file => file.fileId)
      .filter(fileId => deleteIds.includes(fileId));

    const body = {
      ...data,
      addImageIdList: fileChangeInfo.addFileIdList,
      deleteImageIdList: deleteImageIdList,
    }

    mutate({
      reviewId,
      body,
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [
            queryKeys.MYPAGE.BASE,
            queryKeys.MYPAGE.REVIEW.BASE,
            queryKeys.MYPAGE.REVIEW.GET_REVIEW_DETAIL,
            reviewId
          ],
        });
        addToast('리뷰가 수정됐어요');
        onClose();
        router.back();
      },
      onError: (error) => {
        console.log('error', error)
        addToast('리뷰 수정이 실패했습니다.', 'above-button')
      }
    })
  }
  return (
    <FullModalWrapper
      isVisible={isOpen}
      headerTitle='리뷰 수정'
      handleClose={onClose}
    >
      <ReviewForm 
        type="update"
        defaultReviewDetail={{
          title: reviewInfo.title,
          thumbnailUrl: reviewInfo.thumbnailUrl,
          writtenDate: reviewInfo.writtenDate,
        }}
        reviewFormValues={{
          id: reviewId,
          contents: reviewInfo.contents,
          star: reviewInfo.star,
          reviewType: reviewType,
        }}
        reviewImageList={reviewImageList}
        onSubmit={onSubmit}
      />
    </FullModalWrapper>
  );
};