import { useEffect, useState } from "react";
import * as styles from './Banner.css';
import { themeVars } from "@/styles/theme.css";
import Image from "next/image";
import CloseButton from '/public/images/icons/close-white.png';
import { useMainStore } from "@/store/useMainStore";
import { deadlineBannerTimestamp } from "@/utils/deadlineBannerTimestamp";
import { useGetMainDeadlineBanner } from "@/api/main/queries/useGetMainBanner";

const BottomBanner = () => {
  const { data: deadlineBanner } = useGetMainDeadlineBanner();
  const { isBottomBannerVisible, closeBottomBanner } = useMainStore();
  const [timestamp, setTimestamp] = useState<string | null | undefined>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(deadlineBannerTimestamp(deadlineBanner))
    }, 100)
    return () => clearInterval(interval)
  }, [deadlineBanner]);

  return (
    isBottomBannerVisible &&
      <div className={styles.bannerContainer({ position: 'bottom' })}>
        <p className={styles.bottomBanner}>
          <span style={{ color: themeVars.fontColors.yellow }}>AI 추천 맞춤 식단 정기 구독</span>
          <span className={styles.bannerTimestamp}>
            {timestamp !== null && timestamp}
          </span>
          <span>
            이후 주문 마감!
          </span>
        </p>
        <button onClick={closeBottomBanner} className={styles.closeBtn}>
          <Image src={CloseButton} alt='close button' width={10} height={10} />
        </button>
      </div>
  );
};

export default BottomBanner;