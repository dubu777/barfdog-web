import React from 'react';
import * as styles from './main.css';
import LogoWhite from "/public/images/logo/logo-white.png";
import Link from "next/link";
import Image from "next/image";

const MainSection1 = () => {
  return (
    <article className={styles.mainSection1}>
      <h2
        className={styles.mainTitle({ size: 'size25' })}
        style={{ marginBottom: '17px' }}
      >
        우리는 사료가 아닌 <br/> 음식을 만듭니다
      </h2>
      <h3 className={styles.mainTitle({ size: 'size16' })}>
        보다 나은 견생을 위한 선택
      </h3>
      <Image src={LogoWhite} alt='logo' width={97} height={16} />
      <Link
        href="/survey"
        className={styles.mainLink({ type: 'button' })}
        style={{ marginTop: '111px' }}
      >
        설문하고 추천받기
      </Link>
    </article>
  );
};

export default MainSection1;