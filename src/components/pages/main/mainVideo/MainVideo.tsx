'use client';

import * as styles from './MainVideo.css';
import Image from "next/image";
import LogoWhite from "/public/images/logo/logo-white.png";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import MainText from "@/components/pages/main/mainText/MainText";
import { useBannerStore } from "@/store/mainStore";

const MainVideo = () => {
  const { isTopBannerVisible } = useBannerStore();
  return (
    <article className={styles.mainVideoWrapper({ isTopBannerVisible: isTopBannerVisible })}>
      <video preload='none' muted autoPlay loop className={styles.mainVideo}>
        <source src='/videos/mainVideo.mp4' type='video/mp4'/>
      </video>
      <div style={{ marginBottom: '17px', zIndex: 100 }}>
        <MainText type='title' size='titleXl'>
          우리는 사료가 아닌 <br/> 음식을 만듭니다
        </MainText>
      </div>
      <MainText type='description' size='md' weight='normal'>
        보다 나은 견생을 위한 선택
      </MainText>
      <Image src={LogoWhite} alt='logo' width={97} height={16} style={{ zIndex: 100, marginTop: '4px' }} />
      <div className={styles.mainVideoButton}>
        <DefaultButton
          type="mainBorder"
          size="lg"
          borderRadius="lg"
          isBold={true}
          linkUrl={'/survey'}
        >
          설문하고 추천받기
        </DefaultButton>
      </div>
    </article>
  );
};

export default MainVideo;