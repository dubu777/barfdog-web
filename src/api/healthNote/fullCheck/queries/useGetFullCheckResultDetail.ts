import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFullCheckResultDetail } from "../fullCheck";
import { CheckupDiagnosis } from "@/types/healthNote/fullCheck";

export function useGetFullCheckResultDetail(diagnosisId: number, queryOptions?: UseSuspenseQueryCustomOptions<CheckupDiagnosis>) {
  return useSuspenseQuery({
    queryFn: () => getFullCheckResultDetail(diagnosisId),
    queryKey: [
      queryKeys.FULL_CHECK.BASE,
      queryKeys.FULL_CHECK.GET_FULL_CHECK_RESULT_DETAIL,
      diagnosisId,
    ],
    ...queryOptions,
  });
}
