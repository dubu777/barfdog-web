import { useRouter } from "next/navigation";
import * as styles from "./LoginSnsButtons.css";
import Image from "next/image";
import { SnSProvider } from "@/types";
import { SNS_LOGIN_CONFIG } from "@/config/snsLoginProviderConfig";
import { useCallback } from "react";

interface LoginSnsButtonProps {
  provider: SnSProvider;
  lastLoginActivity?: boolean;
}


const LoginSnsButton = ({ provider, lastLoginActivity }: LoginSnsButtonProps) => {
  const router = useRouter();

  const config = SNS_LOGIN_CONFIG[provider];

  const handleLogin = useCallback(() => {
    const { clientId, redirectUri, auth } = config;
    const params = new URLSearchParams({
      response_type: auth.responseType,
      client_id: clientId,
      redirect_uri: redirectUri,
    });
    const url = `${auth.codeUrl}?${params.toString()}`;
    router.push(url);
  }, [config, router]);

  return (
    <button
      onClick={handleLogin}
      className={styles.loginButton({ provider, lastLoginActivity })}
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