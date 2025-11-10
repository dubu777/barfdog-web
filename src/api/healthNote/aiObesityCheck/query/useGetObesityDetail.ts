import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getObesityDetail } from "@/api/healthNote/aiObesityCheck/aiObesityCheck";
import { ObesityDetailResponse } from "@/types/healthNote/aiObesityCheck";

export function useGetObesityDetail(surveyId: number) {
	return useQuery<ObesityDetailResponse>({
		queryKey: [
			queryKeys.AI_OBESITY_CHECK.BASE, 
			queryKeys.AI_OBESITY_CHECK.GET_OBESITY_DETAIL, 
			surveyId
		],
		queryFn: () => getObesityDetail(surveyId),
	})
}
