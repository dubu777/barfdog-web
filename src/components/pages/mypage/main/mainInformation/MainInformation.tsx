'use client';
import * as styles from "./MainInformation.css";
import { useEffect } from "react";
import Image from "next/image";
import UserImage from "/public/images/mypage/user-profile.svg";
import ArrowRightIcon from '/public/images/icons/chevron-right-blue.svg';
import { useGetMyPageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import { MyPageMemberDto, MyPageRepresentativeDogDto } from "@/types";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import Link from "next/link";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { getNextTierRequirements } from "@/utils/mypage/getNextTierRequirements";
import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";
import RecommendationCode from "@/components/pages/mypage/common/recommendationCode/RecommendationCode";
import UserRewardCard from "@/components/pages/mypage/main/mainInformation/userRewardCard/UserRewardCard";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

const MainInformation = () => {
  const { data: myPageData } = useGetMyPageInfo();
  const userData: MyPageMemberDto = myPageData?.mypageMemberDto;

  const representativeDogData: MyPageRepresentativeDogDto = myPageData?.mypageRepresentiveDogDto;
  const { setMypageUserInfo, setUserMembershipTier } = usePersistMypageStore();

  const userMembershipTier = MEMBERSHIP_TIERS_LIST.find(tier => tier.tierKR === userData.grade);
  const userImage = userData?.imageUrl;

  useEffect(() => {
    if (userData) {
      setMypageUserInfo(userData)
      if(userMembershipTier) {
        setUserMembershipTier(userMembershipTier);
      }
    }
  }, [userData, setMypageUserInfo]);

  const { additionalSubscription, additionalPurchase, nextTier } = getNextTierRequirements(userMembershipTier.tier, 2, 90000);

  return (
    <article className={styles.userInfoContainer}>
      <div className={styles.accountLinkBox}>
        <RecommendationCode code={userData.myRecommendationCode} tailPosition='bottom' className={styles.accountRecommendationCode} />
        <Link href='/mypage/account/user-info' className={styles.accountLink}>
          {userImage ?
            <Image
              src={userImage}
              alt='사용자 이미지'
              width={48}
              height={48}
              className={styles.accountImage}
            />
            : <SvgIcon src={UserImage} size={48} />
          }
          <DefaultText className={styles.userName} type='title1'>{userData.memberName}</DefaultText>
          <SvgIcon src={ArrowRightIcon} size={24} />
        </Link>
      </div>
      <div className={styles.membership}>
        <div className={styles.membershipInfo}>
          <div className={styles.membershipInfoTop}>
            <DefaultText type='headline1'>{userMembershipTier?.tier} 등급</DefaultText>
            <Link href='/membership'>
              <DefaultText type='headline4' color='gray300'>자세히 보기</DefaultText>
            </Link>
          </div>
          <DefaultText type='caption' color='red'>{userMembershipTier?.description}</DefaultText>
        </div>
        <DefaultText type='caption' color='gray500'>
          {additionalSubscription > 0 && `구독 ${additionalSubscription}회 추가 `}
          누적 혹은 {additionalPurchase > 0 && `${additionalPurchase.toLocaleString()}원 추가 구매시 `}
          <strong>{nextTier}</strong> 등급 달성!
        </DefaultText>
      </div>
      <UserRewardCard myPageData={myPageData} />
    </article>
  );
};

export default MainInformation;