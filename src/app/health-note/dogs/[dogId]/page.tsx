import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import DogDetail from "@/components/pages/heathNote/dogs/detail/DogDetail";
import { prefetchGetDogDetail } from "@/api/dog/queries/usePrefetchGetDogDetail";
import { prefetchGetFullDogList } from "@/api/dog/queries/usePrefetchGetFullDogList";

interface DogDetailPageProps {
	params: {
		dogId: string;
	};
}

export default async function DogDetailPage({ params }: DogDetailPageProps) {
	const queryClient = new QueryClient();
	await prefetchGetDogDetail(queryClient, Number(params.dogId));
	await prefetchGetFullDogList(queryClient);
	const dehydrateState = dehydrate(queryClient);

	return (
		<>
			<HydrationBoundary state={dehydrateState}>
				<ErrorBoundary fallback={<div>반려견 상세 로딩 실패</div>}>
					<Suspense fallback={<Loader fullscreen />}>
						<DogDetail dogId={Number(params.dogId)} />
					</Suspense>
				</ErrorBoundary>
			</HydrationBoundary>
		</>
	);
}
