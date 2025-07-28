import { queryKeys } from "@/constants";
import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getGutCheckList } from "../gutCheck";

export async function prefetchGetGutCheckList(
  queryClient: QueryClient,
  id: number
) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getGutCheckList(Number(id), ssrAxios),
    queryKey: [
      queryKeys.GUT_CHECK.BASE,
      queryKeys.GUT_CHECK.GET_GUT_CHECK_LIST,
      id,
    ],
  });
}
