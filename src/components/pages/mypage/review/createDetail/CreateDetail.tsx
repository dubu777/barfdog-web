'use client';
import * as styles from "@/components/pages/mypage/review/updateDetail/UpdateDetail.css";
import ReviewForm from "@/components/pages/mypage/review/reviewForm/ReviewForm";
import { usePersistReviewStore } from "@/store/usePersistReviewStore";
import { useCreateReviewDetail } from "@/api/review/mutations/useCreateReviewDetail";
import { CreateReviewDetail, UpdateReviewDetail } from "@/types";
import { useToastStore } from "@/store/useToastStore";

const CreateDetail = () => {
  const { reviewFormData } = usePersistReviewStore();
  const { mutate } = useCreateReviewDetail();
  const { addToast } = useToastStore();

  const handleSubmit = (body: CreateReviewDetail | UpdateReviewDetail) => {
    mutate(
      { body: body as CreateReviewDetail }, {
      onSuccess: () => {
        addToast('리뷰 작성이 완료되었습니다!', 'success')
      },
      onError: () => {
        addToast('리뷰 등록이 실패했습니다.', 'error')
      }
    })
  }

  return (
    <section className={styles.reviewDetailContainer}>
      <ReviewForm
        type='create'
        reviewDetail={reviewFormData}
        handleSubmitForm={handleSubmit}
      />
    </section>
  );
};

export default CreateDetail;