import { Pet } from "@/types/pet";
import * as yup from "yup";

export const petFormSchema = yup.object().shape({
  name: yup.string().required("이름은 필수입니다."),
  nameVerified: yup.boolean().oneOf([true], "이름 중복체크를 해주세요."),
  gender: yup.string().required("성별은 필수입니다."),
  birthDay: yup.string().required("생년월일은 필수입니다."),
  breedId: yup.number().min(1).required("견종 선택은 필수입니다."),
});

export type PetFormValues = yup.InferType<typeof petFormSchema>;

export const defaultPetFormValues = (petInfo: Pet | null): PetFormValues => ({
  name: petInfo?.name ?? "",
  nameVerified: !!petInfo?.name,
  gender: petInfo?.gender ?? "",
  birthDay: petInfo?.birthInfo.birthDay ?? "",
  breedId: petInfo?.breedInfo.id ?? 0,
});
