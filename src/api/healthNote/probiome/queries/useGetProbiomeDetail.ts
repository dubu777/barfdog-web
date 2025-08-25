import { queryKeys } from "@/constants/queryKeys";
import { UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getProbiomeDetail } from "../probiome";
import { ProbiomeDetailResponse } from "@/types/healthNote/probiome";

export function useGetProbiomeDetail(
  diagnosisId: number,
  queryOptions?: UseQueryCustomOptions<ProbiomeDetailResponse>
) {
  return useQuery({
    queryFn: () => getProbiomeDetail(diagnosisId),
    queryKey: [
      queryKeys.PROBIOME.BASE,
      queryKeys.PROBIOME.GET_PROBIOME_RESULT,
      diagnosisId,
    ],
    ...queryOptions,
  });
}
