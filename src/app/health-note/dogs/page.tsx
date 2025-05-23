import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Loader from "@/components/common/loader/Loader";
import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import DogList from "@/components/pages/heathNote/dogs/dogList/DogList";
import { prefetchGetFullDogList } from "@/api/dog/queries/usePrefetchGetFullDogList";

export default async function HeathNoteDogsPage() {
	const queryClient = new QueryClient();
	await prefetchGetFullDogList(queryClient);
	const dehydrateState = dehydrate(queryClient);

	return (
		<>
			<HydrationBoundary state={dehydrateState}>
				<ErrorBoundary fallback={<div>반려견 전체보기 로딩 실패</div>}>
					<Suspense fallback={<Loader fullscreen />}>
						<DogList />
					</Suspense>
				</ErrorBoundary>
			</HydrationBoundary>
			<BottomNavBar />
		</>
	);
}
