import { useRouter } from "next/navigation";
import * as styles from "./LoginSnsButtons.css";
import Image, { StaticImageData } from "next/image";
import KakaoImage from '/public/images/icons/kakao.png';
import NaverImage from '/public/images/icons/naver.png';
import { SnSProvider } from "@/types";
import { SNS_PROVIDER_CONFIG } from "@/config/snsLoginProviderConfig";
import { useCallback } from "react";

interface LoginSnsButtonProps {
  provider: SnSProvider;
  lastLoginActivity?: boolean;
}


const LoginSnsButton = ({ provider, lastLoginActivity }: LoginSnsButtonProps) => {
  const router = useRouter();
  const config = SNS_PROVIDER_CONFIG[provider];

  const handleLogin = useCallback(() => {
    const { clientId, redirectUri, authUrl } = config;
    const url = `${authUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    router.push(url);
  }, [config, router]);

  return (
    <>
    <button onClick={handleLogin} className={styles.loginButton({ provider: provider, lastLoginActivity: lastLoginActivity })}>
      {lastLoginActivity &&
        <span className={styles.lastLoginActivity}>최근로그인</span>
      }
      <Image
        src={provider === 'kakao' ? KakaoImage : NaverImage}
        alt={`${provider === 'kakao' ? '카카오' : '네이버'} 이미지`}
        width={40}
        height={40}
      />
      <span>
        {provider === 'kakao' ? '카카오' : '네이버'}로 1초만에 로그인
      </span>
    </button>
    </>
  );
};

export default LoginSnsButton;