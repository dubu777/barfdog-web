"use client";
import { useState } from "react";
import * as styles from "../PetModal.css";
import { useToastStore } from "@/store/useToastStore";
import { useBackNavigation } from "@/utils";
import DogForm from "../form/PetForm";
import { useUpdatePet } from "@/api/pet/mutations/useUpdatePet";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";
import { useForm } from "react-hook-form";
import {
  defaultPetFormValues,
  petFormSchema,
  PetFormValues,
} from "@/utils/validation/petValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";

interface PetEditModalProps {
  petId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function PetEditModal({
  petId,
  isOpen,
  onClose,
}: PetEditModalProps) {
  const goBack = useBackNavigation(undefined, true);
  const { data: petInfo } = useGetPetDetail(petId);
  const [file, setFile] = useState<File | null>(null);
  const { mutate: updatePet } = useUpdatePet();

  const { addToast } = useToastStore();

  const form = useForm<PetFormValues>({
    resolver: yupResolver(petFormSchema),
    defaultValues: defaultPetFormValues(petInfo),
    mode: "all",
  });

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  return (
    <FullModalWrapper
      className={styles.petModalContainer}
      isVisible={isOpen}
      headerTitle="반려견 수정"
      handleClose={onClose}
    >
      <DogForm
        type="update"
        form={form}
        dogPictureUrl={petInfo.displayImageUrl?.url}
        handleFileChange={handleFileChange}
        handleSubmit={() => {}}
      />
    </FullModalWrapper>
  );
}
