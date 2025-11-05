'use client';
import { commonWrapper, imageWrapper } from "@/styles/common.css";
import { accountRecommendationCode } from "./MainInformation.css";
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
    <article className={commonWrapper({ 
      backgroundColors: 'gray50', 
      direction: 'col', 
      align: 'start',
    })}>
      <div className={commonWrapper({ 
        padding: 20, 
        direction: 'col', 
        align: 'start',
      })}>
        <RecommendationCode
          code={memberInfo?.myRecommendationCode ?? ""} 
          tailPosition='bottom' 
          className={accountRecommendationCode}
        />
        <div className={commonWrapper({ justify: 'start', gap: 12 })}>
          <Image
            src={representativePetImage ?? DefaultImage}
            alt='사용자 이미지'
            width={48}
            height={48}
            className={imageWrapper({ borderRadius: '50%', objectFit: 'cover', width: 48 })}
          />
          <Text type='title1'>{memberInfo?.name}</Text>
        </div>
      </div>
      <div className={commonWrapper({
        backgroundColors: 'gray0',
        direction: 'col',
        align: 'start',
        gap: 6,
        padding: 20,
        paddingTop: 18,
        paddingBottom: 12,
      })}>
        <div className={commonWrapper({ justify: 'between', align: 'start' })}>
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