import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import InviteFriends from "@/components/pages/mypage/inviteFriends/InviteFriends";
import { prefetchGetReferralRewardList } from "@/api/mypage/inviteFriends/queries/prefetchGetInviteRewardList";

export default async function InviteFriendsPage() {
  const queryClient = new QueryClient();
  await prefetchGetReferralRewardList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<div>친구 초대 적립금이 없습니다.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <InviteFriends />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
