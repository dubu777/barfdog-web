import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";
import HistoryDetail from "@/components/pages/heathNote/medicalHistory/detail/HistoryDetail";
import { prefetchGetMedicalHistoryDetail } from "@/api/healthNote/medicalHistory/queries/prefetchGetMedicalHistoryDetail";

interface MedicalHistoryDetailPageProps {
	params: Promise<{
		diagnosisId: string;
	}>;
	searchParams: Promise<{
		petId: string;
	}>;
}

export default async function MedicalHistoryDetailPage({ params, searchParams }: MedicalHistoryDetailPageProps) {
	const { diagnosisId } = await params;
	const { petId } = await searchParams;
	const queryClient = new QueryClient();
	await prefetchGetMedicalHistoryDetail(Number(diagnosisId), queryClient);
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ErrorBoundary fallback={<div>병원 진료 기록 상세 로딩 실패</div>}>
				<Suspense fallback={<Loader fullscreen />}>
					<HistoryDetail
						diagnosisId={Number(diagnosisId)}
						petId={Number(petId)}
					/>
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	);
}