import { PROVIDERS_LABEL } from "@/constants/auth";
import { LoginWithOAuthTokenResponse } from "@/types";
import { ReactNode } from "react";

/** 모달 확인 시 이동할 경로를 포함하는 구성 */
export type OAuthAlertConfig = {
  title: string;
  content: string | ReactNode;
  confirmText?: string;
  route: string;
};

export function buildOAuthAlertConfig(
  response: LoginWithOAuthTokenResponse,
  opts: { next: string } // 훅에서 넘겨줄 next
): OAuthAlertConfig | null {
  const result = response.data?.result;

  switch (result) {
    case "ALREADY_LINKED":
      return null;

    case "NEWLY_LINKED":
      return {
        title: "SNS 연동이 완료됐어요",
        content: "이제부터 연동된 SNS 계정으로 간편 로그인할 수 있어요",
        confirmText: "확인",
        route: opts.next, // 성공 계열은 next 로
      };

    case "NEW_ACCOUNT_AND_LINKED":
      return {
        title: "회원 가입이 완료됐어요! 🎉",
        content: "우리 아이의 일상이 더 건강해질 수 있도록 도와드릴게요.",
        confirmText: "확인",
        route: opts.next,
      };

    case "LINK_PROVIDER_CONFLICT": {
      const other = response.data?.otherSnsProvider;
      const label = other
        ? PROVIDERS_LABEL[other.toLowerCase()] ?? other
        : "다른 SNS";
      return {
        title: `이미 ${label} 연동되어 있어요`,
        content: `${label} 간편 로그인을 이용해 주세요`,
        confirmText: "확인",
        route: "/login", // Conflict 계열은 /login 으로
      };
    }

    case "LINK_EMAIL_CONFLICT": {
      const email = response.data?.conflictEmail;
      return {
        title: "이미 사용 중인 이메일이에요",
        content: `${email} 이메일로 가입된 계정이 있어 SNS 연동이 불가능합니다. 기존 계정으로 로그인해 주세요`,
        confirmText: "확인",
        route: "/login",
      };
    }

    default:
      return {
        title: "SNS 로그인 실패",
        content: "로그인에 실패했어요. 다시 시도해 주세요.",
        confirmText: "확인",
        route: "/login",
      };
  }
}
