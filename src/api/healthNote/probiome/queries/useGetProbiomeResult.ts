import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProbiomeDetail } from "../probiome";
import { ProbiomeDetailResponse } from "@/types/healthNote/probiome";

export function useGetProbiomeDetail(
  diagnosisId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<ProbiomeDetailResponse>
) {
  return useSuspenseQuery({
    queryFn: () => getProbiomeDetail(diagnosisId),
    queryKey: [
      queryKeys.PROBIOME.BASE,
      queryKeys.PROBIOME.GET_PROBIOME_RESULT,
      diagnosisId,
    ],
    ...queryOptions,
  });
}
