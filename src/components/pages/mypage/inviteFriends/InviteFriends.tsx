'use client';
import { commonWrapper } from "@/styles/common.css";
import RecommendInfo from "./recommendInfo/RecommendInfo";
import InviteRewardList from "./inviteRewardList/InviteRewardList";
import { useGetMyPageInfo } from "@/api/mypage/common/queries/useGetMypageInfo";
import { useGetReferralRewardList } from "@/api/mypage/inviteFriends/queries/useGetInviteRewardList";

export default function InviteFriends() {
  const { data: myPageInfoData } = useGetMyPageInfo();
  const memberInfo = myPageInfoData?.memberInfo;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetReferralRewardList();
  const referralRewardInfo = data?.pages?.[0]?.referralRewardInfo;
  const rewardList = data?.pages?.flatMap((page) => page.rewardList) ?? [];

  return (
    <section className={commonWrapper({ paddingTop: 40, paddingBottom: 40, gap: 40, direction: 'col' })}>
      <RecommendInfo 
        recommendedCode={referralRewardInfo?.recommend}
      />
      <InviteRewardList
        myRecommendationCode={memberInfo?.myRecommendationCode}
        memberName={memberInfo?.name}
        referralRewardInfo={referralRewardInfo}
        rewardList={rewardList}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </section>
  );
};