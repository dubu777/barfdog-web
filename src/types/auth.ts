import { PROVIDERS } from "@/config/oauthClient";
import { AddressDto, ValueOfTuple } from "@/types/index";

// 로그인
type Role = "USER" | "ADMIN" | "SUBSCRIBER";
type UserType =
  | "NON_MEMBER"
  | "MEMBER"
  | "MEMBER_WITH_SMS_KAKAO"
  | "MEMBER_WITH_SMS_NAVER"
  | "SUCCESS";
type GenderType = "MALE" | "FEMALE" | "NONE" | "M" | "F" | null;
type SnsProvider = ValueOfTuple<typeof PROVIDERS>;

interface LoginFormValues {
  email: string;
  password: string;
  autoLogin: boolean;
}

interface UserInfo {
  email: string;
  expiresAt: string;
  name: string;
  roleList: Role[];
  temporaryPassword: boolean;
}

interface LoginUserInfo {
  provider: SnsProvider;
  providerId: string;
  phoneNumber: string;
  message: string;
  resultCode: string;
  userType: UserType;
  token: null | string;
}

// 아이디 찾기, 임시 비밀번호 발급, SNS 연동
interface FindUserEmail {
  name: string;
  phoneNumber: string;
}

interface TemporaryPassword extends FindUserEmail {
  email: string;
}

interface ConnectSnsPassword {
  password: string;
}

interface ConnectSns {
  phoneNumber: string;
  provider: SnsProvider;
  providerId: string;
}

interface ConnectSnsResponse {
  email: string;
  provider: SnsProvider;
  token: string;
}

// 회원가임
type SignUpTermsModal = "servicePolicy" | "privacyPolicy" | "alliancePolicy";

// 사용 안하는중 지울예정
interface SignupStepValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  authNumber: string;
  address: AddressDto;
  birthday: string | Date | null;
  gender: GenderType;
  recommendCode?: string;
  agreement: {
    servicePolicy: boolean;
    privacyPolicy: boolean;
    receiveSms: boolean;
    receiveEmail: boolean;
    over14YearsOld: boolean;
    thirdPolicy?: boolean;
  };
  allianceInfo?: {
    alliance: "cb" | null;
    alliancePolicy: boolean;
  };
  provider?: string;
  providerId?: string;
  defaultPhoneNumber?: string;
  hasCheckedAuthNumber?: boolean;
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

type ResetPasswordStep = "request" | "verify" | "reset";
type FindEmailStep = "request" | "verify" | "verified";

export type {
  LoginFormValues,
  UserType,
  UserInfo,
  LoginUserInfo,
  SnsProvider,
  FindUserEmail,
  TemporaryPassword,
  ConnectSnsPassword,
  ConnectSns,
  SignUpTermsModal,
  ConnectSnsResponse,
  GenderType,
  SignupStepValues,
  RequestFindAccountCodeResponse,
  ResetPasswordRequest,
  VerifyFindAccountCodeRequest,
  ResetPasswordStep,
  VerifyFindAccountCodeResponse,
  FindEmailStep,
};
