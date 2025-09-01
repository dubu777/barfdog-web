import { QueryClient } from "@tanstack/react-query";
import { PaymentItem } from "@/types";
import { getPaymentList } from "@/api/mypage/subscription/subscription";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetPaymentList(queryClient: QueryClient) {
	const ssrAxios = createSSRRequest();
	await queryClient.prefetchQuery<PaymentItem[]>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_PAYMENT_LIST],
		queryFn: () => getPaymentList(ssrAxios),
	});
}
