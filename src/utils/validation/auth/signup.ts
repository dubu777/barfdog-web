import * as yup from "yup";

// --- STEP 1: 이름 · 이메일 검증 ------------------------------------------------
export const step1 = yup.object({
  name: yup
    .string()
    .required("이름은 필수입니다.")
    .min(2, "이름은 2자 이상으로 입력해주세요")
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
  email: yup
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .required("이메일 주소는 필수입니다."),
  confirmEmail: yup
    .boolean()
    .oneOf([true], "이메일 중복체크를 해주세요.")
    .required(),
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
  servicePolicy: yup
    .boolean()
    .oneOf([true], "이용약관에 동의해주세요.")
    .required(),
  privacyPolicy: yup
    .boolean()
    .oneOf([true], "개인정보 처리방침에 동의해주세요.")
    .required(),
  over14YearsOld: yup
    .boolean()
    .oneOf([true], "만 14세 이상 동의는 필수입니다.")
    .required(),
  receiveSms: yup.boolean().required(),
  receiveEmail: yup.boolean().required(),
});

// --- 전체 STEP 스키마 & 타입 & 기본값 -----------------------------------------
export const signupStepsSchema = yup.object({
  step1,
  step2,
  step3,
  step4,
});

export type SignupStepValues = yup.InferType<typeof signupStepsSchema>;
export type SignupStepKeys = keyof SignupStepValues;

export const defaultSignupStepValues: SignupStepValues = {
  step1: { name: "", email: "", confirmEmail: false }, // 임시로 true
  step2: { password: "", confirmPassword: "" },
  step3: {
    phoneNumber: "",
    authNumber: "",
    birthday: "",
    gender: "",
    recommendCode: "",
  },
  step4: {
    servicePolicy: false,
    privacyPolicy: false,
    over14YearsOld: false,
    receiveSms: false,
    receiveEmail: false,
  },
};
