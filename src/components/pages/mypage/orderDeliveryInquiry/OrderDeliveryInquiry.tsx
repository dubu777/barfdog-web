'use client';
import * as styles from "./OrderDeliveryInquiry.css";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useInView } from "react-intersection-observer";
import { useMergeOrderList } from "@/api/order/queries/useGetMergeOrderList";
import DefaultText from "@/components/common/defaultText/DefaultText";
import useFilterTabs from "@/hooks/useFilterTabs";
import TabBar from "@/components/common/tabBar/TabBar";
import FilterBottomSheet from "@/components/pages/mypage/common/bottomSheet/filterBottomSheet/FilterBottomSheet";
import EmptyState from "@/components/pages/mypage/common/emptyState/emptyState/EmptyState";
import OrderCard from "@/components/pages/mypage/common/cards/section/OrderCard";
import StatusTracker from "@/components/pages/mypage/common/statusTracker/StatusTracker";
import { MYPAGE_ITEM_TYPE_FILTERS, MYPAGE_SORT_FILTERS } from "@/constants/mypage";
import { ORDER_TYPE } from "@/constants";

const tabs = [
  { label: '전체', value: 'ALL' },
  { label: '결제예정', value: 'BEFORE_PAYMENT' },
  { label: '결제완료', value: 'PAYMENT_DONE' },
  { label: '배송준비', value: 'DELIVERY_READY' },
  { label: '배송중', value: 'DELIVERY_START' },
  { label: '배송완료', value: 'DELIVERY_DONE' },
  { label: '구매확정', value: 'CONFIRM' },
]

const OrderDeliveryInquiry = () => {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();
  const { totalData, loadMore, hasNextPage, isFetchingNextPage } = useMergeOrderList({
    filterValue: searchParams.get('itemType') as keyof typeof MYPAGE_ITEM_TYPE_FILTERS,
    statusFilter: 'ORDER',
  });

  const orderData = totalData?.map(data => {
  if ('itemNameList' in data) {
    // GeneralOrderData일 경우
    return {
      ...data.orderDto,
      itemNameList: data.itemNameList.map(item => item),
      thumbnailUrl: data.thumbnailUrl,
      orderType: ORDER_TYPE.GENERAL,
    };
  } else if ('recipeDto' in data) {
    // SubscriptionOrderData일 경우
    return {
      ...data.orderDto,
      ...data.recipeDto,
      thumbnailUrl: data.recipeDto.thumbnailUrl,
      orderType: ORDER_TYPE.SUBSCRIPTION,
    };
  }

  return null;
}).filter(Boolean) as NonNullable<typeof orderData>;

  const getStepsCount = (key: string) => {
    return orderData?.filter(order => order?.orderStatus === key).length || 0;
  }
  
  const steps = [
    { key: "BEFORE_PAYMENT", label: "주문 접수", count: getStepsCount("BEFORE_PAYMENT") },
    { key: "PAYMENT_DONE", label: "결제완료", count: getStepsCount("PAYMENT_DONE") },
    { key: "DELIVERY_READY", label: "배송준비", count: getStepsCount("DELIVERY_READY") },
    { key: "DELIVERY_START", label: "배송중", count: getStepsCount("DELIVERY_START") },
    { key: "DELIVERY_DONE", label: "배송완료", count: getStepsCount("DELIVERY_DONE") },
  ];

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      loadMore();
    }
  }, [inView, isFetchingNextPage, hasNextPage, loadMore])

  const { defaultTabIndex, handleFilterChange } = useFilterTabs({
    filterKey: 'status',
    defaultValue: 'ALL',
    tabs: tabs,
  })

  const filters = [
    { key: "itemType", label: "조회 유형", options: MYPAGE_ITEM_TYPE_FILTERS },
    { key: "sort", label: "정렬 방식", options: MYPAGE_SORT_FILTERS },
  ];

  console.log('orderData', orderData);
  
  return (
    <section>
      <StatusTracker statusTitle='진행주문내역' steps={steps} />
      <article>
        <TabBar
          variant='chips'
          tabs={tabs.map(tab => ({
            ...tab,
            onInit: () => handleFilterChange(tab.value)
          }))}
          defaultIndex={defaultTabIndex}
          isScrollable
          className={styles.orderStatusFilterTabBar}
        />
      </article>
      <FilterBottomSheet filters={filters} />
      <article className={styles.orderListContainer}>
        {orderData.length < 1
          ? <EmptyState type='orderDeliveryInquiry' />
          : <div className={styles.orderList}>
            {orderData.map(orderData => {
              return (
                <div key={orderData?.orderId || orderData?.id} className={styles.orderListItem}>
                  <DefaultText type='caption' color='gray600'>주문일 {format(new Date(orderData.orderDate), 'yy.MM.dd')}</DefaultText>
                  {orderData?.itemNameList?.length > 0 ?
                    <div className={styles.orderItemsBox}>
                      {orderData?.itemNameList?.map(item => {
                        const orderItem = {
                          ...orderData,
                          itemName: item.name,
                          itemId: item.id,
                        }
                        delete orderItem.itemNameList;
                        return (
                          <OrderCard key={item.id} data={orderItem} type='orderDeliveryInquiry' />
                        )
                      })}
                    </div>
                    : <OrderCard type='orderDeliveryInquiry' data={orderData} />
                  }
                </div>
              )
            })}
            <div ref={ref} style={{height: 50, background: isFetchingNextPage ? 'lightgray' : 'transparent'}}>
              {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load more on scroll" : "No more data"}
            </div>
          </div>
        }
      </article>
    </section>
  );
};

export default OrderDeliveryInquiry;
