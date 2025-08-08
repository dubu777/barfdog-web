import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getMedicalHistoryDetail } from "../medicalHistory";
import { MedicalHistoryDetail } from "@/types/healthNote/medicalHistory";

export function useGetMedicalHistoryDetail(diagnosisId: number, queryOptions?: UseSuspenseQueryCustomOptions<MedicalHistoryDetail>) {
  return useSuspenseQuery({
    queryFn: () => getMedicalHistoryDetail(diagnosisId),
    queryKey: [
      queryKeys.MEDICAL_HISTORY.BASE,
      queryKeys.MEDICAL_HISTORY.GET_MEDICAL_HISTORY_DETAIL,
      diagnosisId,
    ],
    ...queryOptions,
  });
}
