import axiosInstance from "@/api/axiosInstance";
import OrderHistory from "@/components/pages/mypage/orderHistory/OrderHistory";

export default async function OrderHistoryPage() {
  const subscribeOrderResponse = await axiosInstance.get('/api/orders/subscribe');
  const subscribeOrderData = subscribeOrderResponse.data?._embedded?.querySubscribeOrdersDtoList.map(({ subscribeOrderDto, ...rest }) => ({ orderDto: subscribeOrderDto, ...rest }));
  const generalOrderResponse = await axiosInstance.get('/api/orders/general');
  const generalOrderData = generalOrderResponse.data?._embedded?.queryGeneralOrdersDtoList;

  return (
    <OrderHistory subscribeOrderData={subscribeOrderData} generalOrderData={generalOrderData} />
  )
}
