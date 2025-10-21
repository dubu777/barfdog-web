import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getSubscriptionList } from "../subscription";
import { createInfiniteQueryConfig } from "@/utils/api/infiniteQueryConfig";

export function useGetInfiniteSubscriptionList() {
	return useInfiniteQuery(createInfiniteQueryConfig({
		queryKey: [
			queryKeys.MYPAGE.BASE, 
			queryKeys.MYPAGE.SUBSCRIPTION.BASE, 
			queryKeys.MYPAGE.SUBSCRIPTION.GET_SUBSCRIPTION_LIST
		],
    queryFn: async ({ pageParam }) => {
      return await getSubscriptionList(pageParam, 50);
    },
  }));
}