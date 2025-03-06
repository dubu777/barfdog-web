'use client';
import * as styles from './MainBanner.css';
import Image from "next/image";
import Link from "next/link";
import { useGetMyPageBanner } from "@/api/mypage/queries/useGetMypageBanner";

const MainBanner = () => {
  const { data: banner } = useGetMyPageBanner();
  return (
    banner &&
      <div className={styles.myPageBanner}>
        <Link href={banner.mobileLinkUrl} className={styles.bannerLink}>
          <Image
            src={banner.imageUrl.mobile}
            alt={banner.name}
            fill
            className={styles.bannerImage}
          />
        </Link>
      </div>
  );
};

export default MainBanner;