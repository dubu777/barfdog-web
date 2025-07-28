import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGutCheckResult } from "../gutCheck";

export function useGetGutCheckResult(
  diagnosisId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<any>
) {
  return useSuspenseQuery({
    queryFn: () => getGutCheckResult(diagnosisId),
    queryKey: [
      queryKeys.GUT_CHECK.BASE,
      queryKeys.GUT_CHECK.GET_GUT_CHECK_RESULT,
      diagnosisId,
    ],
    ...queryOptions,
  });
}
