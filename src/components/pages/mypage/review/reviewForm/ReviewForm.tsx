import * as yup from "yup";
import * as styles from './ReviewForm.css';
import { useState } from "react";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Controller } from "react-hook-form";
import {
  CreateReviewDetail,
  ImageFile,
  ReviewDetailImage,
  ReviewDetailItem,
  ReviewFormData, SurveyKey, SurveyValue,
  UpdateReviewDetail
} from "@/types";
import DefaultTextarea from "@/components/common/defaultTextarea/DefaultTextarea";
import MultiFileUpload from "@/components/common/multiFileUpload/MultiFileUpload";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InfoBox from "@/components/common/infoBox/InfoBox";
import ReviewCard from "@/components/pages/mypage/common/cards/section/ReviewCard";
import ReviewSurvey from "@/components/pages/mypage/review/reviewForm/reviewSurvey/ReviewSurvey";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import useModal from "@/hooks/useModal";

const defaultReviewForm = (reviewDetail: ReviewFormData | ReviewDetailItem) => {
  return {
    id: reviewDetail?.id,
    star: reviewDetail?.star || 0,
    contents: reviewDetail?.contents || '',
    reviewType: reviewDetail?.reviewType,
    orderId: 'orderId' in reviewDetail ? reviewDetail.orderId : null,
    targetId: 'targetId' in reviewDetail ? reviewDetail.targetId : null,
  };
};

const reviewFormSchema = yup.object().shape({
  contents: yup
    .string()
    .min(10, '10글자 이상 입력해주세요.')
    .max(1000, '리뷰는 최대 1000자까지 입력 가능합니다.')
    // .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
    .required('리뷰 내용을 작성해주세요.'),
})

interface ReviewFormProps<T extends 'create' | 'update'> {
  type: T;
  reviewDetail: T extends 'create' ? ReviewFormData : ReviewDetailItem;
  reviewImageDtoList?: ReviewDetailImage[];
  handleSubmitForm: (CreateReviewDetail : UpdateReviewDetail) => void;
}

