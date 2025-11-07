import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { getRecommendItems } from "@/api/healthNote/aiObesityCheck/aiObesityCheck";

export function useGetRecommendItems(itemIds: number[]) {
	return useQuery({
		queryKey: [
			queryKeys.AI_OBESITY_CHECK.BASE, 
			queryKeys.AI_OBESITY_CHECK.GET_RECOMMEND_ITEMS, 
		],
		queryFn: async () => await getRecommendItems(itemIds),
	})
}
