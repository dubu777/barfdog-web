'use client';
import * as styles from "./MainInformation.css";
import Link from "next/link";
import Image from "next/image";
import DefaultImage from "public/images/icons/default-profile.png";
import DefaultText from "@/components/common/defaultText/DefaultText";
import RecommendationCode from "@/components/pages/mypage/common/recommendationCode/RecommendationCode";
import UserRewardCard from "@/components/pages/mypage/main/mainInformation/userRewardCard/UserRewardCard";
import { useGetMyPageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import { MyPageMemberDto } from "@/types";
import { MEMBERSHIP_TIERS, MEMBERSHIP_TIERS_KR } from "@/constants/membership";

export default function MainInformation() {
  const { data } = useGetMyPageInfo();
  const userData = data?.mypageMemberDto;

  const userMembershipTier = MEMBERSHIP_TIERS[MEMBERSHIP_TIERS_KR[userData?.grade ?? "브론즈"]];
  const representativePetImage = data?.mypageRepresentiveDogDto?.thumbnailUrl;

  return (
    <article className={styles.userInfoContainer}>
      <div className={styles.accountLinkBox}>
        <RecommendationCode
          code={userData?.myRecommendationCode ?? ""} 
          tailPosition='bottom' 
          className={styles.accountRecommendationCode}
        />
        <div className={styles.accountLink}>
          <Image
            src={representativePetImage ?? DefaultImage}
            alt='사용자 이미지'
            width={48}
            height={48}
            className={styles.accountImage}
          />
          <DefaultText type='title1'>{userData?.memberName}</DefaultText>
        </div>
      </div>
      <div className={styles.membership}>
        <div className={styles.membershipInfoTop}>
          <DefaultText type='headline1'>{userMembershipTier?.tier} 등급</DefaultText>
          <Link href='/membership'>
            <DefaultText type='headline4' color='gray300'>자세히 보기</DefaultText>
          </Link>
        </div>
        <DefaultText type='caption' color='red'>{userMembershipTier?.description}</DefaultText>
      </div>
      <UserRewardCard
        couponCount={data?.couponCount ?? 0}
        reviewCount={3}
        rewardCount={userData?.reward ?? 0}
      />
    </article>
  );
};