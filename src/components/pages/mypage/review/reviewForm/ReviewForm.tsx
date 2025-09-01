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
import Textarea from "@/components/common/textarea/Textarea";
import MultiFileUpload from "@/components/common/multiFileUpload/MultiFileUpload";
import Text from "@/components/common/text/Text";
import ReviewCard from "@/components/pages/mypage/common/cards/section/ReviewCard";
import ReviewSurvey from "@/components/pages/mypage/review/reviewForm/reviewSurvey/ReviewSurvey";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Divider from "@/components/common/divider/Divider";

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
  const { control, handleSubmit, errors, setValue, watch, isValid } = useFormHandler<
    CreateReviewDetail | UpdateReviewDetail
  >(reviewFormSchema, defaultReviewForm(reviewDetail) as any);

  const [addImageIdList, setAddImageIdList] = useState<number[]>([]);
  const [deleteImageIdList, setDeleteImageIdList] = useState<number[]>([]);
  const [surveyFormData, setSurveyFormData] = useState<Record<SurveyKey, SurveyValue>>({
    preference: null,
    freshness: null,
    deliveryStatus: null,
  })
  const formData = watch();

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
        id: reviewDetail.id as number,
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
      <Text type='title4' className={styles.reviewFormTitle}>이 상품 어떠셨나요?</Text>
      <ReviewCard
        reviewDetail={reviewDetail}
        formData={formData}
        setValue={setValue}
        isEditable
        isReviewDetail
      />
      <Divider thickness={4} />
      <ReviewSurvey surveyFormData={surveyFormData} setSurveyFormData={setSurveyFormData} />
      <Divider thickness={4} />
      <div className={styles.reviewContentsBox}>
        <div className={styles.reviewContents}>
          <Text type='title4'>어떤 점이 좋았나요?</Text>
          <div className={styles.reviewContentsTitle}>
            <Text type='label4'>상세 후기</Text>
            <Text type='caption' color={formData?.contents?.length > 0 ? 'pastelRed' : 'gray500'}>20자 이상 작성시 300원 추가 적립!</Text>
          </div>
          <Controller
            name='contents'
            control={control}
            render={({ field }) => (
              <Textarea
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
          title='사진첨부'
          subTitle='포토 후기 작성 시 500원 적립!'
          className={styles.reviewFileUpload}
          showRepresentativeLabel
        />
      </div>
      <ButtonDocked
        type='full-button'
        primaryButtonSize='md'
        primaryButtonLabel={`${type === 'create' ? '등록' : '수정' }하기`}
        onPrimaryClick={handleSubmit(onSubmit)}
        isPrimaryDisabled={!isValid}
        position='sticky'
      />
    </form>

    </>
  );
};

export default ReviewForm;