import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Account from "@/components/pages/mypage/account/Account";
import Spinner from "@/components/ui/spinner/Spinner";
import Error from "@/components/layout/error/Error";
import { prefetchGetMyPageInfo } from "@/api/mypage/common/queries/prefetchGetMyPageInfo";

export default async function AccountPage() {
  const queryClient = new QueryClient();
  await prefetchGetMyPageInfo(queryClient);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner fullscreen />}>
          <Account />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
