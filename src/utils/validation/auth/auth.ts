import * as yup from "yup";
import {
  FindUserEmail,
  ConnectSnsPassword,
  GenderType,
  UserInfo,
} from "@/types";
import { formatDate } from "@/utils/dateUtils";

export {
  findUserEmailSchema,
  defaultFindUserEmailValues,
  loginSchema,
  defaultLoginValues,
  connectSnsSchema,
  defaultConnectSnsValue,
  updateUserInfoSchema,
  defaultUpdateUserInfoValues,
  defaultSignupStepValues,
  signupStepsSchema,
};

// --- STEP 1: 이름 · 이메일 검증 ------------------------------------------------
const step1 = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .required("이름은 필수입니다."),
  email: yup
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일 주소는 필수입니다."),
  confirmEmail: yup.boolean().oneOf([true], "이메일 중복체크를 해주세요."),
});

// --- STEP 2: 비밀번호 검증 ---------------------------------------------------
const step2 = yup.object({
  password: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .matches(
      /(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
      "문자·숫자·특수문자를 각각 하나 이상 포함해야 합니다."
    )
    .test(
      "no-repeat-seq",
      "3회 이상 동일하거나 연속성이 있는 문자 사용을 금지합니다.",
      (value = "") => {
        for (let i = 0; i < value.length - 2; i++) {
          const a = value.charCodeAt(i),
            b = value.charCodeAt(i + 1),
            c = value.charCodeAt(i + 2);
          if (a === b && b === c) return false;
          if (b - a === 1 && c - b === 1) return false;
          if (a - b === 1 && b - c === 1) return false;
        }
        return true;
      }
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수입니다."),
});

// --- STEP 3: 연락처·인증·생년월일·성별·추천코드 ---------------------------------
const step3 = yup.object({
  phoneNumber: yup
    .string()
    .matches(/^\d{10,11}$/, "휴대폰 번호는 10~11자리 숫자여야 합니다.")
    .required("휴대폰 번호는 필수입니다."),
  authNumber: yup.string().required("인증번호는 필수입니다."),
  birthday: yup.string().required("생년월일은 필수입니다."),
  gender: yup.string().required("성별은 필수입니다."),
  recommendCode: yup
    .string()
    .max(20, "추천코드는 최대 20자까지 입력 가능합니다."),
});

// --- STEP 4: 약관 동의 · 제휴 정보 ---------------------------------------------
const step4 = yup.object({
  agreement: yup
    .object({
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
          allianceValue != null
            ? schema.oneOf(
                [true],
                "제휴 코드를 입력하셨으면 제휴 약관에 동의하셔야 합니다."
              )
            : schema
        )
        .required(),
    })
    .required(),
});

// --- 전체 STEP 스키마 & 타입 & 기본값 -----------------------------------------
const signupStepsSchema = yup.object({
  step1,
  step2,
  step3,
  step4,
});

export type SignupStepValues = yup.InferType<typeof signupStepsSchema>;
export type SignupStepKeys = keyof SignupStepValues;

const defaultSignupStepValues: SignupStepValues = {
  step1: { name: "", email: "", confirmEmail: true }, // 임시로 true
  step2: { password: "", confirmPassword: "" },
  step3: {
    phoneNumber: "",
    authNumber: "",
    birthday: "",
    gender: "", // "" 또는 "NONE" 등 초기 옵션
    recommendCode: "",
  },
  step4: {
    agreement: {
      servicePolicy: false,
      privacyPolicy: false,
      over14YearsOld: false,
      receiveSms: false,
      receiveEmail: false,
    },
    allianceInfo: {
      alliance: null,
      alliancePolicy: false,
    },
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

const defaultUpdateUserInfoValues = (userInfo?: UserInfo) => ({
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
