import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner/Spinner";
import HistoryDetail from "@/components/pages/heathNote/medicalHistory/detail/HistoryDetail";
import { prefetchGetMedicalHistoryDetail } from "@/api/healthNote/medicalHistory/queries/prefetchGetMedicalHistoryDetail";

interface MedicalHistoryDetailPageProps {
	params: Promise<{
		petId: string;
		diagnosisId: string;
	}>;
}

export default async function MedicalHistoryDetailPage({ params }: MedicalHistoryDetailPageProps) {
	const { petId, diagnosisId } = await params;
	const queryClient = new QueryClient();
	await prefetchGetMedicalHistoryDetail(Number(diagnosisId), queryClient);
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ErrorBoundary fallback={<div>병원 진료 기록 상세 로딩 실패</div>}>
				<Suspense fallback={<Spinner fullscreen />}>
					<HistoryDetail
						diagnosisId={Number(diagnosisId)}
						petId={Number(petId)}
					/>
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	);
}