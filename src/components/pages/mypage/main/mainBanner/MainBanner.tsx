'use client';
import * as styles from './MainBanner.css';
import Image from "next/image";
import Link from "next/link";
import { useGetMyPageBanner } from "@/api/mypage/queries/useGetMypageBanner";
import useDeviceState from "@/hooks/useDeviceState";

const MainBanner = () => {
  const { data: banner } = useGetMyPageBanner();
  const { isMobileDevice } = useDeviceState();
  const imageUrl = banner?.imageUrl?.mobile.replace('http://', 'https://');
  console.log(banner)
  return (
    banner &&
      <div className={styles.myPageBanner}>
        <Link href={banner.mobileLinkUrl} className={styles.bannerLink}>
          <Image
            src={imageUrl}
            alt={banner.name}
            width={!isMobileDevice ? 600 : 400}
            height={35}
            className={styles.bannerImage}
            priority
          />
        </Link>
      </div>
  );
};

export default MainBanner;