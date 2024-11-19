'use client';

import * as styles from './Banner.css';
import Image from "next/image";
import CloseButton from '/public/images/icons/close-white.png';
import { useMainStore } from "@/store/useMainStore";

const TopBanner = () => {
  const { isTopBannerVisible, closeTopBanner } = useMainStore();
  return (
    isTopBannerVisible &&
      <div className={styles.bannerContainer({ position: 'top' })}>
        <p><b>국내 최초</b> 반려견 <b>1:1</b> 맞춤 생식 정기배송 서비스, 바프독!</p>
        <button onClick={closeTopBanner} className={styles.closeBtn}>
          <Image src={CloseButton} alt='close button' width={10} height={10} />
        </button>
      </div>
  );
};

export default TopBanner;