'use client';
import * as styles from './OrderDetail.css';
import { useSearchParams } from "next/navigation";
import AddressInfo from "@/components/pages/mypage/common/information/section/AddressInfo";
import OrderInfo from "@/components/pages/mypage/common/information/section/OrderInfo";
import SubscriptionInfo from "@/components/pages/mypage/common/information/section/SubscriptionInfo";
import PaymentInfo from "@/components/pages/mypage/common/information/section/PaymentInfo";
import OrderItemInfo from "@/components/pages/mypage/common/information/section/OrderItemInfo";
import ReceiptInfo from "@/components/pages/mypage/common/information/section/ReceiptInfo";
import { OrderType } from "@/types";
import { useGetOrderDetail } from "@/api/order/queries/useGetOrderDetail";

interface OrderDeliveryDetailProps {
	orderId: number;
	orderType: OrderType;
}

const OrderDetail = ({ orderId, orderType }: OrderDeliveryDetailProps) => {
	const { data: orderDetailData } = useGetOrderDetail(orderId, orderType);
	const { orderDto } = orderDetailData;
	const searchParams = useSearchParams();
	const showReceipt = searchParams.get('showReceipt');

	return (
		<section className={styles.orderDeliveryDetailContainer({ showReceipt: !!showReceipt })}>
			{!showReceipt ?
				<>
					<OrderItemInfo data={orderDetailData} orderType='general' />
					<AddressInfo data={orderDto} />
					{orderType === 'general'
						? <OrderInfo data={orderDto} type='orderDetail' />
						: <SubscriptionInfo subscriptionId={orderId} data={orderDto} type='orderDetail' />
					}
					<PaymentInfo data={orderDto} type='orderDetail' />
				</>
				: <ReceiptInfo data={orderDto} />
			}
		</section>
	);
};

export default OrderDetail;