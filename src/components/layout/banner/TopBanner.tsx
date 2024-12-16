'use client';
import * as styles from './Banner.css';
import Image from "next/image";
import CloseButton from '/public/images/icons/close-white.png';
import { useMainStore } from "@/store/useMainStore";
import {useGetMainInfo} from "@/api/main/queries/useGetMainInfo";
import {MainTopBannerDto} from "@/types";
import DOMPurify from "dompurify";
import Link from "next/link";

const TopBanner = () => {
  const { isTopBannerVisible, closeTopBanner } = useMainStore();
  const { data: mainInfoData, isLoading, isError } = useGetMainInfo();
  const topBanner: MainTopBannerDto | undefined = mainInfoData?.topBannerDto; 

  if (isLoading || isError || !topBanner || !isTopBannerVisible) return null;

  const sanitizedHTML = topBanner?.name ? DOMPurify.sanitize(topBanner?.name) : '';
  return (
    <div
      className={styles.bannerContainer({ position: 'top' })}
      style={{
        backgroundColor: topBanner.backgroundColor,
        color: topBanner.fontColor,
      }}
    >
      <Link href={topBanner.pcLinkUrl} className={styles.banner}>
        <p dangerouslySetInnerHTML={{ __html: sanitizedHTML}} />
      </Link>
      <button onClick={closeTopBanner} className={styles.closeBtn}>
        <Image src={CloseButton} alt='close button' width={10} height={10} />
      </button>
    </div>
  );
};

export default TopBanner;