const ReviewForm = <T extends 'create' | 'update'>({
  type,
  reviewDetail,
  reviewImageDtoList,
  handleSubmitForm,
}: ReviewFormProps<T>) => {
  const { control, handleSubmit, errors, setValue, watch } = useFormHandler<
    T extends 'update' ? UpdateReviewDetail : CreateReviewDetail
  >(reviewFormSchema, defaultReviewForm(reviewDetail) as any);

  const [addImageIdList, setAddImageIdList] = useState<number[]>([]);
  const [deleteImageIdList, setDeleteImageIdList] = useState<number[]>([]);
  const [surveyFormData, setSurveyFormData] = useState<Record<SurveyKey, SurveyValue>>({
    preference: null,
    freshness: null,
    deliveryStatus: null,
    petCount: null,
    petLifeInterests: null,
    requiredSurvey: null,
  })
  const formData = watch();
  const temporaryReward = (addImageIdList.length > 0 ? 500 : 0) + (formData.contents.length >= 20 ? 500 : 0);

  const { onToggle, onClose, isOpen } = useModal();

  const handleFileUpload = async (files: ImageFile[]) => {
    const uploadedImageList: number[] = [];
    for (const file of files) {
      const isOriginFile = reviewImageDtoList?.some(image => image.id === file.id);
      if (!isOriginFile) {
        if(file.id) {
          uploadedImageList.push(file.id);
        }
      }
    }
    setAddImageIdList((prev) => Array.from(new Set([...prev, ...uploadedImageList])));
  }

  const handleFileRemove = (id: number) => {
    // 기존 reviewImageDtoList 내 이미지 파일인지 확인
    const isExistingFile = reviewImageDtoList?.some(image => image.id === id);
    if (isExistingFile) {
      // 기존 저장된 이미지라면 deleteImageIdList 추가
      setDeleteImageIdList(prev => [...prev, id]);
    } else {
      // 새로 업로드한 이미지라면 추가된 addImageIdList 에서 제거
      setAddImageIdList(prev => prev.filter(imageId => imageId !== id));
    }
  }

  console.log('reviewDetail', reviewDetail)

  const onSubmit = (data: CreateReviewDetail | UpdateReviewDetail) => {
    if (type === 'update') {
      const body: UpdateReviewDetail = {
        contents: data.contents,
        star: data.star,
        addImageIdList,
        deleteImageIdList,
      };
      handleSubmitForm(body);
    } else {
      const body: CreateReviewDetail = {
        id: reviewDetail.id,
        orderId: "orderId" in reviewDetail ? reviewDetail.orderId : null,
        reviewType: reviewDetail.reviewType,
        contents: data.contents,
        star: data.star,
        reviewImageIdList: addImageIdList,
      };
    if ("targetId" in reviewDetail) {
      body.targetId = reviewDetail.targetId;
    }
      handleSubmitForm(body);
    }
  };


  return (
    <>
    <form className={styles.reviewFormContainer}>
      <div className={styles.reviewNotice}>
        <InfoBox onClick={onToggle} text='리뷰 작성시 유의사항' />
      </div>
      {type === 'create' &&
        <DefaultText type='title4' className={styles.reviewFormTitle}>이 상품 어떠셨나요?</DefaultText>
      }
      <ReviewCard
        reviewDetail={reviewDetail}
        formData={formData}
        setValue={setValue}
        isEditable
        isReviewDetail
      />
      <div className={styles.reviewContentsBox}>
        <div className={styles.reviewContents}>
          <DefaultText type='title4'>어떤 점이 좋았나요?</DefaultText>
          <div className={styles.reviewContentsTitle}>
            <DefaultText type='label4'>상세 후기</DefaultText>
            <DefaultText type='caption' color={formData?.contents?.length > 0 ? 'pastelRed' : 'gray500'}>20자 이상 작성시 500원 추가 적립!</DefaultText>
          </div>
          <Controller
            name='contents'
            control={control}
            render={({ field }) => (
              <DefaultTextarea
                {...field}
                id='contents'
                value={formData?.contents}
                placeholder='정기구독 상품을 통해 느낀 만족도에 대한 상세후기를 남겨주세요. (최소 10자 이상)'
                minLength={10}
                maxLength={1000}
                error={errors.contents?.message || ''}
              />
            )}
          />
        </div>
        <MultiFileUpload
          uploadApiUrl='/api/reviews/upload'
          onFilesChange={(files) => handleFileUpload(files as ImageFile[])}
          maxFiles={10}
          imageWidth={100}
          imageHeight={100}
          initialImages={reviewImageDtoList}
          handleRemove={(id) => handleFileRemove(id)}
        />
      </div>
      <ReviewSurvey surveyFormData={surveyFormData} setSurveyFormData={setSurveyFormData} />
      <ButtonDocked
        type='text-button'
        text={(
          <div>
            <DefaultText type='caption'>예상 적립금</DefaultText>
            <div className={styles.reviewTemporaryReward}>
              <DefaultText type='headline1' color='red' inlineBlock>
                {temporaryReward}
              </DefaultText>/
              <DefaultText type='headline1' inlineBlock>
                최대 1000P
              </DefaultText>
            </div>
          </div>
        )}
        primaryButtonSize='md'
        primaryButtonLabel='등록하기'
        onPrimaryClick={handleSubmit(onSubmit)}
      />
    </form>
    <BottomSheet isOpen={isOpen} onClose={onClose} closeButton className={styles.reviewNoticeBottomSheet}>
      <div className={styles.bottomSheetBox}>
        <DefaultText type='headline2' className={styles.bottomSheetTitle}>작성시 유의사항</DefaultText>
        <DefaultText type='label4' className={styles.bottomSheetSubTitle}>유의사항</DefaultText>
        <div className={styles.bottomSheetInfoDetail}>
          <DefaultText type='caption'>• 작성하신 후기는 바프독 이용자에게 공개됩니다.</DefaultText>
          <DefaultText type='caption'>• 일반 구매 후기 작성은 구매확정 후 30일까지 가능하며, 최대 1000원의 적립금이 영업일 기준 2일 전후로 지급됩니다.(텍스트 500원, 사진 500원)</DefaultText>
          <DefaultText type='caption'>• 정기 구독 구매 후기 작성은 구매 확정후 회차 당 30일까지 가능하며,  리뷰 회차 당 최대 1000원의 적립금이 영업일 기준 2일 전후로 지급됩니다.(텍스트 500원, 사진 500원)</DefaultText>
          <DefaultText type='caption'>• 승인되지 않은 기준 미충족 후기에 대한 수정은 180일 이내만 가능합니다.</DefaultText>
          <DefaultText type='caption'>• 아래에 해당할 경우 적립금 지급이 보류되거나, 검수를 통해 작성 리뷰가 비노출 처리됩니다.</DefaultText>
          <div className={styles.bottomSheetSubDetail}>
            <DefaultText type='caption'>
              • 바프독 서비스와 관련성 없는 사진을 업로드 한 경우<br/>
              • 바프독 서비스와 관련성 없는 내용의 후기<br/>
              • 기호 및 문자의 단순 나열이 반복된 내용의 후기<br/>
              • 개인정보 및 광고, 비속어가 포함된 내용의 후기<br/>
              • 타인의 사진을 도용하여 업로드 한 경우
            </DefaultText>
          </div>
        </div>
      </div>
      <ButtonDocked
        type='full-button'
        primaryButtonLabel='확인'
        onPrimaryClick={onClose}
      />
    </BottomSheet>
    </>
  );
};

export default ReviewForm;