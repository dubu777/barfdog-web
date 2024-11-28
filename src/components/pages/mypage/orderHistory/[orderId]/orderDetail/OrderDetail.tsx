'use client';
import * as styles from "./OrderDetail.css";
import { MergeOrderAndRecipe } from "@/types/order";
import OrderItemsInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderItemsInfo/OrderItemsInfo";
import OrderGeneralInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderGeneralInfo/OrderGeneralInfo";
import OrderPaymentInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderPaymentInfo/OrderPaymentInfo";
import OrderDeliveryInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderDeliveryInfo/OrderDeliveryInfo";
import OrderPriceInfo from "@/components/pages/mypage/orderHistory/[orderId]/orderPriceInfo/OrderPriceInfo";


interface OrderDetailProps {
  type: string;
  orderDetailData: MergeOrderAndRecipe;
}

const OrderDetail = ({ type, orderDetailData }: OrderDetailProps) => {
  const { orderDto } = orderDetailData;

  return (
    orderDto && <section className={styles.orderDetailContainer}>
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