"use client";
import { useState } from "react";
import {
  defaultPetFormValues,
  petFormSchema,
  PetFormValues,
} from "@/utils/validation/petValidation";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import * as styles from "../PetModal.css";
import PetForm from "../form/PetForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface PetCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PetCreateModal({
  isOpen,
  onClose,
}: PetCreateModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<PetFormValues>({
    resolver: yupResolver(petFormSchema),
    defaultValues: defaultPetFormValues(null),
    mode: "all",
  });

  // 이미지 파일 업로드, 등록 적용 필요
  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FullModalWrapper
      className={styles.petModalContainer}
      isVisible={isOpen}
      headerTitle="반려견 등록"
      handleClose={onClose}
    >
      <PetForm
        type="create"
        form={form}
        handleFileChange={handleFileChange}
        handleSubmit={form.handleSubmit(onSubmit)}
      />
    </FullModalWrapper>
  );
}
