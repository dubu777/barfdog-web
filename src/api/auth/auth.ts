import axios, { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import {
  TemporaryUserEmail,
  ConnectSns,
  SetPassword,
  ChangePassword,
  UserInfoFormValues,
  UserInfo,
  LoginUserInfo,
  SnSProvider,
  UserType,
  GetAuthNumber,
  ConnectSnsResponse,
  RequestPasswordResetCodeResponse,
  ResetPasswordRequest,
  VerifyPasswordResetCodeRequest,
} from "@/types";
import { SNS_LOGIN_CONFIG } from "@/config/snsLoginProviderConfig";
import { RequestResetCodeValues } from "@/utils/validation/auth/resetPassword";

const findUserEmail = async (
  name: string,
  phoneNumber: string
): Promise<TemporaryUserEmail> => {
  const { data } = await axiosInstance.get(
    `/api/email?name=${name}&phoneNumber=${phoneNumber}`
  );
  return data;
};

const requestPasswordResetCode = async (
  body: RequestResetCodeValues
): Promise<RequestPasswordResetCodeResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/public/account/password/reset/request-code",
    body
  );
  if (data.success) {
    return data.data;
  }
  throw new Error("유효하지 않은 정보입니다");
};

const verifyPasswordResetCode = async (
  body: VerifyPasswordResetCodeRequest
) => {
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
): Promise<SnSProvider | null> => {
  const { data } = await instance.get("/api/members/sns");
  return data?.provider || null;
};

const disconnectSns = async () => {
  return await axiosInstance.delete("/api/members/sns");
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

const withdrawalUser = async (body: { password: string }) => {
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

// 네이버 토큰 발급
const getAccessTokenByNaver = async (code: string) => {
  if (!code) throw new Error("인가 코드 없음");

  const { clientId, clientSecret, auth } = SNS_LOGIN_CONFIG.naver;

  const params = new URLSearchParams({
    grant_type: auth.grantType,
    client_id: clientId,
    client_secret: clientSecret,
    code,
    state: "barfdogNaverLogin",
  });

  const { data: tokenResponse } = await axios.post(
    `${auth.tokenUrl}?${params.toString()}`
  );
  if (!tokenResponse.access_token) throw new Error("네이버 토큰 발급 실패");
  return tokenResponse;
};

// 카카오톡 토큰 발급
export const getAccessTokenByKakao = async (code: string) => {
  if (!code) throw new Error("인가 코드 없음");

  const { clientId, clientSecret, redirectUri, auth } = SNS_LOGIN_CONFIG.kakao;

  const params = new URLSearchParams({
    grant_type: auth.grantType,
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  // clientSecret이 존재하면 추가 (옵션)
  if (clientSecret) {
    params.append("client_secret", clientSecret);
  }

  const url = `${auth.tokenUrl}?${params.toString()}`;
  const { data: tokenResponse } = await axios.post(url, {});
  if (!tokenResponse.access_token) throw new Error("카카오 토큰 발급 실패");

  return tokenResponse;
};

// 소셜 로그인
const snsLogin = async ({
  provider,
  code,
}: {
  provider: SnSProvider;
  code: string;
}): Promise<LoginUserInfo> => {
  console.log("loginWithProvider", provider, code);

  try {
    let body;
    if (provider === "naver") {
      const { access_token } = await getAccessTokenByNaver(code);

      body = {
        accessToken: access_token,
      };
    } else if (provider === "kakao") {
      const { access_token } = await getAccessTokenByKakao(code);

      console.log("카카오 토큰", access_token);
      body = {
        accessToken: access_token,
      };
    }

    const { data: loginResponse, headers } = await axiosInstance.post(
      `/api/login/${provider}`,
      body
    );
    console.log(`${provider} 소셜 로그인 response`, loginResponse);

    if (!loginResponse) {
      throw new Error("응답이 없습니다.");
    }

    let userType: UserType = "NON_MEMBER";
    let token: string | null = null;
    const resultCode = Number(loginResponse.resultcode);
    const message =
      CodeMessage[resultCode as keyof typeof CodeMessage] ||
      loginResponse.message;

    switch (resultCode) {
      case 251: // 비회원(첫 로그인)
        userType = "NON_MEMBER";
        break;
      case 252: // 기존 이메일 회원
        userType = "MEMBER";
        break;
      case 253: // 카카오 멤버
        userType = "MEMBER_WITH_SMS_KAKAO";
        token = provider === "kakao" ? headers.authorization : null;
        break;
      case 254: // 네이버 멤버
        userType = "MEMBER_WITH_SMS_NAVER";
        token = provider === "naver" ? headers.authorization : null;
        break;
      case 200:
        userType = "SUCCESS";
        token = headers.authorization;
        break;
      default:
        // 하단 에러 코드에 대한 default 처리 필요
        // throw new Error(`알 수 없는 응답 코드: ${resultCode}`);
        break;
    }

    return {
      provider,
      providerId: code,
      phoneNumber:
        provider === "kakao"
          ? loginResponse.kakao_account.phone_number
          : loginResponse.response.mobile,
      message,
      resultCode: loginResponse.resultcode,
      userType,
      token,
    };
  } catch (error) {
    console.error("SNS 로그인 오류", error);

    // Axios 에러 처리
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "로그인 요청 중 오류 발생"
      );
    }

    // 일반 오류 처리
    throw new Error(
      error instanceof Error ? error.message : "알 수 없는 오류 발생"
    );
  }
};

const CodeMessage: Record<number, string> = {
  101: "카카오 연결에 실패했습니다.",
  102: "이미 카카오로 연결된 계정입니다.",
  103: "존재하지 않는 계정입니다.",
  406: "회원의 나이가 14세 미만입니다.",
  24: "인증에 실패했습니다.",
  28: "OAuth 인증 헤더가 없습니다.",
  251: "회원가입이 필요합니다.",
  252: "SNS 연동이 필요합니다.",
  253: "카카오 간편로그인이 연동된 계정입니다. 카카오로 로그인해주세요.",
  254: "네이버 간편로그인이 연동된 계정입니다. 네이버로 로그인해주세요.",
  200: "간편 로그인에 성공했습니다.",
  500: "일시적인 서버 오류입니다. 관리자에게 문의해주세요.",
  403: "호출 권한이 없습니다.",
  404: "해당 데이터가 없습니다.",
} as const;

export {
  findUserEmail,
  login,
  getUserInfo,
  connectSns,
  getAccessTokenByNaver,
  snsLogin,
  setPassword,
  changePassword,
  getConnectedSns,
  disconnectSns,
  getAuthNumber,
  updateUserInfo,
  withdrawalUser,
  logout,
  requestPasswordResetCode,
  verifyPasswordResetCode,
  resetPassword,
};
