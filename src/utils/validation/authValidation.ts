import * as yup from "yup";
import {
  FindUserEmail,
  TemporaryPassword,
  ConnectSnsPassword,
  GenderType,
  GetUserInfo,
} from "@/types";
import { LoginUserInfo } from "@/types";
import { formatDate } from "@/utils/dateUtils";

export {
  signupSchema,
  defaultSignupValues,
  findUserEmailSchema,
  defaultFindUserEmailValues,
  sendTempPwSchema,
  defaultSendTempPwValues,
  loginSchema,
  defaultLoginValues,
  connectSnsSchema,
  defaultConnectSnsValue,
  updateUserInfoSchema,
  defaultUpdateUserInfoValues,
};

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .required("이름은 필수입니다."),
  email: yup
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일 주소는 필수입니다."),
  confirmEmail: yup.boolean().oneOf([true], "이메일 중복체크를 해주세요."),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "비밀번호는 문자와 숫자를 포함해야 합니다."
    )
    .required("비밀번호는 필수입니다."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수입니다."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10,11}$/, "휴대폰 번호는 10~11자리 숫자여야 합니다.")
    .required("휴대폰 번호는 필수입니다."),
  authNumber: yup.string().required("인증번호는 필수입니다."),

  address: yup.object().shape({
    zipcode: yup.string().required("우편번호는 필수입니다."),
    city: yup.string().required("도시명은 필수입니다."),
    street: yup.string().required("도로명 주소는 필수입니다."),
    detailAddress: yup.string().required("상세 주소는 필수입니다."),
  }),

  birthday: yup.string().required("생년월일은 필수입니다."),
  gender: yup.string().required("성별은 필수입니다."),

  recommendCode: yup
    .string()
    .max(20, "추천코드는 최대 20자까지 입력 가능합니다."),

  agreement: yup
    .object()
    .shape({
      servicePolicy: yup.boolean().oneOf([true], "이용약관에 동의해주세요."),
      privacyPolicy: yup
        .boolean()
        .oneOf([true], "개인정보 처리방침에 동의해주세요."),
      over14YearsOld: yup
        .boolean()
        .oneOf([true], "만 14세 이상 동의는 필수입니다."),
      receiveSms: yup.boolean(),
      receiveEmail: yup.boolean(),
    })
    .required(),

  allianceInfo: yup
    .object({
      alliance: yup.string().nullable(),
      alliancePolicy: yup
        .boolean()
        .when("alliance", (allianceValue, schema) =>
          // allianceValue가 null이 아니면(즉, 사용자가 제휴 코드를 입력했다면)
          allianceValue != null
            ? schema.oneOf(
                [true],
                "제휴 코드를 입력하셨으면 제휴 약관에 동의하셔야 합니다."
              )
            : schema
        )
        .required(), // boolean 자체는 항상 존재하도록
    })
    .required(),
});
export type SignupFormValues = yup.InferType<typeof signupSchema>;
export type SignupKeys = keyof SignupFormValues;

const defaultSignupValues: SignupFormValues = {
  name: "",
  email: "",
  confirmEmail: false,
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  authNumber: "",
  address: {
    zipcode: "",
    city: "",
    street: "",
    detailAddress: "",
  },
  birthday: "",
  gender: "NONE",
  recommendCode: "",
  agreement: {
    servicePolicy: false,
    privacyPolicy: false,
    receiveSms: false,
    receiveEmail: false,
    over14YearsOld: false,
  },
  allianceInfo: {
    alliance: null,
    alliancePolicy: false,
  },
};

const findUserEmailSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .required("이름은 필수입니다."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10,11}$/, "휴대폰 번호는 10~11자리 숫자여야 합니다.")
    .required("휴대폰 번호는 필수입니다."),
});

const defaultFindUserEmailValues: FindUserEmail = {
  name: "",
  phoneNumber: "",
};

const sendTempPwSchema = yup.object().shape({
  email: yup
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일 주소는 필수입니다."),
  name: yup
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .required("이름은 필수입니다."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10,11}$/, "휴대폰 번호는 10~11자리 숫자여야 합니다.")
    .required("휴대폰 번호는 필수입니다."),
});

const defaultSendTempPwValues: TemporaryPassword = {
  email: "",
  name: "",
  phoneNumber: "",
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일 주소는 필수입니다."),
  password: yup
    .string()
    // .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    // .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
    .required("비밀번호는 필수입니다."),
});

const defaultLoginValues = (initialUserEmail: string | null) => {
  return {
    email: initialUserEmail || "",
    password: "",
    autoLogin: false,
  };
};

const connectSnsSchema = yup.object().shape({
  password: yup
    .string()
    // .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    // .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
    .required("비밀번호는 필수입니다."),
});

const defaultConnectSnsValue: ConnectSnsPassword = {
  password: "",
};

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

const defaultUpdateUserInfoValues = (userInfo: GetUserInfo | undefined) => ({
  name: userInfo?.name || "",
  phoneNumber: userInfo?.phoneNumber || "",
  birthday: formatDate(userInfo?.birthday as string, "onlyDateDot") || "",
  gender: (userInfo?.gender as GenderType) || "MALE",
  // --------------예외 처리를 위한 상태값--------------
  email: userInfo?.email || "",
  defaultPhoneNumber: userInfo?.phoneNumber || "",
  authNumber: null,
  hasCheckedAuthNumber: false,
});
