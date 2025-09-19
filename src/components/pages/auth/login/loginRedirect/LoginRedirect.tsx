"use client";
import Spinner from "@/components/common/spinner/Spinner";
import { useSnsLogin } from "@/api/auth/mutations/useSnsLogin";
import { useEffect, useRef } from "react";
import { SnsProvider } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import { useRouter } from "next/navigation";

interface LoginRedirectProps {
  searchParams: {
    provider: SnsProvider;
    code: string;
  };
}
const LoginRedirect = ({ searchParams }: LoginRedirectProps) => {
  const { provider, code } = searchParams;
  const { mutate: snsLogin } = useSnsLogin();
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

    snsLogin({ provider, code });
  }, [code, provider, snsLogin]);

  return <Spinner fullscreen />;
};

export default LoginRedirect;
