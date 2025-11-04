"use client";
import Spinner from "@/components/ui/spinner/Spinner";
import { useEffect, useRef } from "react";
import { SnsProvider } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import { useRouter } from "next/navigation";
import { useOAuthCallbackLogin } from "@/api/auth/mutations/useOAuthCallbackLogin";

interface LoginRedirectProps {
  searchParams: {
    provider: SnsProvider;
    code: string;
    state?: string;
  };
}
export default function LoginRedirect({ searchParams }: LoginRedirectProps) {
  const { provider, code, state } = searchParams;
  const { mutate: socialLogin } = useOAuthCallbackLogin();
  const { addToast } = useToastStore();
  const router = useRouter();

  const ranRef = useRef(false); // StrictMode 중복 방지
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    if (!provider || !code) {
      addToast("잘못된 접근입니다.");
      router.replace("/login");
      return;
    }

    // state 검증(네이버 필수)
    const expected = sessionStorage.getItem(`oauth.state.${provider}`);
    if (provider === "naver" && (!state || state !== expected)) {
      addToast("유효하지 않은 요청입니다.(state 검증 실패)");
      router.replace("/login");
      return;
    }

    const nextPath = sessionStorage.getItem("oauth.next") ?? "/";

    socialLogin(
      { provider, code, state, next: nextPath },
      {
        onSettled: () => {
          sessionStorage.removeItem(`oauth.state.${provider}`);
          sessionStorage.removeItem("oauth.next");
        },
      }
    );
  }, [code, provider, socialLogin]);

  return <Spinner fullscreen />;
}
