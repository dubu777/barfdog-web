import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import {
  DogListData,
  UseQueryCustomOptions,
  UseSuspenseQueryCustomOptions,
} from "@/types";
import { getDogList } from "../dog";

const getDogListQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_LIST];

export function useGetDogList(
  queryOptions?: UseQueryCustomOptions<DogListData[]>
) {
  return useQuery({
    queryFn: () => getDogList(),
    queryKey: getDogListQueryKey,
    ...queryOptions,
  });
}
