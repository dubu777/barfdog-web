import { commonWrapper, pointColor } from "@/styles/common.css";
import * as yup from "yup";
import { Controller, useWatch } from "react-hook-form";
import InfoBox from "@/components/common/infoBox/InfoBox";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import ReviewCard from "@/components/pages/mypage/review/common/reviewCard/ReviewCard";
import Textarea from "@/components/common/textarea/Textarea";
import MultiFileUploader from "@/components/common/multiFileUploader/MultiFileUploader";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import ReviewNoticeBottomSheet
  from "@/components/pages/mypage/review/common/reviewNoticeBottomSheet/ReviewNoticeBottomSheet";
  import useModal from "@/hooks/useModal";
import { DefaultReviewDetail, FileChangeInfo, ReviewFormValues, ReviewItemType, UploadedFile } from "@/types";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useMultiFileUpload } from "@/hooks/useMultiFileUpload";

const defaultReviewValue = (reviewFormValues: ReviewFormValues) => {
  return {
    id: reviewFormValues?.id,
    star: reviewFormValues?.star ?? 0,
    contents: reviewFormValues?.contents ?? '',
    reviewType: reviewFormValues?.reviewType,
  };
};

const reviewSchema = yup.object().shape({
  contents: yup
    .string()
    .min(10, '최소 10자 이상 작성해주세요')
    .max(1000, '리뷰는 최대 1000자까지 입력 가능합니다')
    .required('리뷰 내용을 작성해주세요'),
})

interface ReviewFormProps {
  type: 'create' | 'update';
  defaultReviewDetail: DefaultReviewDetail;
  reviewFormValues: ReviewFormValues;
  reviewImageList: UploadedFile[];
  onSubmit: (data: ReviewFormValues, fileChangeInfo: FileChangeInfo) => void;
}

export default function ReviewForm({
  type,
  defaultReviewDetail,
  reviewFormValues,
  reviewImageList,
  onSubmit,
}: ReviewFormProps) {
  const { title, thumbnailUrl, imageUrl, orderedDate, writtenDate } = defaultReviewDetail;
  const { id: reviewId, reviewType } = reviewFormValues;
  
  const {
    control,
    handleSubmit,
    errors,
    isValid,
    setValue,
  } = useFormHandler<ReviewFormValues>(reviewSchema, defaultReviewValue(reviewFormValues));
  
  const star = useWatch({ control, name: 'star' });
  
  const {
    uploadedFiles,
    uploadFile,
    removeFile,
    fileChangeInfo,
  } = useMultiFileUpload({
    fileKey: 'imageFile',
    idKey: 'reviewId',
    uploadApiUrl: '/api/v2/reviews/my-page/files',
    initialFiles: reviewImageList,
  })
  
  const { isOpen: isOpenReviewNotice, onClose: onCloseReviewNotice, onToggle: onToggleReviewNotice } = useModal();

  return (
    <>
      <section
        className={commonWrapper({
          backgroundColors: 'gray0',
          minHeight: 'fullWithHeader',
          justify: 'start',
          direction: 'col',
        })}
      >
        <article className={commonWrapper({ padding: 20, backgroundColors: 'gray50' })}>
          <InfoBox
            text='리뷰 작성시 유의사항'
            showRightArrowButton
            fullWidth
            onClick={onToggleReviewNotice}
          />
        </article>
        <article className={commonWrapper({ backgroundColors: 'gray0', direction: 'col' })}>
          <Text type='title4' className={commonWrapper({ padding: 20, paddingBottom: 0, justify: 'start' })}>
            이 상품 어떠셨나요?
          </Text>
          <ReviewCard
            id={reviewId as number}
            title={title}
            reviewType={reviewType as ReviewItemType}
            displayItemThumbnailUrl={thumbnailUrl}
            displayImageUrl={imageUrl}
            orderedDate={orderedDate}
            writtenDate={writtenDate}
            star={star}
            handleStarChange={(newRating) => {
              setValue('star', newRating, { shouldValidate: true });
            }}
          />
        </article>
        <Divider thickness={4} color='gray50' />
        <article
          className={commonWrapper({
            backgroundColors: 'gray0',
            direction: 'col',
            align: 'start',
            padding: 20,
            gap: 20,
          })}
        >
          <Text type='title4' className={commonWrapper({ paddingBottom: 0, justify: 'start' })}>
            어떤 점이 좋았나요?
          </Text>
          <div className={commonWrapper({direction: 'col', align: 'start', gap: 8 })}>
            <Text type='label4' className={commonWrapper({justify: 'start', align: 'center', gap: 4 })}>
              <span className={pointColor}>*</span>
              상세 후기
              <Text type='caption' color='pastelRed'>
                30자 이상 작성시 300원 적립!
              </Text>
            </Text>
            <Controller
              name='contents'
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id='contents'
                  placeholder='상품의 리뷰를 작성해 주세요 (최소 10자 이상)'
                  minLength={10}
                  maxLength={1000}
                  error={field.value ? errors.contents?.message : ''}
                  fullWidth
                />
              )}
            />
          </div>
          <div className={commonWrapper({direction: 'col', align: 'start', gap: 8 })}>
            <Text type='label4' className={commonWrapper({justify: 'start', align: 'center', gap: 4 })}>
              사진첨부
              <Text type='caption' color='pastelRed'>
                포토 후기 작성 시 500원 추가 적립!
              </Text>
            </Text>
            <MultiFileUploader
              files={uploadedFiles}
              onUpload={uploadFile}
              onRemove={removeFile}
              maxFiles={10}
              captionList={[
                '첫 번째 이미지가 대표 이미지로 노출됩니다.',
                '이미지는 최대 10장 이내로 등록 가능합니다.',
                '파일 크기는 10MB이하/ jpg, jpeg, png, gif 형식만 등록 가능합니다.',
              ]}
            />
          </div>
        </article>
        <ButtonDocked
          type='full-button'
          primaryButtonLabel={type === 'create' ? '등록하기' : '수정하기'}
          onPrimaryClick={handleSubmit((data) => onSubmit(data, fileChangeInfo))}
          position='sticky'
          isPrimaryDisabled={!isValid}
        />
      </section>
      {isOpenReviewNotice &&
        <ReviewNoticeBottomSheet
          isOpen={isOpenReviewNotice}
          onClose={onCloseReviewNotice}
        />
      }
    </>
	);
}