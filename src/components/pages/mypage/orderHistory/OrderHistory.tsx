import * as styles from "./OrderHistory.css";
import { GeneralOrderData, MixedOrderData, SubscribeOrderData } from "@/types/order";
import OrderHistoryFilter from "@/components/pages/mypage/orderHistory/orderHistoryFilter/OrderHistoryFilter";
import OrderHistoryList from "@/components/pages/mypage/orderHistory/orderHistoryList/OrderHistoryList";

interface OrderHistoryProps {
  subscribeOrderData: SubscribeOrderData[];
  generalOrderData: GeneralOrderData[];
}


const OrderHistory = ({ generalOrderData, subscribeOrderData }: OrderHistoryProps) => {
  const totalData: MixedOrderData =
    [...generalOrderData, ...subscribeOrderData]?.sort((a, b) => new Date(b.orderDto.orderDate).getTime() - new Date(a.orderDto.orderDate).getTime());
  return (
    <section className={styles.orderHistoryContainer}>
      <OrderHistoryFilter />
      <OrderHistoryList orderList={totalData} />
    </section>
  );
};

export default OrderHistory;
