"use client";
import { commonWrapper } from "@/styles/common.css";
import { Fragment, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import TabBar from "@/components/common/tabBar/TabBar";
import Divider from "@/components/common/divider/Divider";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import OrderItem from "./orderItem/OrderItem";
import useFilterTabs from "@/hooks/useFilterTabs";
import { OrderType } from "@/types/mypage/orders";
import { ORDER_TYPE_LIST } from "@/constants/mypage/orders";
import { useGetInfiniteOrderList } from "@/api/mypage/orders/queries/useGetInfiniteOrderList";
import EmptyList from "@/components/common/emptyList/EmptyList";
import Button from "@/components/common/button/Button";

export default function OrderList () {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderType = searchParams.get("orderType") as OrderType ?? "SUBSCRIPTION";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteOrderList(orderType);
  const orderList = data?.pages?.flatMap((page) => page.orders) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage])

  const { defaultTabIndex, handleFilterChange } = useFilterTabs({
    filterKey: 'orderType',
    defaultValue: 'SUBSCRIPTION',
    tabs: ORDER_TYPE_LIST,
  })

  return (
    <section>
      <Divider thickness={2} color="gray50" />
      <TabBar 
        variant="text"
        defaultIndex={defaultTabIndex}
        tabs={
          ORDER_TYPE_LIST.map(tab => ({
            ...tab,
            onInit: async () => {
              handleFilterChange(tab.value);
            }
          }))
        }
      />
      <article className={commonWrapper({ direction: 'col' })}>
        {orderList.length > 0 ?
          <>
            {orderList.map((order) => (
              <Fragment key={order.orderInfo.orderId}>
                <OrderItem
                  orderType={orderType}
                  orderId={order.orderInfo.orderId}
                  orderDate={order.orderInfo.orderDate}
                  orderStatus={order.orderInfo.orderStatus}
                  thumbnailUrl={order.recipeInfo?.thumbnailUrl ? order.recipeInfo?.thumbnailUrl : order.orderInfo.thumbnailUrl ?? ''}
                  name={order.orderInfo.itemNameList ? order.orderInfo.itemNameList[0].name : order.recipeInfo?.name ?? ''}
                  subscribeCount={order.orderInfo.subscribeCount}
                  dogName={order.orderInfo.dogName}
                  paymentPrice={order.orderInfo.paymentPrice}
                  recipeName={order.recipeInfo?.name}
                  itemNameList={order.orderInfo.itemNameList}
                />
                <Divider thickness={6} color="gray100" />
              </Fragment>
            ))}
            <InfiniteScrollTrigger
              ref={ref}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
        : (
          <div className={commonWrapper({ direction: 'col', gap: 20, paddingTop: 60, paddingBottom: 60 })}>
            <EmptyList 
              title={
                orderType === 'SUBSCRIPTION' 
                  ? `구독 중인 상품 내역이 없어요\n정기구독을 먼저 시작해주세요` 
                  : `주문하신 상품 내역이 없어요\n상품을 먼저 주문해주세요`
              } 
            />
            <Button 
              variant="solid" 
              intent="secondary" 
              size="lg"
              onClick={() => {
                if (orderType === 'SUBSCRIPTION') {
                  router.push('/diet-analysis');
                } else {
                  router.push('/store');
                }
              }}
            >
              {orderType === 'SUBSCRIPTION' ? '정기구독 시작하기' : '상품 담기'}
            </Button>
          </div>
        )}
      </article>
    </section>
  );
}