import * as styles from '../MyPageCard.css';
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import {useState} from "react";
import DefaultModal from "@/components/common/defaultModal/DefaultModal";
import Text from "@/components/common/text/Text";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import { useToastStore } from "@/store/useToastStore";
import { useUploadPetProfileImage } from "@/api/pet/mutations/useUploadPetProfileImage";

interface PetAvatarProps {
  type: 'mypage' | 'subscription';
  petId: number;
  petPictureUrl: string;
  petPictureName: string;
}

type UploadMode = 'update' | 'create';

const PetAvatar = ({ type, petId, petPictureUrl, petPictureName }: PetAvatarProps) => {
  const [openEditImageModal, setOpenEditImageModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { addToast } = useToastStore();
  const { mutate } = useUploadPetProfileImage();

  const updateMode: UploadMode = petPictureUrl ? 'update' : 'create';

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
  }
  const handleFileUpload = async () => {
    if (file === null && petPictureUrl !== '') {
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
          petId,
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
            // petPictureId === null 삭제기능 404 Error 확인 필요
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
        src={petPictureUrl ? petPictureUrl : NoImage}
        alt='반려견 이미지'
        width={type === 'mypage' ? 72 : 76}
        height={type === 'mypage' ? 72 : 76}
        style={{ borderRadius: '8px' }}
        className={styles.petAvatar}
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
            defaultImageUrl={petPictureUrl}
            defaultImageName={petPictureName}
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

export default PetAvatar;