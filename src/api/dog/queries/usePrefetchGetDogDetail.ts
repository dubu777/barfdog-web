import { QueryClient } from "@tanstack/react-query";
import { DogDetailData } from "@/types";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getDogDetail } from "@/api/dog/dog";

export async function prefetchGetDogDetail(queryClient: QueryClient, dogId: number) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<DogDetailData>({
		queryKey: [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_DETAIL, dogId],
		queryFn: () => getDogDetail(dogId, ssrAxios),
	});
}