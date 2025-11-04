"use client";
import { useState } from "react";
import { useToastStore } from "@/store/useToastStore";
import { useUpdatePet } from "@/api/pet/mutations/useUpdatePet";
import { useForm } from "react-hook-form";
import {
  defaultPetFormValues,
  petFormSchema,
  PetFormValues,
} from "@/utils/validation/petValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import PetForm from "../form/PetForm";
import { buildPetUpdateRequest } from "@/utils/pet/buildPetUpdateRequest";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import TrashIcon from "public/images/icons/trashbag.svg";
import { useDeletePet } from "@/api/pet/mutations/useDeletePet";
import { useGetPetDetail } from "@/api/pet/queries/useGetPetDetail";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import { petModalContainer } from "../PetModal.css";

interface PetEditFormProps {
  petId: number;
}

export default function PetEditForm({ petId }: PetEditFormProps) {
  const router = useRouter();
  const { data: petInfo } = useGetPetDetail(petId);
  const { mutate: updatePet } = useUpdatePet();
  const { mutate: deletePet } = useDeletePet();

  const [file, setFile] = useState<File | null>(null);

  const { addToast } = useToastStore();
  const form = useForm<PetFormValues>({
    resolver: yupResolver(petFormSchema),
    defaultValues: defaultPetFormValues(petInfo),
    mode: "all",
  });

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const onSubmit = (values: PetFormValues) => {
    const body = buildPetUpdateRequest(petInfo, values);
    console.log("body", body);

    updatePet(
      { petId, body, petPicture: file },
      {
        onSuccess: () => {
          addToast("반려견 정보가 수정되었습니다.", "above-button");
          router.back();
        },
        onError: () => {
          addToast("반려견 정보 수정에 실패했습니다.", "above-button");
          router.back();
        },
      }
    );
  };

  const handleDeletePet = () => {
    deletePet(petId, {
      onSuccess: () => {
        addToast("반려견 삭제가 완료됐습니다", "above-button");
        router.back();
      },
      onError: () => {
        addToast("반려견 삭제에 실패했습니다.", "above-button");
        router.back();
      },
    });
  };
  return (
    <div className={petModalContainer}>
      <Header
        centerTitle="반려견 수정"
        showBackButton
        rightElement={
          <SvgIcon src={TrashIcon} size={24} onClick={handleDeletePet} />
        }
      />
      <PetForm
        isEdit={true}
        form={form}
        dogPictureUrl={petInfo.displayImageUrl?.url ?? null}
        handleFileChange={handleFileChange}
        handleSubmit={form.handleSubmit(onSubmit)}
      />
    </div>
  );
}
