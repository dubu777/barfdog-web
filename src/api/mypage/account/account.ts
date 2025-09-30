import axiosInstance from "@/api/axiosInstance";
import { ApiResponse } from "@/types";
import { ChangePassword, RequestPhoneChangeAuthToken, SetPassword, UpdateUserInfo, UserInfo, VerifyPhoneChangeCode } from "@/types/mypage/account";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";
import { AxiosInstance } from "axios";

// 회원 정보 조회
const getUserInfo = async (
  instance: AxiosInstance = axiosInstance
): Promise<UserInfo | null> => {
  const { data } : { data: ApiResponse<UserInfo> } = await instance.get(`/api/v2/accounts/my-page/me`);
  return validateApiResponse(data, "회원 정보 조회에 실패했습니다.");
};

// 비밀번호 설정 확인
const verifyPassword = async () => {
  const { data }: { 
    data: ApiResponse<{ needToInitialize: boolean }> 
  } = await axiosInstance.get("/api/v2/accounts/my-page/password/initialize");
  const responseData = validateApiResponse(data, "유효하지 않은 정보입니다");
  return responseData.needToInitialize;
};

// 비밀번호 설정
const setPassword = async (body: SetPassword) => {
  const { data } = await axiosInstance.post("/api/v2/accounts/my-page/password/initialize", body);
  return validateApiResponse(data, "비밀번호 설정에 실패했습니다.");
};

// 비밀번호 변경
const changePassword = async (body: ChangePassword) => {
  const { data } = await axiosInstance.put("/api/v2/accounts/my-page/password", body);
  return validateApiResponse(data, "비밀번호 변경에 실패했습니다.");
};

// 회원 정보 수정
const updateUserInfo = async (body: UpdateUserInfo) => {
  const { data } = await axiosInstance.put("/api/v2/accounts/my-page", body);
  return validateApiResponse(data, "회원 정보 수정에 실패했습니다.");
};

// 회원 정보 수정 - 휴대폰번호 인증번호 발송
const requestPhoneChangeCode = async (body: {
  newPhoneNumber: string;
}) => {
  const { data } : { 
    data: ApiResponse<RequestPhoneChangeAuthToken> 
  } = await axiosInstance.post("/api/v2/accounts/my-page/phone/update/request-code", body);
  return validateApiResponse(data, "휴대폰번호 인증번호 발송에 실패했습니다.");
};

// 회원 정보 수정 - 휴대폰번호 인증번호 검증
const verifyPhoneChangeCode = async (body: VerifyPhoneChangeCode) => {
  const { data } = await axiosInstance.post("/api/v2/accounts/my-page/phone/update/verify-code", body);
  return validateApiResponse(data, "휴대폰번호 인증번호 검증에 실패했습니다.");
};

// SNS 연동 해제
const disconnectSns = async () => {
  const { data } = await axiosInstance.put("/api/v2/accounts/my-page/sns/disconnect");
  return validateApiResponse(data, "SNS 연동 해제에 실패했습니다.");
};

// 회원 탈퇴
const withdrawalAccount = async () => {
  const { data } = await axiosInstance.delete("/api/v2/accounts/my-page");
  return validateApiResponse(data, "회원 탈퇴에 실패했습니다.");
};

export {
  getUserInfo,
  verifyPassword,
  setPassword,
  changePassword,
  updateUserInfo,
  disconnectSns,
  withdrawalAccount,
  requestPhoneChangeCode,
  verifyPhoneChangeCode,
};
