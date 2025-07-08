import { SignupStepKeys } from "@/utils/validation/authValidation";

export {
  AUTH_CONFIG,
  SIGNUP_NO_AUTO_STEP,
  GENDER_CATEGORY,
  SIGNUP_OPTIONAL_FIELDS,
};

const AUTH_CONFIG = {
  ACCESS_TOKEN_COOKIE: "access_token",
  REFRESH_TOKEN_COOKIE: "refreshToken",
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
