"use client";
import { useState } from "react";
import * as styles from "../PetModal.css";
import { useToastStore } from "@/store/useToastStore";
import { useUpdatePet } from "@/api/pet/mutations/useUpdatePet";
import { useForm } from "react-hook-form";
import {
  defaultPetFormValues,
  petFormSchema,
  PetFormValues,
} from "@/utils/validation/petValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import PetForm from "../form/PetForm";
import { buildPetUpdateRequest } from "@/utils/pet/buildPetUpdateRequest";
import { BreedInfo } from "@/types/pet";

interface PetEditModalProps {
  petId: number;
  profileImageUrl: string | null;
  name: string;
  gender: string;
  birthDay: string;
  breedInfo: BreedInfo;
  isOpen: boolean;
  onClose: () => void;
}

export default function PetEditModal({
  petId,
  profileImageUrl,
  name,
  gender,
  birthDay,
  breedInfo,
  isOpen,
  onClose,
}: PetEditModalProps) {
  const { mutate: updatePet } = useUpdatePet();
  const [file, setFile] = useState<File | null>(null);

  const { addToast } = useToastStore();

  const petInfo = { name, gender, birthDay, breedId: breedInfo?.id };
  const form = useForm<PetFormValues>({
    resolver: yupResolver(petFormSchema),
    defaultValues: defaultPetFormValues(petInfo),
    mode: "all",
  });

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const onSubmit = (values: PetFormValues) => {
    const body = buildPetUpdateRequest(petInfo as PetFormValues, values);
    console.log("body", body);

    updatePet(
      { petId, body, petPicture: file },
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
      headerTitle="반려견 수정"
      handleClose={onClose}
    >
      <PetForm
        isEdit={true}
        form={form}
        dogPictureUrl={profileImageUrl}
        handleFileChange={handleFileChange}
        handleSubmit={form.handleSubmit(onSubmit)}
      />
    </FullModalWrapper>
  );
}
