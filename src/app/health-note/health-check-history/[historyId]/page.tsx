import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import HistoryDetail from "@/components/pages/heathNote/healthCheckHistory/detail/HistoryDetail";

interface DogDetailPageProps {
	params: {
		historyId: string;
	};
}

export default async function HistoryDetailPage({ params }: DogDetailPageProps) {
	const queryClient = new QueryClient();
	const dehydrateState = dehydrate(queryClient);

	return (
		<>
			<HydrationBoundary state={dehydrateState}>
				<ErrorBoundary fallback={<div>건강검진 상세 로딩 실패</div>}>
					<Suspense fallback={<Loader fullscreen />}>
						<HistoryDetail historyId={Number(params.historyId)} />
					</Suspense>
				</ErrorBoundary>
			</HydrationBoundary>
		</>
	);
}
