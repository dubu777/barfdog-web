import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import InviteFriends from "@/components/pages/mypage/inviteFriends/InviteFriends";
import Error from "@/components/layout/error/Error";
import Spinner from "@/components/ui/spinner/Spinner";
import { prefetchGetReferralRewardList } from "@/api/mypage/inviteFriends/queries/prefetchGetInviteRewardList";

export default async function InviteFriendsPage() {
  const queryClient = new QueryClient();
  await prefetchGetReferralRewardList(queryClient);
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <InviteFriends />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
