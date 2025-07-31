import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getObesityDetail } from "@/api/sVoucher/sVoucher";
import { ObesityDetailResponse } from "@/types/sVoucher";

export function useGetObesityDetail(surveyId: number) {
	return useQuery<ObesityDetailResponse>({
		queryKey: [queryKeys.S_VOUCHER.BASE, queryKeys.S_VOUCHER.GET_OBESITY_DETAIL, surveyId],
		queryFn: () => getObesityDetail(surveyId),
	})
}
