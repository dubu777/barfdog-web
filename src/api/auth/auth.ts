import axios, { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import {
  ConnectSns,
  SetPassword,
  ChangePassword,
  UserInfoFormValues,
  UserInfo,
  LoginUserInfo,
  SnsProvider,
  UserType,
  GetAuthNumber,
  ConnectSnsResponse,
  RequestFindAccountCodeResponse,
  ResetPasswordRequest,
  VerifyFindAccountCodeRequest,
  VerifyFindAccountCodeResponse,
} from "@/types";
import { OAUTH_CLIENT_CONFIG } from "@/config/oauthClient";
import { RequestResetCodeValues } from "@/utils/validation/auth/resetPassword";
import { FindEmailValues } from "@/utils/validation/auth/findEmail";

const requestFindEmailCode = async (
  body: FindEmailValues
): Promise<RequestFindAccountCodeResponse> => {
  const { data } = await axiosInstance.post(
    `/api/v2/public/account/id/lookup/request-code`,
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
    "/api/v2/public/account/id/lookup",
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
    "/api/v2/public/account/password/reset/request-code",
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("유효하지 않은 정보입니다");
};

const verifyPasswordResetCode = async (body: VerifyFindAccountCodeRequest) => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/account/password/reset/verify-code",
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("유효하지 않은 정보입니다");
};

const resetPassword = async (body: ResetPasswordRequest) => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/account/password/reset",
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

const getConnectedSns = async (
  instance: AxiosInstance = axiosInstance
): Promise<SnsProvider | null> => {
  const { data } = await instance.get("/api/members/sns");
  return data?.provider || null;
};

const disconnectSns = async () => {
  return await axiosInstance.delete("/api/members/sns");
};

const verifyPassword = async () => {
  const { data } = await axiosInstance.get("/api/members/sns/password");
  if (data) {
    return data.needToSetPassword;
  }
  throw new Error("유효하지 않은 정보입니다");
};

const setPassword = async (body: SetPassword) => {
  return await axiosInstance.post("/api/members/sns/password", body);
};

const changePassword = async (body: ChangePassword) => {
  return await axiosInstance.put("/api/members/password", body);
};

const getAuthNumber = async (body: {
  phoneNumber: string;
}): Promise<GetAuthNumber> => {
  const { data } = await axiosInstance.post("/api/join/phoneAuth", body);
  return data;
};

const getUserInfo = async (
  instance: AxiosInstance = axiosInstance
): Promise<UserInfo | null> => {
  try {
    const { data } = await instance.get(`/api/members`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updateUserInfo = async (body: UserInfoFormValues) => {
  return await axiosInstance.put("/api/members", body);
};

const withdrawalAccount = async (body: { password: string }) => {
  return await axiosInstance.delete("/api/members", {
    data: body,
  });
};

const login = async (formData: { email: string; password: string }) => {
  const response = await axiosInstance.post("/api/login", formData);
  console.log("login response", response);

  return response;
};

const logout = async () => {
  const response = await axiosInstance.get("/api/logout");

  return response;
};

// Next JS 서버 - OAuth 토큰 요청
export async function exchangeProviderToken(
  provider: SnsProvider,
  code: string,
  state?: string
) {
  const baseUrl = window.location.origin;
  const { data } = await axios.post(`${baseUrl}/api/oauth/${provider}/token`, {
    code,
    state,
  });

  if (!data?.access_token) throw new Error("토큰 교환 실패");
  return data as { access_token: string };
}

export async function loginWithAccessToken(
  provider: SnsProvider,
  accessToken: string
) {
  const res = await axiosInstance.post(`/api/login/${provider}`, {
    accessToken,
  });
  return {
    body: res.data,
    headers: res.headers as Record<string, string | undefined>,
  };
}

export function deriveUserType(code?: number): UserType {
  switch (code) {
    case 251:
      return "NON_MEMBER";
    case 252:
      return "MEMBER";
    case 253:
      return "MEMBER_WITH_SMS_KAKAO";
    case 254:
      return "MEMBER_WITH_SMS_NAVER";
    case 200:
      return "SUCCESS";
    default:
      return "NON_MEMBER";
  }
}

async function oauthCallbackLogin(
  provider: SnsProvider,
  code: string,
  state?: string
): Promise<LoginUserInfo & { userType: UserType }> {
  const { access_token } = await exchangeProviderToken(provider, code, state);
  const { body, headers } = await loginWithAccessToken(provider, access_token);

  const resultCode = Number(body.resultcode);
  const userType = deriveUserType(
    Number.isNaN(resultCode) ? undefined : resultCode
  );

  const tokenFromHeader =
    (headers?.authorization as string | undefined) ?? null;
  const tokenFromBody = (body?.token as string | undefined) ?? null;
  const token = tokenFromHeader || tokenFromBody || null;

  return {
    provider,
    providerId: code,
    phoneNumber:
      provider === "kakao"
        ? body?.kakao_account?.phone_number
        : body?.response?.mobile,
    message: body?.message,
    resultCode: body?.resultcode,
    userType,
    token,
  };
}

export {
  requestFindEmailCode,
  login,
  getUserInfo,
  connectSns,
  setPassword,
  changePassword,
  getConnectedSns,
  disconnectSns,
  getAuthNumber,
  updateUserInfo,
  withdrawalAccount,
  logout,
  requestPasswordResetCode,
  verifyPasswordResetCode,
  resetPassword,
  verifyFindEmailCode,
  verifyPassword,
  oauthCallbackLogin,
};
