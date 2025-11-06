import { Pet } from "@/types/pet";
import * as yup from "yup";

/**
 * 펫 이름 유효성 검사 함수
 * - 특수문자 허용하지 않음 (한글, 영문, 숫자만 허용)
 * - 이모지 허용하지 않음
 * - 공백 허용하지 않음
 * - 미완성 한글 허용하지 않음 (ㄱ, ㅏ 등)
 * - 최대 12자 제한
 */
export const petFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("이름은 필수입니다.")
    .test("max-length", "이름은 12자 이하로 입력해주세요.", (value) => {
      return !value || value.length <= 12;
    })
    .test("no-spaces", "공백을 사용할 수 없어요", (value) => {
      return !value || !/\s/.test(value);
    })
    .test(
      "no-incomplete-hangul",
      "자음 또는 모음만 입력할 수 없어요",
      (value) => {
        return !value || !/[ㄱ-ㅎㅏ-ㅣ]/.test(value);
      }
    )
    .test("no-emoji", "특수문자나 이모지는 사용할 수 없어요", (value) => {
      if (!value) return true;
      const emojiRegex =
        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
      return !emojiRegex.test(value);
    })
    .test("allowed-chars", "특수문자나 이모지는 사용할 수 없어요", (value) => {
      if (!value) return true;
      const allowedCharsRegex = /^[가-힣a-zA-Z0-9]+$/;
      return allowedCharsRegex.test(value);
    }),
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
