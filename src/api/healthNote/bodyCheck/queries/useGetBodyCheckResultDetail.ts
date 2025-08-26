import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBodyCheckResultDetail } from "../bodyCheck";
import { BodyCheckDetailMap, BodyPartType } from "@/types/healthNote/bodyCheck";

export function useGetBodyCheckResultDetail<P extends BodyPartType>(
  part: P,
  diagnosisId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<BodyCheckDetailMap[P]>
) {
  return useSuspenseQuery({
    queryFn: () => getBodyCheckResultDetail(part, diagnosisId),
    queryKey: [
      queryKeys.BODY_CHECK.BASE,
      queryKeys.BODY_CHECK.GET_BODY_CHECK_RESULT_DETAIL,
      part,
      diagnosisId,
    ],
    ...queryOptions,
  });
}
