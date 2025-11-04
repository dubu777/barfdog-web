'use client';
import * as styles from "./MainInformation.css";
import Link from "next/link";
import Image from "next/image";
import DefaultImage from "public/images/icons/default-profile.png";
import Text from "@/components/ui/text/Text";
import RecommendationCode from "@/components/pages/mypage/common/recommendationCode/RecommendationCode";
import UserRewardCard from "@/components/pages/mypage/main/mainInformation/userRewardCard/UserRewardCard";
import { useGetMyPageInfo } from "@/api/mypage/common/queries/useGetMypageInfo";
import { MEMBERSHIP_TIERS } from "@/constants/membership";

export default function MainInformation() {
  const { data } = useGetMyPageInfo();
  const memberInfo = data?.memberInfo;

  const userMembershipTier = MEMBERSHIP_TIERS[memberInfo?.grade ?? 'BRONZE'];
  const representativePetImage = data?.representativePetInfo?.displayThumbnailUrl?.url;

  if (!memberInfo) return null;

  return (
    <article className={styles.userInfoContainer}>
      <div className={styles.accountLinkBox}>
        <RecommendationCode
          code={memberInfo?.myRecommendationCode ?? ""} 
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
          <Text type='title1'>{memberInfo?.name}</Text>
        </div>
      </div>
      <div className={styles.membership}>
        <div className={styles.membershipInfoTop}>
          <Text type='headline1'>{userMembershipTier?.tier} 등급</Text>
          <Link href='/membership'>
            <Text type='headline4' color='gray300'>자세히 보기</Text>
          </Link>
        </div>
        {userMembershipTier?.description && 
          <Text type='caption' color='red'>{userMembershipTier?.description}</Text>
        }
      </div>
      <UserRewardCard
        couponCount={data?.couponCount ?? 0}
        rewardCount={memberInfo?.reward ?? 0}
      />
    </article>
  );
};