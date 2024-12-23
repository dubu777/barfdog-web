import * as styles from './DogImage.css';
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import {useState} from "react";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import Text from "@/components/common/text/Text";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import { useToastStore } from "@/store/useToastStore";
import { useUploadDogProfileImage } from "@/api/dog/mutations/useUploadDogProfileImage";

interface DogImageProps {
  dogId: number;
  dogPictureUrl: string;
  dogPictureName: string;
}

type UploadMode = 'update' | 'create';

const DogImage = ({ dogId, dogPictureUrl, dogPictureName }: DogImageProps) => {
  const [openEditImageModal, setOpenEditImageModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { addToast } = useToastStore();
  const { mutate } = useUploadDogProfileImage();

  const updateMode: UploadMode = dogPictureUrl ? 'update' : 'create';

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
  }
  const handleFileUpload = async () => {
    if (file === null && dogPictureUrl !== '') {
      addToast('파일을 선택해주세요.', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      if(file) {
        formData.append('file', file);
      }
      mutate(
        {
          formData,
          dogId,
          deleteImage: file === null,
        },
        {
          onSuccess: () => {
            setOpenEditImageModal(false);
            addToast(
              `프로필 사진이 ${updateMode === 'create' ? '등록' : '수정'}되었습니다.`,
              'success'
            );
          },
          onError: () => {
            // dogPictureId === null 삭제기능 404 Error 확인 필요
            addToast('파일 업로드에 실패했습니다.', 'error');
          }
        },
      )
    } catch (err) {
      console.log(err);
      addToast('파일 업로드에 실패했습니다.', 'error');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      <Image
        src={dogPictureUrl ? dogPictureUrl : NoImage}
        alt='반려견 이미지'
        width={67}
        height={67}
        style={{ borderRadius: '50%' }}
        className={styles.dogImage}
        onClick={() => setOpenEditImageModal(true)}
      />
      <DefaultModal
        isVisible={openEditImageModal}
        onClose={() => setOpenEditImageModal(false)}
        type="alert"
        size="lg"
        confirmText='저장'
        cancelText='취소'
        onClickConfirm={handleFileUpload}
      >
        <div className={styles.editImageContainer}>
          <Text type='title' size='lg'>
            프로필 사진 편집
          </Text>
          <FileUpload
            onFileChange={handleFileChange}
            defaultImageUrl={dogPictureUrl}
            defaultImageName={dogPictureName}
            imageName='반려견 이미지'
            imageWidth={67}
            imageHeight={67}
            borderRadius
            objectFit='cover'
          />
          {isUploading &&
            <Text type='description' size='xs' color='grey'>
              uploading...
            </Text>
          }
        </div>
      </DefaultModal>
    </>
  );
};

export default DogImage;