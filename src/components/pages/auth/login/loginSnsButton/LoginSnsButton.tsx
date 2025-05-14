import { useRouter } from "next/navigation";
import * as styles from "./LoginSnsButtons.css";
import Image from "next/image";
import { SnSProvider } from "@/types";
import { SNS_LOGIN_CONFIG } from "@/config/snsLoginProviderConfig";
import { useCallback } from "react";
import { setSnsCallbackUrl } from "@/utils/auth/snsCallbackUrl";

interface LoginSnsButtonProps {
  provider: SnSProvider;
  lastLoginActivity?: boolean;
  callbackUrl?: string;
  size?: 'sm' | 'md';
  borderRadius?: 'sm' | 'md';
  defer?: boolean;
  onDeferredLoginClick?: (fn: () => void) => void;
}

const LoginSnsButton = ({
  provider,
  lastLoginActivity,
  callbackUrl,
  size = 'md',
  borderRadius = 'md',
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
  }, [config, router]);

  const handleClick = () => {
    if (defer && onDeferredLoginClick) {
      // 마이페이지 SNS 연동 로그인 실행시 부모가 결정하도록 넘겨줌
      onDeferredLoginClick(handleLogin);
    } else {
       // 기본 즉시 실행
      handleLogin();
    }
  }

  return (
    <button
      onClick={handleClick}
      className={styles.loginButton({ provider, lastLoginActivity, size, borderRadius })}
    >
      {lastLoginActivity && (
        <span className={styles.lastLoginActivity}>최근로그인</span>
      )}
      <Image src={config.image} alt={config.alt} width={40} height={40} />
      <span>{config.loginText}</span>
    </button>
  );
};

export default LoginSnsButton;