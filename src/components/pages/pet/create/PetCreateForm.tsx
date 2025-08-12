"use client";
import { useState } from "react";
import {
  defaultPetFormValues,
  petFormSchema,
  PetFormValues,
} from "@/utils/validation/petValidation";
import PetForm from "../form/PetForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePet } from "@/api/pet/mutations/useCreatePet";
import { UpdatePetRequest } from "@/types/pet";
import { useToastStore } from "@/store/useToastStore";
import PetCreateSuccess from "./PetCreateSuccess";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import { petModalContainer } from "../PetModal.css";

interface PetCreateFormProps {
  source: "diet-analysis" | "health-note";
}

export default function PetCreateForm({ source }: PetCreateFormProps) {
  const router = useRouter();
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
    window.location.href = `/diet-analysis/survey?petName=${encodeURIComponent(
      petName
    )}&petId=${petId}&gender=${encodeURIComponent(gender)}`;
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
          if (source === "diet-analysis") {
            setIsSuccess(true);
          } else {
            addToast("반려견 등록이 완료됐어요", "above-button");
            router.push("/health-note");
          }
        },
        onError: () => {
          addToast("반려견 등록에 실패했어요", "above-button");
        },
      }
    );
  };

  return (
    <div className={petModalContainer}>
      <Header centerTitle="반려견 등록" showBackButton />
      {isSuccess ? (
        <PetCreateSuccess
          handleClose={() => router.push("/diet-analysis")}
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
    </div>
  );
}
