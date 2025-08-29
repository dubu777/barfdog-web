'use client';
import * as styles from './MainBanner.css';
import Image from "next/image";
import Link from "next/link";
import { useGetMyPageBanner } from "@/api/mypage/queries/useGetMypageBanner";

export default function MainBanner() {
  const { data: banner } = useGetMyPageBanner();
  const imageUrl = banner?.imageUrl?.mobile.replace('http://', 'https://');
  return (
    banner &&
      <div className={styles.myPageBanner}>
        <Link href={banner.mobileLinkUrl} className={styles.bannerLink}>
          <Image
            src={imageUrl}
            alt={banner.name}
            width={1200}
            height={35}
            className={styles.bannerImage}
            priority
          />
        </Link>
      </div>
  );
};