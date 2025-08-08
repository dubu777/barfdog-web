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
import { useCreatePet } from "@/api/pet/mutations/useCreatePet";
import { UpdatePetRequest } from "@/types/pet";
import { useToastStore } from "@/store/useToastStore";

interface PetCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PetCreateModal({
  isOpen,
  onClose,
}: PetCreateModalProps) {
  const { mutate: createPet } = useCreatePet();
  const [file, setFile] = useState<File | null>(null);
  const { addToast } = useToastStore();

  const form = useForm<PetFormValues>({
    resolver: yupResolver(petFormSchema),
    defaultValues: defaultPetFormValues(null),
    mode: "all",
  });

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const onSubmit = (values: PetFormValues) => {
    const petInfo = {
      petName: values.name,
      gender: values.gender,
      birthDay: values.birthDay,
      breedId: values.breedId,
    } as UpdatePetRequest;
    createPet(
      { body: petInfo, petPicture: file },
      {
        onSuccess: () => {
          addToast("반려견 정보가 수정되었습니다.", "above-button");
          onClose();
        },
        onError: () => {
          addToast("반려견 정보 수정에 실패했습니다.", "above-button");
        },
      }
    );
  };

  return (
    <FullModalWrapper
      className={styles.petModalContainer}
      isVisible={isOpen}
      headerTitle="반려견 등록"
      handleClose={onClose}
    >
      <PetForm
        isEdit={false}
        form={form}
        dogPictureUrl={null}
        handleFileChange={handleFileChange}
        handleSubmit={form.handleSubmit(onSubmit)}
      />
    </FullModalWrapper>
  );
}
