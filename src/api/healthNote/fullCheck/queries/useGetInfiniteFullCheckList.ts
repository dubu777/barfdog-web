import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getInfiniteFullCheckList } from "@/api/healthNote/fullCheck/fullCheck";

export function useGetInfiniteFullCheckList(petId: number) {
	return useInfiniteQuery({
		queryKey: [queryKeys.FULL_CHECK.BASE, queryKeys.FULL_CHECK.GET_FULL_CHECK_LIST, petId],
		queryFn: async ({ pageParam = 0 }) => {
			const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
			const data = await getInfiniteFullCheckList({
				petId: petId,
				pageParam: pageNumber,
				size: 10,
			});

			return data;
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;

			const currentPage = lastPage.page.page ?? lastPage.page.number ?? 0;
			const totalPages = lastPage.page.totalPages ?? 0;

			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
		initialPageParam: 0,
	});
}