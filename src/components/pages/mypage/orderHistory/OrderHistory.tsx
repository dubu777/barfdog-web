'use client';
import { useEffect } from "react";
import * as styles from "./OrderHistory.css";
import OrderHistoryFilter from "@/components/pages/mypage/orderHistory/orderHistoryFilter/OrderHistoryFilter";
import OrderHistoryList from "@/components/pages/mypage/orderHistory/orderHistoryList/OrderHistoryList";
import { useInView } from "react-intersection-observer";
import { useMergeOrderList } from "@/api/order/queries/useGetMergeOrderList";

const OrderHistory = () => {
  const { ref, inView } = useInView();
  const { totalData, loadMore, hasNextPage, isFetchingNextPage } = useMergeOrderList();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      loadMore();
    }
  }, [inView, isFetchingNextPage, hasNextPage, loadMore])
  return (
    <section className={styles.orderHistoryContainer}>
      <OrderHistoryFilter />
      <OrderHistoryList orderList={totalData} />
      {totalData.length > 0 &&
        <div ref={ref} style={{height: 50, background: isFetchingNextPage ? 'lightgray' : 'transparent'}}>
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load more on scroll" : "No more data"}
        </div>
      }
    </section>
  );
};

export default OrderHistory;
