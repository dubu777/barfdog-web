import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBreedDetail } from "../dogpidea";
import { BreedDetail } from "@/types/healthNote/dogpedia";

export function useGetBreedDetail(breedId: number, queryOptions?: UseSuspenseQueryCustomOptions<BreedDetail>) {
  return useSuspenseQuery({
    queryFn: () => getBreedDetail(breedId),
    queryKey: [
      queryKeys.DOGPEDIA.BASE,
      queryKeys.DOGPEDIA.GET_BREED_DETAIL,
      breedId,
    ],
    ...queryOptions,
  });
}
