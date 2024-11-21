import * as styles from "./OrderHistory.css";
import { GeneralOrderData, SubscribeOrderData } from "@/types/order";
import OrderHistoryFilter from "@/components/pages/mypage/orderHistory/orderHistoryFilter/OrderHistoryFilter";
import OrderHistoryList from "@/components/pages/mypage/orderHistory/orderHistoryList/OrderHistoryList";

interface OrderHistoryProps {
  subscribeOrderData: SubscribeOrderData[] | undefined;
  generalOrderData: GeneralOrderData[] | undefined;
}

const OrderHistory = ({ generalOrderData, subscribeOrderData }: OrderHistoryProps) => {
  const totalData: GeneralOrderData | SubscribeOrderData =
    [...generalOrderData, ...subscribeOrderData]?.sort((a, b) => new Date(b.orderDto.orderDate) - new Date(a.orderDto.orderDate));
  return (
    <section className={styles.orderHistoryContainer}>
      <OrderHistoryFilter />
      <OrderHistoryList orderList={totalData} />
    </section>
  );
};

export default OrderHistory;
