import * as styles from './ReviewForm.css';
import { useState } from "react";
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { CreateReviewDetail, ImageFile, ReviewDetailImage, ReviewFormData, ReviewType, UpdateReviewDetail } from "@/types";
import DefaultTextarea from "@/components/common/defaultTextarea/DefaultTextarea";
import MultiFileUpload from "@/components/common/multiFileUpload/MultiFileUpload";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import RateStar from "@/components/common/rateStar/RateStar";
import Text from "@/components/common/text/Text";
import { reviewType } from "@/constants";
import { formatDate } from "@/utils/dateUtils";

interface ReviewFormValues {
  id: number;
  targetId: number;
  star: number;
  contents: string;
  reviewType?: ReviewType;
  addImageIdList?: number[];
  deleteImageIdList?: number[];
}

interface ReviewFormProps {
  type: 'create' | 'update';
  reviewDetail: ReviewFormData;
  reviewImageDtoList?: ReviewDetailImage[];
  handleSubmitForm: (body: UpdateReviewDetail | CreateReviewDetail) => void;
}

const ReviewForm = ({ type, reviewDetail, reviewImageDtoList, handleSubmitForm }: ReviewFormProps) => {
  const { control, register, handleSubmit, formState: { errors } } = useForm<ReviewFormValues>();
  const [addImageIdList, setAddImageIdList] = useState<number[]>([]);
  const [deleteImageIdList, setDeleteImageIdList] = useState<number[]>([]);

  console.log('reviewDetail', reviewDetail);

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

  const onSubmit: SubmitHandler<ReviewFormValues> = (data) => {
    const body: CreateReviewDetail | UpdateReviewDetail = type === 'update'
      ? {
        orderId: reviewDetail.orderId,
        contents: data.contents,
        star : data.star,
        addImageIdList,
        deleteImageIdList,
      }
      : {
        id : reviewDetail.id,
        targetId : reviewDetail.targetId,
        orderId: reviewDetail.orderId,
        reviewType : reviewDetail.reviewType,
        contents: data.contents,
        star : data.star,
        reviewImageIdList: addImageIdList,
      };
    handleSubmitForm(type === 'update' ? body as UpdateReviewDetail : body as CreateReviewDetail);
  };
  
  console.log('addImageIdList', addImageIdList)
  console.log('deleteImageIdList', deleteImageIdList)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.reviewFormContainer}>
      <div>
        <Text type='description' size='sm' color='grey' align='right'>
          {type === 'update' ? `${reviewDetail.writtenDate} 작성` : reviewDetail.orderedDate ?`${formatDate(reviewDetail.orderedDate, 'onlyDate')} 주문` : ''}
        </Text>
        <Image
          src={reviewDetail.thumbnailUrl ? reviewDetail.thumbnailUrl : reviewDetail.imageUrl ? reviewDetail.imageUrl : NoImage}
          alt={reviewDetail.title}
          width={80}
          height={80}
        />
        <div className={styles.reviewTitle}>
          <Text type='description' size='md' color='black'>{reviewDetail.title}</Text>
          <Text type='description' size='sm' color='grey'>{reviewType[reviewDetail.reviewType as ReviewType]}</Text>
        </div>
      </div>
      <div className={styles.reviewRate}>
        <Text type='description' size='md' color='black'>
          상품은 어떠셨나요?
        </Text>
        <Controller
          name='star'
          control={control}
          defaultValue={reviewDetail?.star || 5}
          render={({ field }) => (
            <RateStar
              value={field.value || 5}
              rateLength={reviewDetail?.star || 5}
              onChange={field.onChange}
              color='yellow'
              isEdit
            />
          )}
        />
      </div>
      <div className={styles.reviewForm}>
        <Controller
          name='contents'
          control={control}
          defaultValue={reviewDetail?.contents || ''}
          render={({ field }) => (
            <DefaultTextarea
              {...field}
              id='contents'
              label='상세 리뷰'
              placeholder='50자 이상 작성시 300원이 적립됩니다. \n 상품에 대한 견주님의 의견을 남겨주시면 큰 힘이 됩니다.'    
              minLength={10}
              maxLength={1000}
              {...register('contents', {
                required: '리뷰를 작성해주세요.',
                minLength: {
                  value: 10,
                  message: '10글자 이상 입력해주세요.',
                },
                maxLength: {
                  value: 1000,
                  message: '리뷰는 최대 1000자까지 입력 가능합니다.',
                },
              })}
              error={errors.contents?.message}
            />
          )}
        />
        <MultiFileUpload
          uploadApiUrl='/api/reviews/upload'
          onFilesChange={(files) => handleFileUpload(files as ImageFile[])}
          maxFiles={10}
          imageWidth={75}
          imageHeight={75}
          initialImages={reviewImageDtoList}
          handleRemove={(id) => handleFileRemove(id)}
        />
      </div>
      <div className={styles.submitContainer}>
        <DefaultButton
          type='main'
          borderRadius='sm'
          isSubmit
          onClick={() => console.log('')}
        >
          {type === 'update' ? '수정' : '등록'}
        </DefaultButton>
      </div>
    </form>
  );
};

export default ReviewForm;