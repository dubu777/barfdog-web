import * as yup from "yup";
import { formatDate } from "../dateUtils";
import { UserInfo } from "@/types/mypage/account";
import { GenderType } from "@/types/auth";

const updateUserInfoSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .required("이름은 필수입니다."),
  birthday: yup.string().required("생년월일은 필수입니다."),
  gender: yup.string().required("성별은 필수입니다."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10,11}$/, "휴대폰 번호는 10~11자리 숫자여야 합니다.")
    .required("휴대폰 번호는 필수입니다."),
});

const defaultUpdateUserInfoValues = (userInfo?: UserInfo) => ({
  name: userInfo?.name || "",
  phoneNumber: userInfo?.phoneNumber || "",
  birthday: formatDate(userInfo?.birthday as string, "onlyDateDot") || "",
  gender: (userInfo?.gender as GenderType) || "MALE",
  receiveEmail: userInfo?.receiveEmail || false,
  receiveSms: userInfo?.receiveSms || false,
  // --------------예외 처리를 위한 상태값--------------
  email: userInfo?.email || "",
  defaultPhoneNumber: userInfo?.phoneNumber || "",
  authNumber: null,
  hasCheckedAuthNumber: false,
});

export { updateUserInfoSchema, defaultUpdateUserInfoValues };