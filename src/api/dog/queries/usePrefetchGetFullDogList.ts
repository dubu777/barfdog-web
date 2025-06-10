'use server';
import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getFullDogList } from "../dog";
import { createSSRRequest } from "@/api/withAuthSSR";
import { FullDogDetail } from "@/types";

const getFullDogListQueryKey = [queryKeys.DOG.BASE, queryKeys.DOG.GET_FULL_DOG_LIST];

export async function prefetchGetFullDogList(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery<FullDogDetail[]>({
    queryKey: getFullDogListQueryKey,
    queryFn: () => getFullDogList(ssrAxios),
  });
}