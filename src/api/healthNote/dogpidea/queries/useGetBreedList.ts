import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBreedList } from "../dogpidea";
import { BreedList } from "@/types/healthNote/dogpedia";

export function useGetBreedList(queryOptions?: UseSuspenseQueryCustomOptions<BreedList>) {
  return useSuspenseQuery({
    queryFn: () => getBreedList(),
    queryKey: [
      queryKeys.DOGPEDIA.BASE,
      queryKeys.DOGPEDIA.GET_BREED_LIST,
    ],
    ...queryOptions,
  });
}
