'use client';
import { reviewDetailContainer } from "@/components/pages/mypage/review/reviewDetail/ReviewDetail.css";
import { usePersistReviewStore } from "@/store/usePersistReviewStore";
import { useCreateReviewDetail } from "@/api/review/mutations/useCreateReviewDetail";
import { CreateReviewDetail, UpdateReviewDetail } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import ReviewForm from "@/components/pages/mypage/review/reviewForm/ReviewForm";
import * as styles from "@/components/pages/mypage/review/reviewForm/ReviewForm.css";
import InfoBox from "@/components/common/infoBox/InfoBox";
import Text from "@/components/common/text/Text";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import useModal from "@/hooks/useModal";
import InfoText from "@/components/common/typography/infoText/InfoText";

const CreateDetail = () => {
  const { reviewFormData } = usePersistReviewStore();
  const { mutate } = useCreateReviewDetail();
  const { addToast } = useToastStore();
  const { pushWithQuery } = useDynamicQueryPush();
  const { onToggle, onClose, isOpen } = useModal();

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

  const createReviewNotice = [
    '작성하신 후기는 바프독 이용자에게 공개됩니다.',
    '일반 구매 후기 작성은 구매확정 후 30일까지 가능하며, 최대 1000원의 적립금이 영업일 기준 2일 전후로 지급됩니다.(텍스트 500원, 사진 500원)',
    '정기 구독 구매 후기 작성은 구매 확정후 회차 당 30일까지 가능하며,  리뷰 회차 당 최대 1000원의 적립금이 영업일 기준 2일 전후로 지급됩니다.(텍스트 500원, 사진 500원)',
    '승인되지 않은 기준 미충족 후기에 대한 수정은 180일 이내만 가능합니다.',
    '아래에 해당할 경우 적립금 지급이 보류되거나, 검수를 통해 작성 리뷰가 비노출 처리됩니다.',
  ]
  const createReviewSubNotice = [
    '바프독 서비스와 관련성 없는 사진을 업로드 한 경우',
    '바프독 서비스와 관련성 없는 내용의 후기',
    '기호 및 문자의 단순 나열이 반복된 내용의 후기',
    '개인정보 및 광고, 비속어가 포함된 내용의 후기',
    '타인의 사진을 도용하여 업로드 한 경우',
  ]

  return (
    <section className={reviewDetailContainer}>
      <div className={styles.reviewNotice}>
        <InfoBox onClick={onToggle} text='리뷰 작성시 유의사항' />
      </div>
      <ReviewForm
        type='create'
        reviewDetail={reviewFormData}
        handleSubmitForm={handleSubmit}
      />
      <BottomSheet isOpen={isOpen} onClose={onClose} title="작성시 유의사항">
        <div className={styles.bottomSheetBox}>
          <Text type='label4' block className={styles.bottomSheetSubTitle}>유의사항</Text>
          <div className={styles.bottomSheetInfoDetail}>
            {createReviewNotice.map(notice => (
              <InfoText key={notice} text={notice} />
            ))}
            <div className={styles.bottomSheetSubDetail}>
              {createReviewSubNotice.map(subNotice => (
                <InfoText key={subNotice} text={subNotice} />
              ))}
            </div>
          </div>
        </div>
        <ButtonDocked
          type='full-button'
          primaryButtonLabel='확인'
          onPrimaryClick={onClose}
          position='sticky'
        />
      </BottomSheet>
    </section>
  );
};

export default CreateDetail;