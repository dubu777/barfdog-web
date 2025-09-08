import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getLatestBodyCheck } from "../bodyCheck";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetLatestBodyCheck(petId: number, queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getLatestBodyCheck(petId, ssrAxios),
    queryKey: [
      queryKeys.BODY_CHECK.BASE,
      queryKeys.BODY_CHECK.GET_LATEST_BODY_CHECK,
      petId,
    ],
  });
}
