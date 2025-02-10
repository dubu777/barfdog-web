import { useRef } from "react";
import { useRouter } from "next/navigation";
import * as styles from "./LoginSnsButtons.css";
import Image from "next/image";
import KakaoImage from '/public/images/icons/kakao.png';
import NaverImage from '/public/images/icons/naver.png';
import { SnSProvider } from "@/types";

interface LoginSnsButtonProps {
  provider: SnSProvider;
  lastLoginActivity?: boolean;
}

const LoginSnsButton = ({ provider, lastLoginActivity }: LoginSnsButtonProps) => {
  const router = useRouter();
  const naverRef = useRef<HTMLButtonElement>(null);

  const handleLogin = () => {
    const redirectUri = provider === 'naver'
      ? process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI
      : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const clientId = provider === "naver"
      ? process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
      : process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const authUrl = provider === 'naver'
      ? `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
      : `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    router.push(authUrl);
  }

  return (
    <>
    <button ref={naverRef} id='naverIdLogin' style={{ display: 'none' }} />
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