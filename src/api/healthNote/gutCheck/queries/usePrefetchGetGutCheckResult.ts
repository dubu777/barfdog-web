import { queryKeys } from "@/constants";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getGutCheckDetail } from "../gutCheck";

export async function prefetchGetGutCheckResult(
  queryClient: QueryClient,
  id: number
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getGutCheckDetail(Number(id), ssrAxios),
    queryKey: [
      queryKeys.GUT_CHECK.BASE,
      queryKeys.GUT_CHECK.GET_GUT_CHECK_RESULT,
      id,
    ],
  });
}
