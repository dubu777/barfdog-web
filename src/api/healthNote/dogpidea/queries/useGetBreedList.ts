import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBreedList } from "../dogpidea";
import { Breed } from "@/types/healthNote/dogpedia";

export function useGetBreedList(queryOptions?: UseSuspenseQueryCustomOptions<Breed[]>) {
  return useSuspenseQuery({
    queryFn: () => getBreedList(),
    queryKey: [
      queryKeys.DOGPEDIA.BASE,
      queryKeys.DOGPEDIA.GET_BREED_LIST,
    ],
    ...queryOptions,
  });
}
