'use client';
import * as styles from './Banner.css';
import Link from "next/link";
import Image from "next/image";
import CloseButton from '/public/images/icons/close-white.png';
import { useMainStore } from "@/store/useMainStore";
import {useGetMainInfo} from "@/api/main/queries/useGetMainInfo";
import {MainTopBannerDto} from "@/types";
import { useSanitizedHTML } from "@/hooks/useSanitizedHTML";

const TopBanner = () => {
  const { isTopBannerVisible, closeTopBanner } = useMainStore();
  const { data: mainInfoData, isLoading, isError } = useGetMainInfo();
  const topBanner: MainTopBannerDto | undefined = mainInfoData?.topBannerDto; 
  const sanitizedHTML = useSanitizedHTML(topBanner?.name || '')

  if (isLoading || isError || !topBanner || !isTopBannerVisible) return null;

  return (
    <div
      className={styles.bannerContainer({ position: 'top' })}
      style={{
        backgroundColor: topBanner.backgroundColor,
        color: topBanner.fontColor,
      }}
    >
      <Link href={topBanner.pcLinkUrl} className={styles.banner}>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </Link>
      <button onClick={closeTopBanner} className={styles.closeBtn}>
        <Image src={CloseButton} alt='close button' width={10} height={10} />
      </button>
    </div>
  );
};

export default TopBanner;