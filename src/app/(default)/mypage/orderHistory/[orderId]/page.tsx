import axiosInstance from "@/api/axiosInstance";
import OrderDetail from "@/components/pages/mypage/orderHistory/[orderId]/orderDetail/OrderDetail";

interface OrderDetailPageProps {
  params: {
    orderId: string;
  };
  searchParams: {
    type: string;
  }
}
const mergeOrderAndRecipe = (data) => {
  return {
    ...data,
    orderItemDtoList: data.orderItemDtoList
      ? [...data.orderItemDtoList] : undefined,
    orderDto: {
      ...data.orderDto,
      ...data.recipeDto
    },
    recipeDto: undefined
  };
};

export default async function OrderDetailPage({ params, searchParams }: OrderDetailPageProps) {
  const { orderId } = params;
  const { type } = searchParams;
  const { data: orderDetailData } = await axiosInstance.get(`/api/orders/${orderId}/${type}`);
  return (
    <OrderDetail type={type} orderDetailData={mergeOrderAndRecipe(orderDetailData)} />
  )
}
