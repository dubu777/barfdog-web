'use client';
import * as styles from "./OrderDetail.css";
import OrderItemsInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderItemsInfo/OrderItemsInfo";
import OrderGeneralInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderGeneralInfo/OrderGeneralInfo";
import OrderPaymentInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderPaymentInfo/OrderPaymentInfo";
import OrderDeliveryInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderDeliveryInfo/OrderDeliveryInfo";
import OrderPriceInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderPriceInfo/OrderPriceInfo";
import { useGetOrderDetail } from "@/api/order/queries/useGetOrderDetail";
import { OrderDetailType } from "@/types";

interface OrderDetailProps {
  type: OrderDetailType;
  orderId: string;
}

const OrderDetail = ({ type, orderId }: OrderDetailProps) => {
  const { data: orderDetailData } = useGetOrderDetail(orderId, type);
  const { orderDto } = orderDetailData;

  if (!orderDto) return null;
  return (
    <section className={styles.orderDetailContainer}>
      <article>
        <OrderItemsInfo orderDetailData={orderDetailData}/>
      </article>
      <article>
        <OrderPriceInfo orderDto={orderDto} />
      </article>
      <article>
        <OrderPaymentInfo type={type} orderDto={orderDto} />
      </article>
      <article>
        <OrderGeneralInfo type={type} orderDto={orderDto} />
      </article>
      <article>
        <OrderDeliveryInfo type={type} orderDto={orderDto} />
      </article>
    </section>
  );
};

export default OrderDetail;