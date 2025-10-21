import { PROVIDERS } from "@/constants/auth";
import { ValueOfTuple } from "@/types/index";

// 로그인
type UserType =
  | "NON_MEMBER"
  | "MEMBER"
  | "MEMBER_WITH_SMS_KAKAO"
  | "MEMBER_WITH_SMS_NAVER"
  | "SUCCESS";
type GenderType = "MALE" | "FEMALE" | "NONE" | "M" | "F" | null;
type SnsProvider = ValueOfTuple<typeof PROVIDERS>;
type UpperSnsProvider = Uppercase<SnsProvider>;

interface OAuthLoginResponse {
  provider: SnsProvider;
  token: string | null;
  response: LoginWithOAuthTokenResponse;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  birthday: string;
  gender: string;
  recommendCode?: string;
  agreement: {
    servicePolicy: boolean;
    privacyPolicy: boolean;
    receiveSms: boolean;
    receiveEmail: boolean;
    over14YearsOld: boolean;
    thirdPolicy?: boolean;
  };
}

interface ResetPasswordRequest {
  authToken: string;
  authCode: string;
  newPassword: string;
}

interface VerifyFindAccountCodeRequest {
  authToken: string;
  authCode: string;
}

interface RequestFindAccountCodeResponse {
  authToken: string;
  expiryDate: string;
  notificationType: string;
}

interface VerifyFindAccountCodeResponse {
  email: string;
  snsProvider: string | null;
}

interface LoginWithOAuthTokenData {
  result: SnsLoginResultCode;
  conflictEmail?: string; // 이미 가입된 이메일
  otherSnsProvider?: UpperSnsProvider; // 이미 가입된 SNS
}

interface LoginWithOAuthTokenResponse {
  success: boolean;
  data: LoginWithOAuthTokenData | null;
  message: string | null;
  detailMessage: string | null;
  errorCode: string | null;
}

type SnsLoginResultCode =
  | "ALREADY_LINKED"
  | "NEWLY_LINKED"
  | "NEW_ACCOUNT_AND_LINKED"
  | "LINK_PROVIDER_CONFLICT"
  | "LINK_EMAIL_CONFLICT"
  | "PROFILE_PARSE_FAILED";

type ResetPasswordStep = "request" | "verify" | "reset";
type VerificationStep = "request" | "verify" | "verified";

export type {
  UserType,
  SnsProvider,
  GenderType,
  SignupRequest,
  RequestFindAccountCodeResponse,
  ResetPasswordRequest,
  VerifyFindAccountCodeRequest,
  ResetPasswordStep,
  VerifyFindAccountCodeResponse,
  VerificationStep,
  OAuthLoginResponse,
  LoginWithOAuthTokenData,
  UpperSnsProvider,
  LoginWithOAuthTokenResponse,
};
