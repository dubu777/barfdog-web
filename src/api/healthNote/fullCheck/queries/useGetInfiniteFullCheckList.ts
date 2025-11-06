import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getInfiniteFullCheckList } from "@/api/healthNote/fullCheck/fullCheck";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteFullCheckList(petId: number) {
	return useInfiniteQuery(createInfiniteQueryConfig({
		queryKey: [
			queryKeys.FULL_CHECK.BASE,
      queryKeys.FULL_CHECK.GET_FULL_CHECK_LIST,
      petId,
		],
		queryFn: async ({ pageParam }) => {
			return await getInfiniteFullCheckList({
				petId: petId,
				pageParam,
				size: 10,
			});
		},
	}));
}