'use client';

import React from 'react';
import * as styles from './main.css';
import Link from "next/link";
import Image from "next/image";
import LogoWhite from "/public/images/logo/logo-white.png";
import { useBannerStore } from "@/store/mainStore";

const MainVideo = () => {
  const { isTopBannerVisible } = useBannerStore();
  return (
    <article className={styles.mainVideoWrapper({ isTopBannerVisible: isTopBannerVisible })}>
      <video preload='none' muted autoPlay loop className={styles.mainVideo}>
        <source src='/videos/mainVideo.mp4' type='video/mp4'/>
      </video>
      <h2
        className={styles.mainTitle({ size: 'titleXl' })}
        style={{ marginBottom: '17px' }}
      >
        우리는 사료가 아닌 <br/> 음식을 만듭니다
      </h2>
      <h3 className={styles.mainTitle({ size: 'md', weight: 'normal' })}>
        보다 나은 견생을 위한 선택
      </h3>
      <Image src={LogoWhite} alt='logo' width={97} height={16} style={{ zIndex: 100, marginTop: '4px' }} />
      <Link
        href="/survey"
        className={styles.mainLink({ type: 'button' })}
        style={{ marginTop: '96px' }}
      >
        설문하고 추천받기
      </Link>
    </article>
  );
};

export default MainVideo;