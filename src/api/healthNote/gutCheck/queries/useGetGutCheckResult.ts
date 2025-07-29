import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGutCheckDetail } from "../gutCheck";
import { GutCheckDetailResponse } from "@/types/healthNote/gutCheck";

export function useGetGutCheckDetail(
  diagnosisId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<GutCheckDetailResponse>
) {
  return useSuspenseQuery({
    queryFn: () => getGutCheckDetail(diagnosisId),
    queryKey: [
      queryKeys.GUT_CHECK.BASE,
      queryKeys.GUT_CHECK.GET_GUT_CHECK_RESULT,
      diagnosisId,
    ],
    ...queryOptions,
  });
}
