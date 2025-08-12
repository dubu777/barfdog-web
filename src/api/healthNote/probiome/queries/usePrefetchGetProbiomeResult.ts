import { queryKeys } from "@/constants";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getProbiomeDetail } from "../probiome";

export async function prefetchGetProbiomeResult(
  queryClient: QueryClient,
  id: number
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getProbiomeDetail(Number(id), ssrAxios),
    queryKey: [
      queryKeys.PROBIOME.BASE,
      queryKeys.PROBIOME.GET_PROBIOME_RESULT,
      id,
    ],
  });
}
