import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getMedicalHistoryDetail } from "../medicalHistory";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetMedicalHistoryDetail(diagnosisId: number, queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getMedicalHistoryDetail(diagnosisId, ssrAxios),
    queryKey: [
      queryKeys.MEDICAL_HISTORY.BASE,
      queryKeys.MEDICAL_HISTORY.GET_MEDICAL_HISTORY_DETAIL,
      diagnosisId,
    ],
  });
}
