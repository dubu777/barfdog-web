import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ConnectedSns from "@/components/pages/mypage/account/connectedSns/ConnectedSns";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetUserInfo } from "@/api/mypage/account/queries/prefetchGetUserInfo";

export default async function ConnectSnsPage() {
  const queryClient = new QueryClient();
  await prefetchGetUserInfo(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <ConnectedSns />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}
