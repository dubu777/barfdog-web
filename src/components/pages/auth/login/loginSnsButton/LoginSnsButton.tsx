import { useRouter } from "next/navigation";
import Image from "next/image";
import { SnSProvider } from "@/types";
import { SNS_LOGIN_CONFIG } from "@/config/snsLoginProviderConfig";
import { useCallback } from "react";
import { setSnsCallbackUrl } from "@/utils/auth/snsCallbackUrl";
import Button from "@/components/common/button/Button";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface LoginSnsButtonProps {
  provider: SnSProvider;
  lastLoginActivity?: boolean;
  callbackUrl?: string;
  size?: "sm" | "md";
  borderRadius?: "sm" | "md";
  defer?: boolean;
  onDeferredLoginClick?: (fn: () => void) => void;
}

const LoginSnsButton = ({
  provider,
  callbackUrl,
  defer = false,
  onDeferredLoginClick,
}: LoginSnsButtonProps) => {
  const router = useRouter();

  const config = SNS_LOGIN_CONFIG[provider];

  const handleLogin = useCallback(() => {
    if (callbackUrl) {
      setSnsCallbackUrl(callbackUrl);
    }
    const { clientId, redirectUri, auth } = config;
    const params = new URLSearchParams({
      response_type: auth.responseType,
      client_id: clientId,
      redirect_uri: redirectUri,
    });
    const url = `${auth.codeUrl}?${params.toString()}`;
    router.push(url);
  }, [config, router, callbackUrl]);

  const handleClick = () => {
    if (defer && onDeferredLoginClick) {
      // 마이페이지 SNS 연동 로그인 실행시 부모가 결정하도록 넘겨줌
      onDeferredLoginClick(handleLogin);
    } else {
      // 기본 즉시 실행
      handleLogin();
    }
  };

  return (
    <>
      <SvgIcon src={config.icon} size={52} onClick={handleClick} />
    </>
  );
};

export default LoginSnsButton;
