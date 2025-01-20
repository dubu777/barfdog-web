import * as styles from "./LoginSnsButtons.css";
import Image from "next/image";
import KakaoImage from '/public/images/icons/kakao.png';
import NaverImage from '/public/images/icons/naver.png';

interface LoginSnsButtonProps {
  type: 'kakao' | 'naver';
  lastLoginActivity?: boolean;
}

const LoginSnsButton = ({ type, lastLoginActivity }: LoginSnsButtonProps) => {
  return (
    <button className={styles.loginButton({ type: type, lastLoginActivity: lastLoginActivity })}>
      {lastLoginActivity &&
        <span className={styles.lastLoginActivity}>최근로그인</span>
      }
      <Image
        src={type === 'kakao' ? KakaoImage : NaverImage}
        alt={`${type === 'kakao' ? '카카오' : '네이버'} 이미지`}
        width={40}
        height={40}
      />
      <span>
        {type === 'kakao' ? '카카오' : '네이버'}로 1초만에 로그인
      </span>
    </button>
  );
};

export default LoginSnsButton;