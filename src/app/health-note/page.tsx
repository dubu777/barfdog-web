import { dehydrate, QueryClient } from "@tanstack/react-query";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import { prefetchGetDogList } from "@/api/dog/queries/usePrefetchGetDogList";
import HealthNoteUser from "@/components/pages/heathNote/main/healthNoteUser/healthNoteUser";
import { HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

export default async function HeathNotePage() {
  const queryClient = new QueryClient();
  await prefetchGetDogList(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <HealthNoteUser />
          <BottomNavBar />
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
