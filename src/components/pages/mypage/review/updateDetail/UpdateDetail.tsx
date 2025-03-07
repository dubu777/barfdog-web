'use client';
import { reviewDetailContainer } from "@/components/pages/mypage/review/reviewDetail/ReviewDetail.css";
import { useBackNavigation } from "@/utils";
import { useGetReviewDetail } from "@/api/review/queries/useGetReviewDetail";
import { useUpdateReviewDetail } from "@/api/review/mutations/useUpdateReviewDetail";
import { ReviewDetailItem, ReviewType, UpdateReviewDetail } from "@/types";
import { useToastStore } from '@/store/useToastStore';
import ReviewForm from "@/components/pages/mypage/review/reviewForm/ReviewForm";

interface ReviewDetailProps {
  reviewId: number;
  reviewType: ReviewType;
}

const UpdateDetail = ({ reviewId, reviewType }: ReviewDetailProps) => {
  const { data } = useGetReviewDetail(reviewId);
  const { mutate } = useUpdateReviewDetail(reviewId);
  const { addToast } = useToastStore();
  const goBack = useBackNavigation();

  const reviewDetail: ReviewDetailItem = {
    ...data.reviewDto,
    reviewType
  }

  const handleSubmit = (body: UpdateReviewDetail) => {
    mutate(body, {
      onSuccess: () => {
        addToast('리뷰 수정이 완료되었습니다!', 'success');
        goBack();
      },
      onError: () => {
        addToast('리뷰 수정이 실패했습니다.', 'error')
      }
    })
  }
  return (
    <section className={reviewDetailContainer}>
      <ReviewForm
        type='update'
        reviewDetail={reviewDetail}
        reviewImageDtoList={data.reviewImageDtoList}
        handleSubmitForm={handleSubmit}
      />
    </section>
  );
};

export default UpdateDetail;