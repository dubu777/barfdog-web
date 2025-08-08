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
import PetCreateSuccess from "./PetCreateSuccess";

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
  // 펫 등록 성공 여부
  const [isSuccess, setIsSuccess] = useState(false);

  // 추천식단으로 넘길 pet 정보
  const [petId, setPetId] = useState<number | null>(null);
  const [petName, setPetName] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const { addToast } = useToastStore();

  const form = useForm<PetFormValues>({
    resolver: yupResolver(petFormSchema),
    defaultValues: defaultPetFormValues(null),
    mode: "all",
  });

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleGoToSurvey = () => {
    window.location.href = `/diet-analysis/survey?petName=${petName}&petId=${petId}&gender=${gender}`;
  };

  const onSubmit = (values: PetFormValues) => {
    setPetName(values.name);
    setGender(values.gender);

    const body = {
      petName: values.name,
      gender: values.gender,
      birthDay: values.birthDay,
      breedId: values.breedId,
    } as UpdatePetRequest;
    createPet(
      { body, petPicture: file },
      {
        onSuccess: (res) => {
          const newId = res.data?.petId ?? null;
          setPetId(newId);
          setIsSuccess(true);
        },
        onError: () => {
          addToast("반려견 등록에 실패했습니다", "above-button");
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
      {isSuccess ? (
        <PetCreateSuccess
          handleClose={onClose}
          handleGoToSurvey={handleGoToSurvey}
        />
      ) : (
        <PetForm
          isEdit={false}
          form={form}
          dogPictureUrl={null}
          handleFileChange={handleFileChange}
          handleSubmit={form.handleSubmit(onSubmit)}
        />
      )}
    </FullModalWrapper>
  );
}
