'use client';
import { commonWrapper } from "@/styles/common.css";
import RecommendInfo from "./recommendInfo/RecommendInfo";
import InviteRewardList from "./inviteRewardList/InviteRewardList";
import { useGetMyPageInfo } from "@/api/mypage/common/queries/useGetMypageInfo";
import { useGetInviteRewardList } from "@/api/mypage/inviteFriends/queries/useGetInviteRewardList";

export default function InviteFriends() {
  const { data: userInfoData } = useGetMyPageInfo();
  const userData = userInfoData?.mypageMemberDto;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInviteRewardList();
  const rewardListData = data?.pages?.[0];

  return (
    <section className={commonWrapper({ paddingTop: 40, paddingBottom: 40, gap: 40, direction: 'col' })}>
      <RecommendInfo 
        recommendedCode={rewardListData?.recommend}
      />
      <InviteRewardList
        myRecommendationCode={userData?.myRecommendationCode}
        memberName={userData?.memberName}
        rewardListData={rewardListData}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </section>
  );
};