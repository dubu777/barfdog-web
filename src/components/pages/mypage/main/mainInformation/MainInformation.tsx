'use client';
import * as styles from "./MainInformation.css";
import { useEffect } from "react";
import Image from "next/image";
import NoImage from "/public/images/icons/noImage.png";
import ArrowRightIcon from '/public/images/icons/chevron-right-blue.svg';
import { useGetMyPageInfo } from "@/api/mypage/queries/useGetMypageInfo";
import { MyPageMemberDto, MyPageRepresentativeDogDto } from "@/types";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import Link from "next/link";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { getNextTierMessage } from "@/utils/mypage/getNextTierMessage";
import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";
import RecommendationCode from "@/components/pages/mypage/layout/recommendationCode/RecommendationCode";
import UserRewardCard from "@/components/pages/mypage/main/mainInformation/userRewardCard/UserRewardCard";

const MainInformation = () => {
  const { data: myPageData } = useGetMyPageInfo();
  const userData: MyPageMemberDto = myPageData?.mypageMemberDto;

  const representativeDogData: MyPageRepresentativeDogDto = myPageData?.mypageRepresentiveDogDto;
  const { setMypageUserInfo, setUserMembershipTier } = usePersistMypageStore();

  const userMembershipTier = MEMBERSHIP_TIERS_LIST.find(tier => tier.tierKR === userData.grade);

  useEffect(() => {
    if (userData) {
      setMypageUserInfo(userData)
      if(userMembershipTier) {
        setUserMembershipTier(userMembershipTier);
      }
    }
  }, [userData, setMypageUserInfo]);

  return (
    <article className={styles.userInfoContainer}>
      <div className={styles.accountLinkBox}>
        <RecommendationCode code={userData.myRecommendationCode} tailPosition='bottom' className={styles.accountRecommendationCode} />
        <Link href='/mypage/account/user-info' className={styles.accountLink}>
          <Image
            src={representativeDogData?.thumbnailUrl || NoImage}
            alt='사용자 이미지'
            width={48}
            height={48}
            className={styles.accountImage}
          />
          <DefaultText className={styles.userName} type='title1'>{userData.memberName}</DefaultText>
          <ArrowRightIcon />
        </Link>
      </div>
      <div className={styles.membership}>
        <div className={styles.membershipInfo}>
          <div className={styles.membershipInfoTop}>
            <DefaultText type='headline1'>{userMembershipTier?.tier} 등급</DefaultText>
            <Link href='/membership'>
              <DefaultText type='body3' color='gray300'>자세히 보기</DefaultText>
            </Link>
          </div>
          <DefaultText type='caption' color='red'>{userMembershipTier?.description}</DefaultText>
        </div>
        <DefaultText type='caption' color='gray500'>
          {getNextTierMessage('SILVER', 2, 90000)}
        </DefaultText>
      </div>
      <UserRewardCard myPageData={myPageData} />
    </article>
  );
};

export default MainInformation;