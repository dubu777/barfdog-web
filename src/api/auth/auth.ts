import axios from "axios";
import axiosInstance from "@/api/axiosInstance";
import {
  ConnectSns,
  SnsProvider,
  ConnectSnsResponse,
  RequestFindAccountCodeResponse,
  ResetPasswordRequest,
  VerifyFindAccountCodeRequest,
  VerifyFindAccountCodeResponse,
  OAuthLoginResponse,
  SignupRequest,
} from "@/types";
import { RequestResetCodeValues } from "@/utils/validation/auth/resetPassword";
import { FindEmailValues } from "@/utils/validation/auth/findEmail";

const requestFindEmailCode = async (
  body: FindEmailValues
): Promise<RequestFindAccountCodeResponse> => {
  const { data } = await axiosInstance.post(
    `/api/v2/public/accounts/id/lookup/request-code`,
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("유효하지 않은 정보입니다");
};

const verifyFindEmailCode = async (
  body: VerifyFindAccountCodeRequest
): Promise<VerifyFindAccountCodeResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/accounts/id/lookup",
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("유효하지 않은 정보입니다");
};

const requestPasswordResetCode = async (
  body: RequestResetCodeValues
): Promise<RequestFindAccountCodeResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/accounts/password/reset/request-code",
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("유효하지 않은 정보입니다");
};

const verifyPasswordResetCode = async (body: VerifyFindAccountCodeRequest) => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/accounts/password/reset/verify-code",
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("유효하지 않은 정보입니다");
};

const resetPassword = async (body: ResetPasswordRequest) => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/accounts/password/reset",
    body
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "유효하지 않은 정보입니다";
  throw new Error(message);
};

// body {providerId, provider, phone}
const connectSns = async (body: ConnectSns): Promise<ConnectSnsResponse> => {
  const { data } = await axiosInstance.post(`/api/connectSns`, body);
  return data;
};

// 1) OAuth 토큰 요청 - Next 서버
const exchangeProviderToken = async (
  provider: SnsProvider,
  code: string,
  state?: string
) => {
  const baseUrl = window.location.origin;
  const { data } = await axios.post(`${baseUrl}/api/oauth/${provider}/token`, {
    code,
    state,
  });

  if (!data?.access_token) throw new Error("토큰 교환 실패");
  return data as { access_token: string };
};

// 2) OAuth 토큰 전달하여 인증 요청 - Java 서버
const loginWithOAuthToken = async (
  provider: SnsProvider,
  accessToken: string
) => {
  const res = await axiosInstance.post(`/api/login/${provider}`, {
    accessToken,
  });

  return {
    response: res.data,
    headers: res.headers as Record<string, string | undefined>,
  };
};

/**
 * 3) exchangeProviderToken로 OAuth AccessToken 받아와서
 *    loginWithOAuthToken로 전달 하여 로그인
 * */
const oauthCallbackLogin = async (
  provider: SnsProvider,
  code: string,
  state?: string
): Promise<OAuthLoginResponse> => {
  const { access_token } = await exchangeProviderToken(provider, code, state);
  const { response, headers } = await loginWithOAuthToken(
    provider,
    access_token
  );

  const tokenFromHeader =
    (headers?.authorization as string | undefined) ?? null;
  const token = tokenFromHeader || null;

  return {
    provider,
    token,
    response,
  };
};

const login = async (formData: { email: string; password: string }) => {
  const response = await axiosInstance.post("/api/login", formData);
  return response;
};

const logout = async () => {
  const response = await axiosInstance.get("/api/logout");

  return response;
};

const signup = async (body: SignupRequest) => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/accounts/signup ",
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("회원 가입 실패");
};

const checkDuplicateEmail = async (email: string) => {
  const { data } = await axiosInstance.get(
    `/api/v2/public/accounts/email/exists?email=${email}`
  );

  return data;
};

const requestPhoneVerificationCode = async (
  phoneNumber: string
): Promise<RequestFindAccountCodeResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/accounts/signup/request-code",
    { phoneNumber }
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("유효하지 않은 정보입니다");
};

const verifyPhoneCode = async (
  body: VerifyFindAccountCodeRequest
): Promise<VerifyFindAccountCodeResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/accounts/signup/verify-code",
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("유효하지 않은 정보입니다");
};

export {
  requestFindEmailCode,
  login,
  connectSns,
  logout,
  requestPasswordResetCode,
  verifyPasswordResetCode,
  resetPassword,
  verifyFindEmailCode,
  oauthCallbackLogin,
  signup,
  checkDuplicateEmail,
  requestPhoneVerificationCode,
  verifyPhoneCode,
};
