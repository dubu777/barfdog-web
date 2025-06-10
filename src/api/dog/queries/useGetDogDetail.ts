import { queryKeys } from "@/constants/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DogDetailData, UseSuspenseQueryCustomOptions } from "@/types";
import { getDogDetail } from "../dog";

export function useGetDogDetail(dogId: number, queryOptions?: UseSuspenseQueryCustomOptions<DogDetailData>) {
  return useSuspenseQuery({
    queryFn: async () => await getDogDetail(dogId),
    queryKey: [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_DETAIL, dogId],
    ...queryOptions,
  })
}