"use client";
import Spinner from "@/components/common/spinner/Spinner";
import { useSnsLogin } from "@/api/auth/mutations/useSnsLogin";
import { useEffect } from "react";
import { SnSProvider } from "@/types";

interface LoginRedirectProps {
  searchParams: {
    provider: SnSProvider;
    code: string;
  };
}
const LoginRedirect = ({ searchParams }: LoginRedirectProps) => {
  const { provider, code } = searchParams;
  const { mutate: snsLogin } = useSnsLogin();

  useEffect(() => {
    if (code) {
      snsLogin({ provider, code });
    }
  }, [code, provider, snsLogin]);

  return <Spinner fullscreen />;
};

export default LoginRedirect;
