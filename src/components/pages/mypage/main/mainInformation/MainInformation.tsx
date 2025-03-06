'use client';
import * as styles from "./MainInformation.css";
import { useEffect } from "react";
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import ArrowRight from "/public/images/icons/chevron-right.svg";
import { useGetMyPageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import { MenuLink, MyPageMemberDto, MyPageRepresentativeDogDto } from "@/types";
import { useMyPageStore } from "@/store/useMypageStore";
import Link from "next/link";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { getNextTierMessage } from "@/utils/mypage/getNextTierMessage";
import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";

interface MenuListType extends MenuLink {
  key: 'review' | 'coupon' | 'reward';
}

const MENU_LIST: MenuListType[] = [
  { key: 'review', label: '나의 리뷰', url: '/mypage/review' },
  { key: 'coupon', label: '쿠폰', url: '/mypage/coupon' },
  { key: 'reward', label: '적립금', url: '/mypage/reward' },
]

const MainInformation = () => {
  const { data: myPageData } = useGetMyPageInfo();

  const userData: MyPageMemberDto = myPageData?.mypageMemberDto;
  const representativeDogData: MyPageRepresentativeDogDto = myPageData?.mypageRepresentiveDogDto;
  const { setMypageUserInfo } = useMyPageStore();

  const userMembershipTier = MEMBERSHIP_TIERS_LIST.find(tier => tier.tierKR === userData.grade);

  useEffect(() => {
    if (userData) {
      setMypageUserInfo(userData)
    }
  }, [userData, setMypageUserInfo]);

  const valueMap: Record<MenuLink['key'], string | number> = {
    review: 3,
    coupon: myPageData.couponCount || 0,
    reward: `${userData.reward.toLocaleString() || 0} P`,
  };

  return (
    <article className={styles.userInfoContainer}>
      <Link href='/mypage/account/user-info' className={styles.accountLink}>
        <Image
          src={representativeDogData?.thumbnailUrl || NoImage}
          alt='사용자 이미지'
          width={48}
          height={48}
          className={styles.accountImage}
        />
        <DefaultText className={styles.userName} type='title1'>{userData.memberName}</DefaultText>
        <ArrowRight />
      </Link>
      <div className={styles.membership}>
        <div className={styles.membershipInfo}>
          <div>
            <DefaultText type='headline1'>{userMembershipTier?.tier} 등급</DefaultText>
            <DefaultText type='caption' color='red'>{userMembershipTier?.description}</DefaultText>
          </div>
          <Link href='/membership'>
            <DefaultText type='body3' color='gray300'>자세히 보기</DefaultText>
          </Link>
        </div>
        <DefaultText type='caption' color='gray500'>
          {getNextTierMessage('SILVER', 2, 90000)}
        </DefaultText>
      </div>
      <div className={styles.userReward}>
        {MENU_LIST.map(({ key, label, url }) => (
          <Link key={key} href={url ?? '/mypage'} className={styles.rewardItem}>
            <DefaultText type='caption' color='gray500'>{label}</DefaultText>
            <DefaultText type='label1'>{valueMap[key]}</DefaultText>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default MainInformation;