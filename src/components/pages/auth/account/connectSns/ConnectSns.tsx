/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useConnectSns } from "@/api/auth/mutations/useConnectSns";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import { useEffect } from "react";
import { setCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import {
  getSnsCallbackUrl,
  removeSnsCallbackUrl,
} from "@/utils/auth/snsCallbackUrl";
import Loader from "@/components/common/loader/Loader";

// interface ConnectSnsProps {
// }

// const ConnectSns = ({}: ConnectSnsProps) => {
const ConnectSns = () => {
  const router = useRouter();
  const { loginUserInfo } = useAuthStore.getState();
  const { mutate: connectSns } = useConnectSns();
  const { addToast } = useToastStore();
  const { snsCallbackUrl } = getSnsCallbackUrl();

  const sanitizePhoneNumber = (phone: string): string => {
    let sanitized = phone;
    // 카카오의 경우 "+82"로 시작하면 해당 부분을 제거하고, 앞에 '0'을 붙임
    if (sanitized.startsWith("+82")) {
      sanitized = sanitized.replace(/^\+82\s?/, "");
      if (!sanitized.startsWith("0")) {
        sanitized = "0" + sanitized;
      }
    }
    // 하이픈, 공백 등 숫자가 아닌 모든 문자를 제거
    sanitized = sanitized.replace(/\D/g, "");
    return sanitized;
  };

  useEffect(() => {
    // userInfo와 loginUserInfo가 준비되어 있어야 함
    if (!loginUserInfo) return;

    // 전화번호 변환 처리
    const sanitizedPhone = sanitizePhoneNumber(loginUserInfo.phoneNumber);

    // 서버에 보낼 body 구성
    const body = {
      phoneNumber: sanitizedPhone,
      provider: loginUserInfo.provider,
      providerId: loginUserInfo.providerId,
    };
    console.log("connect sns request body", body);
    // SNS 연동 API 실행
    connectSns(body, {
      onSuccess: (response) => {
        console.log("SNS 연동 성공 응답:", response);
        setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, response.token);
        addToast("SNS 연동이 완료되었습니다!", "above-button");

        // 마이페이지 sns 연동 리다이렉트를 위한 callbackUrl 적용 및 초기화
        if (snsCallbackUrl) {
          router.push(snsCallbackUrl || "/");
          removeSnsCallbackUrl();
        }
      },
      onError: (error) => {
        console.error("SNS 연동 실패:", error);
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data?.errors?.[0];
          if (errorData) {
            addToast(
              errorData.defaultMessage || "SNS 연동에 실패했습니다.",
              "above-button"
            );
          } else {
            addToast("SNS 연동에 실패했습니다.", "above-button");
          }
        }
      },
    });
  }, [loginUserInfo, connectSns]);
  return <Loader fullscreen />;
};

export default ConnectSns;
