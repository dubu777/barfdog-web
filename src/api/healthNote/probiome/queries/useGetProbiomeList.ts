import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProbiomeList } from "../probiome";
import { ProbiomeList } from "@/types/healthNote/probiome";

export function useGetProbiomeList(
  petId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<ProbiomeList>
) {
  return useSuspenseQuery({
    queryFn: () => getProbiomeList(petId),
    queryKey: [
      queryKeys.PROBIOME.BASE,
      queryKeys.PROBIOME.GET_PROBIOME_LIST,
      petId,
    ],
    ...queryOptions,
  });
}
