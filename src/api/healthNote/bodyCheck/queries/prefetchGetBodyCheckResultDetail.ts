import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getBodyCheckResultDetail } from "../bodyCheck";
import { createSSRRequest } from "@/api/withAuthSSR";
import { BodyPartType } from "@/types/healthNote/bodyCheck";

export async function prefetchGetBodyCheckResultDetail(
  part: BodyPartType,
  diagnosisId: number,
  queryClient: QueryClient
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getBodyCheckResultDetail(part, diagnosisId, ssrAxios),
    queryKey: [
      queryKeys.BODY_CHECK.BASE,
      queryKeys.BODY_CHECK.GET_BODY_CHECK_RESULT_DETAIL,
      part,
      diagnosisId,
    ],
  });
}
