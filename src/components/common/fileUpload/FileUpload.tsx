"use client";
import { ChangeEvent, useState } from "react";
import * as styles from "./FileUpload.css";
import Image from "next/image";
import AddProfileIcon from "/public/images/icons/add_profile.svg";
import DogIcon from "/public/images/healthNote/dogIcon.png";
import DefaultText from "@/components/common/defaultText/DefaultText";

type ImageFileObjectFit = "cover" | "contain";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  maxSize?: number;
  defaultImageUrl: string | null;
  defaultImageName?: string;
  imageName: string;
  imageWidth: number;
  imageHeight: number;
  borderRadius: boolean;
  objectFit?: ImageFileObjectFit;
}

const FileUpload = ({
  onFileChange,
  maxSize = 10 * 1024 * 1024,
  defaultImageUrl,
  defaultImageName,
  imageName,
  imageWidth,
  imageHeight,
  borderRadius = true,
  objectFit = "cover",
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [clearFile, setClearFile] = useState<boolean>(false);

  const imageSrc =
    (!clearFile && (previewUrl ? previewUrl : defaultImageUrl)) || DogIcon;
  // const imageNameInfo = !clearFile && (file ? `선택된 파일:\n ${file.name}` : defaultImageName && defaultImageName) || '선택된 파일이 없습니다.';

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setClearFile(false);
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        setError(
          `파일 크기가 ${maxSize / 1024 / 1024}MB를 초과할 수 없습니다.`
        );
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      const allowedExtensions = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedExtensions.includes(selectedFile.type)) {
        setError("허용되지 않은 파일 형식입니다. (JPG, JPEG, PNG, GIF만 허용)");
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      setFile(selectedFile);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      onFileChange(selectedFile);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    onFileChange(null);
    setClearFile(true);
  };

  return (
    <div className={styles.fileUploadContainer}>
      <label htmlFor="file-input">
        <Image
          src={imageSrc}
          alt={imageName}
          width={imageWidth}
          height={imageHeight}
          className={styles.imageFile({ borderRadius, objectFit })}
        />
        <div className={styles.background}>
          <AddProfileIcon />
        </div>
      </label>
      <input
        type="file"
        id="file-input"
        accept="image/jpeg, image/jpg, image/png, image/gif"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={handleClearFile}>
        <DefaultText
          type="headline4"
          color="gray600"
          align="center"
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          기본 이미지
        </DefaultText>
      </button>
      {/*<div className={styles.fileInfoContainer}>*/}
      {/*  <Text type='description' size='sm' color='black' align='left' className={ellipsis({ lineSize: 'line2' })}>*/}
      {/*    {imageNameInfo}*/}
      {/*  </Text>*/}
      {/*  <button onClick={handleClearFile} className={styles.clearButton}>*/}
      {/*    <Image src={CloseButton} alt='close button' width={10} height={10} />*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/*{error && <Text type='description' size='xs' color='red'>{error}</Text>}*/}
      {/*<Text type='description' size='xs' color='grey'>*/}
      {/*  * 파일 크기 10MB 이하 / 확장자: jpg, jpeg, png, gif*/}
      {/*</Text>*/}
    </div>
  );
};

export default FileUpload;
