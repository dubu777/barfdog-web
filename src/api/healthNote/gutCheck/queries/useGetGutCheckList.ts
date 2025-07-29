import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGutCheckList } from "../gutCheck";
import { GutCheckList } from "@/types/healthNote/gutCheck";

export function useGetGutCheckList(
  petId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<GutCheckList>
) {
  return useSuspenseQuery({
    queryFn: () => getGutCheckList(petId),
    queryKey: [
      queryKeys.GUT_CHECK.BASE,
      queryKeys.GUT_CHECK.GET_GUT_CHECK_LIST,
      petId,
    ],
    ...queryOptions,
  });
}
