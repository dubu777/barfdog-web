import { queryKeys } from "@/constants/queryKeys";
import { UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getProbiomeList } from "../probiome";
import { ProbiomeList } from "@/types/healthNote/probiome";

export function useGetProbiomeList(
  petId: number,
  queryOptions?: UseQueryCustomOptions<ProbiomeList>
) {
  return useQuery({
    queryFn: () => getProbiomeList(petId),
    queryKey: [
      queryKeys.PROBIOME.BASE,
      queryKeys.PROBIOME.GET_PROBIOME_LIST,
      petId,
    ],
    ...queryOptions,
  });
}
