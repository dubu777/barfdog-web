'use client';
import { useRouter } from "next/navigation";
import ReviewForm from "@/components/pages/mypage/review/reviewForm/ReviewForm";
import { useToastStore } from "@/store/useToastStore";
import { useReviewStore } from "@/store/mypage/useReviewStore";
import { FileChangeInfo, ReviewFormValues } from "@/types";
import { useCreateReview } from "@/api/mypage/review/mutations/useCreateReview";

export default function CreateReview() {
  const router = useRouter();
  const { addToast } = useToastStore();

  const { createReview } = useReviewStore();
  const { mutate } = useCreateReview();

  const handleSubmit = (data: ReviewFormValues, fileChangeInfo: FileChangeInfo) => {
    if (!createReview) return;

    const body = {
      ...data,
      reviewImageIdList: fileChangeInfo.addFileIdList,
      orderId: createReview.orderId,
      targetId: createReview.targetId,
      reviewType: createReview.reviewType,
    }
    mutate(
      { body }, {
      onSuccess: (data) => {
        console.log('data', data)
        // 상세 적용 필요
        // router.push(`/mypage/review/${data.reviewId}?reviewType=${createReview.reviewType}&status=REQUEST?source=create`);
        router.push(`/mypage/review?type=written`);
        addToast('리뷰가 등록되었습니다');
      },
      onError: (error) => {
        console.log('error', error)
        addToast('리뷰 등록이 실패했습니다.', 'above-button');
      }
    })
  }

  if (!createReview) {
    return null;
  }
  return (
    <div>
      <ReviewForm
        type="create"
        defaultReviewDetail={{
          title: createReview.title,
          imageUrl: createReview.imageUrl,
        }}
        reviewFormValues={{
          id: createReview.id,
          contents: '',
          star: 5,
          targetId: createReview.targetId,
          orderId: createReview.orderId,
          reviewType: createReview.reviewType,
        }}
        reviewImageList={[]}
        onSubmit={handleSubmit}
      />
    </div>
  );
};