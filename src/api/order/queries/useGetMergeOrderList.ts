import { useInfiniteQuery } from "@tanstack/react-query";
import { ORDER_TYPE, queryKeys, MYPAGE_ITEM_TYPE_FILTERS } from "@/constants";
import { getGeneralOrderList, getSubscriptionOrderList } from "@/api/order/order";
import { GeneralOrderData, MergeOrderData, SubscriptionOrderData } from "@/types";

export { useMergeOrderList };

function useMergeOrderList({ filterValue, statusFilter }: { filterValue?: keyof typeof MYPAGE_ITEM_TYPE_FILTERS, statusFilter?: 'ORDER' | 'CANCEL' }) {
  const page = 0;
  const {
    data: SubscriptionOrderData,
    fetchNextPage: fetchNextSubscribePage,
    hasNextPage: hasNextSubscribePage,
    isFetchingNextPage: isFetchingNextSubscribePage
  } = useInfiniteQuery<SubscriptionOrderData[], Error>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_SUBSCRIPTION_ORDER_LIST, filterValue, page],
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
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_GENERAL_ORDER_LIST,filterValue,  page],
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

  // 상태 필터 기준
  const ORDER_STATUSES = new Set([
    "BEFORE_PAYMENT", "HOLD", "RESERVED_PAYMENT",
    "PAYMENT_DONE", "DELIVERY_BEFORE_COLLECTION", "PRODUCING", "DELIVERY_READY", "TODAY_IS_NEXT_DELIVERY",
    "DELIVERY_START", "DELIVERY_DONE", "SUBSCRIBE_ORDER", "UNSUBSCRIBE_ORDER", "CONFIRM"
  ]);

  const CANCEL_STATUSES = new Set([
    "FAILED", "FAILED_RESERVED_PAYMENT",
    "CANCEL_REQUEST", "CANCEL_DONE_SELLER", "CANCEL_DONE_BUYER",
    "RETURN_REQUEST", "RETURN_DONE_SELLER", "RETURN_DONE_BUYER",
    "EXCHANGE_REQUEST", "EXCHANGE_DONE_SELLER", "EXCHANGE_DONE_BUYER"
  ]);

  const filteredData = totalData.filter((data) => {
    const status = data.orderDto.orderStatus;

    // 1. filterValue 적용 (구독 vs 일반)
    if (filterValue) {
      if (filterValue === ORDER_TYPE.SUBSCRIPTION && !('recipeDto' in data)) return false;
      if (filterValue === ORDER_TYPE.GENERAL && ('recipeDto' in data)) return false;
    }

    // 2. statusFilter 적용 (일반 주문 vs 취소/교환/반품)
    if (statusFilter === 'ORDER') return ORDER_STATUSES.has(status);
    if (statusFilter === 'CANCEL') return CANCEL_STATUSES.has(status);

    return true; // 기본적으로 모든 데이터를 보여줌
  });

  const loadMore = () => {
    const subscribePagePromise = hasNextSubscribePage ? fetchNextSubscribePage() : Promise.resolve();
    const generalPagePromise = hasNextGeneralPage ? fetchNextGeneralPage() : Promise.resolve();

    return [subscribePagePromise, generalPagePromise];
  };

  return {
    totalData: filteredData,
    loadMore,
    hasNextPage: hasNextSubscribePage || hasNextGeneralPage,
    isFetchingNextPage: isFetchingNextGeneralPage || isFetchingNextSubscribePage,
  }
}