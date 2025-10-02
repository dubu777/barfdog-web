import { SnsProvider } from "@/types";
import { SignupStepKeys } from "@/utils/validation/auth/auth";

const AUTH_CONFIG = {
  ACCESS_TOKEN_COOKIE: "access_token",
  REFRESH_TOKEN_COOKIE: "refreshToken",
};

const PROVIDER_LABEL: Record<string, string> = {
  kakao: "카카오",
  naver: "네이버",
};

const SIGNUP_NO_AUTO_STEP = new Set<SignupStepKeys>([
  "step1",
  "step2",
  "step3",
  "step4",
]);

const GENDER_CATEGORY = [
  { label: "남자", value: "MALE" },
  { label: "여자", value: "FEMALE" },
  { label: "선택안함", value: "NONE" },
];

const SIGNUP_OPTIONAL_FIELDS: Record<string, string[]> = {
  step3: ["recommendCode"],
};

const PROVIDERS = ["kakao", "naver"] as const;

const PROVIDERS_LABEL = {
  kakao: "카카오",
  naver: "네이버",
} as const satisfies Record<SnsProvider, string>;

export {
  AUTH_CONFIG,
  SIGNUP_NO_AUTO_STEP,
  GENDER_CATEGORY,
  SIGNUP_OPTIONAL_FIELDS,
  PROVIDERS,
  PROVIDERS_LABEL,
};
