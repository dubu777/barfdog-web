import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { prefetchGetInviteRewardList } from "@/api/mypage/queries/useGetInviteRewardList";
import InviteFriends from "@/components/pages/mypage/inviteFriends/InviteFriends";

export default async function InviteFriendsPage() {
  const queryClient = new QueryClient();
  await prefetchGetInviteRewardList(queryClient, 0);
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
