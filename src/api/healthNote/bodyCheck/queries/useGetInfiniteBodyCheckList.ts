import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { BodyPartType } from "@/types/healthNote/bodyCheck";
import { getInfiniteBodyCheckList } from "@/api/healthNote/bodyCheck/bodyCheck";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteBodyCheckList(petId: number, part: BodyPartType) {
	return useInfiniteQuery(createInfiniteQueryConfig({
    queryKey: [
			queryKeys.BODY_CHECK.BASE, 
			queryKeys.BODY_CHECK.GET_BODY_CHECK_LIST, 
			petId, 
			part
		],
    queryFn: async ({ pageParam }) => {
      return await getInfiniteBodyCheckList(
				petId,
				part,
				pageParam,
				10,
			);
    },
  }));
}