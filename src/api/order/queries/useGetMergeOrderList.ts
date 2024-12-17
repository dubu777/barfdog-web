import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import {getGeneralOrderList, getSubscriptionOrderList} from "@/api/order/order";
import {GeneralOrderData, MergeOrderData, SubscriptionOrderData} from "@/types";

export { useMergeOrderList };

function useMergeOrderList() {
  const page = 0;
  const {
    data: SubscriptionOrderData,
    fetchNextPage: fetchNextSubscribePage,
    hasNextPage: hasNextSubscribePage,
    isFetchingNextPage: isFetchingNextSubscribePage
  } = useInfiniteQuery<SubscriptionOrderData[], Error>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_SUBSCRIPTION_ORDER_LIST, page],
    queryFn: ({ pageParam = 0 }) => { 
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      return getSubscriptionOrderList(pageNumber, 5)
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length ? pages.length : undefined;
    },
    initialPageParam: 0,
  })
  const {
    data: generalOrderData,
    fetchNextPage: fetchNextGeneralPage,
    hasNextPage: hasNextGeneralPage,
    isFetchingNextPage: isFetchingNextGeneralPage
  } = useInfiniteQuery<GeneralOrderData[], Error>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_GENERAL_ORDER_LIST, page],
      queryFn: ({ pageParam = 0 }) => { 
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      return getGeneralOrderList(pageNumber, 5)
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length ? pages.length : undefined;
    },
    initialPageParam: 0,
  })
  
  const totalData: MergeOrderData = [
    ...(SubscriptionOrderData?.pages.flat() ?? []),
    ...(generalOrderData?.pages.flat() ?? []),
  ].sort((a, b) =>
    new Date(b.orderDto.orderDate).getTime() - new Date(a.orderDto.orderDate).getTime()
  )

  const loadMore = () => {
    const subscribePagePromise = hasNextSubscribePage ? fetchNextSubscribePage() : Promise.resolve();
    const generalPagePromise = hasNextGeneralPage ? fetchNextGeneralPage() : Promise.resolve();

    return [subscribePagePromise, generalPagePromise];
  };

  return {
    totalData,
    loadMore,
    hasNextPage: hasNextSubscribePage || hasNextGeneralPage,
    isFetchingNextPage: isFetchingNextGeneralPage || isFetchingNextSubscribePage,
  }
}