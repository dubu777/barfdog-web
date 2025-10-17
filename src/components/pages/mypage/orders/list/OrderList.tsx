"use client";
import { commonWrapper } from "@/styles/common.css";
import { Fragment, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import ArrowIcon from '/public/images/mypage/chevron-s.svg';
import Text from "@/components/common/text/Text";
import useFilterTabs from "@/hooks/useFilterTabs";
import TabBar from "@/components/common/tabBar/TabBar";
import Divider from "@/components/common/divider/Divider";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import EmptyState from "../../common/emptyState/EmptyState";
import CardWrapper from "../common/card/CardWrapper";
import OrderStatus from "../common/card/OrderStatus";
import OrderImage from "../common/card/OrderImage";
import OrderPrice from "../common/card/OrderPrice";
import OrderName from "../common/card/OrderName";
import { OrderType } from "@/types/mypage/orders";
import { ORDER_TYPE_LIST } from "@/constants/mypage/orders";
import { useGetInfiniteOrderList } from "@/api/mypage/orders/queries/useGetInfiniteOrderList";

export default function OrderList () {
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
                <div className={commonWrapper({ 
                  direction: 'col', 
                  gap: 4, 
                  padding: 20, 
                  backgroundColors: 'gray50'
                })}>
                  <div className={commonWrapper({ justify: 'between', align: 'center' })}>
                    <Text type="label2" color="gray800">{format(new Date(order.orderInfo.orderDate), "yy-MM-dd HH:mm:ss")}</Text>
                    <Link href={`/mypage/orders/${orderType.toLowerCase()}/${order.orderInfo.orderId}`}>
                      <Text type="label4" color="gray800" className={commonWrapper({ gap: 4, align: 'center', width: 'auto' })}>
                        주문상세
                        <SvgIcon src={ArrowIcon} size={20} color="gray800" />
                      </Text>
                    </Link>
                  </div>
                  <CardWrapper gap={10}>
                    <div className={commonWrapper({ direction: 'col', gap: 10, justify: 'start', align: 'start' })}>
                      <OrderStatus
                        orderStatus={order.orderInfo.orderStatus}
                        orderType={orderType}
                      />
                      <div className={commonWrapper({ gap: 12, justify: 'start', align: 'start' })}>
                        <OrderImage
                          thumbnailUrl={order.recipeInfo?.thumbnailUrl ? order.recipeInfo?.thumbnailUrl : order.orderInfo.thumbnailUrl ?? ''}
                          itemName={order.orderInfo.itemNameList ? order.orderInfo.itemNameList[0].name : order.recipeInfo?.name ?? ''}
                        />
                        <div className={commonWrapper({ direction: 'col', gap: 4, justify: 'start', align: 'start' })}>
                          {orderType === 'GENERAL'
                          ? (
                            <>
                              <OrderName name={order?.orderInfo?.itemNameList?.[0].name ?? ''} />
                              {order.orderInfo.itemNameList && order.orderInfo.itemNameList.length > 1 && (
                                <Text type='caption' color='gray600'>
                                  외 {order.orderInfo.itemNameList.length - 1}건
                                </Text>
                              )}
                            </>
                          ) : (
                            <>
                              <div className={commonWrapper({ justify: 'start', gap: 4 })}>
                                <Text type='headline4'>{order.orderInfo?.subscribeCount}회차</Text>
                                <Text type='body3' color='gray800'>{order.orderInfo.dogName}</Text>
                              </div>
                              <Text type='caption' color='gray600'>{order.recipeInfo?.name}</Text>
                            </>
                          )
                        }
                        <OrderPrice
                          paymentPrice={order.orderInfo.paymentPrice}
                          label="결제금액"
                        />
                        </div>
                      </div>
                    </div>
                  </CardWrapper>
                </div>
                <Divider thickness={6} color="gray100" />
              </Fragment>
            ))}
            <InfiniteScrollTrigger
              ref={ref}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
        : <EmptyState title='주문 내역이 없습니다.' />}
      </article>
    </section>
  );
}