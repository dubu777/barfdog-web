'use client';
import { reviewDetailContainer } from "@/components/pages/mypage/review/reviewDetail/ReviewDetail.css";
import { usePersistReviewStore } from "@/store/usePersistReviewStore";
import { useCreateReviewDetail } from "@/api/review/mutations/useCreateReviewDetail";
import { CreateReviewDetail, UpdateReviewDetail } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import ReviewForm from "@/components/pages/mypage/review/reviewForm/ReviewForm";

const CreateDetail = () => {
  const { reviewFormData } = usePersistReviewStore();
  const { mutate } = useCreateReviewDetail();
  const { addToast } = useToastStore();
  const { pushWithQuery } = useDynamicQueryPush();

  const handleSubmit = (body: CreateReviewDetail | UpdateReviewDetail) => {
    mutate(
      { body: body as CreateReviewDetail }, {
      onSuccess: () => {
        pushWithQuery(`/mypage/review`, { tab: 'written', page: 1 });
        addToast('리뷰 작성이 완료되었습니다!', 'above-button');
      },
      onError: (err) => {
        console.log('err', err)
        addToast('리뷰 등록이 실패했습니다.', 'above-button');
      }
    })
  }

  return (
    <section className={reviewDetailContainer}>
      <ReviewForm
        type='create'
        reviewDetail={reviewFormData}
        handleSubmitForm={handleSubmit}
      />
    </section>
  );
};

export default CreateDetail;