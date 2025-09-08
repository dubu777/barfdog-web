import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { BodyPartType } from "@/types/healthNote/bodyCheck";
import { getInfiniteBodyCheckList } from "@/api/healthNote/bodyCheck/bodyCheck";

export function useGetInfiniteBodyCheckList(petId: number, part: BodyPartType) {
	return useInfiniteQuery({
		queryKey: [queryKeys.BODY_CHECK.BASE, queryKeys.BODY_CHECK.GET_BODY_CHECK_LIST, petId, part],
		queryFn: async ({ pageParam = 0 }) => {
			const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
			return await getInfiniteBodyCheckList(
				petId,
				part,
				pageNumber,
				10,
			);
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