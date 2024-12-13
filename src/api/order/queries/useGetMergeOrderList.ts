import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import {getGeneralOrderList, getSubscribeOrderList} from "@/api/order/order";
import {GeneralOrderData, MergeOrderData, SubscribeOrderData} from "@/types";

export { useMergeOrderList };

function useMergeOrderList() {
  const page = 0;
  const {
    data: subscribeOrderData,
    fetchNextPage: fetchNextSubscribePage,
    hasNextPage: hasNextSubscribePage,
    isFetchingNextPage: isFetchingNextSubscribePage
  } = useInfiniteQuery<SubscribeOrderData[], Error>({
    queryKey: [queryKeys.ORDER, queryKeys.GET_SUBSCRIBE_ORDER_LIST, page],
    queryFn: ({ pageParam = 0 }) => { 
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      return getSubscribeOrderList(pageNumber, 5)
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
    queryKey: [queryKeys.ORDER, queryKeys.GET_GENERAL_ORDER_LIST, page],
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
    ...(subscribeOrderData?.pages.flat() ?? []),
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