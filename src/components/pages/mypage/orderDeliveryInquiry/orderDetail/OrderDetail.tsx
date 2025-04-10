'use client';
import * as styles from './OrderDetail.css';
import { useSearchParams } from "next/navigation";
import AddressInfo from "@/components/pages/mypage/common/information/section/AddressInfo";
import OrderInfo from "@/components/pages/mypage/common/information/section/OrderInfo";
import SubscriptionInfo from "@/components/pages/mypage/common/information/section/SubscriptionInfo";
import PaymentInfo from "@/components/pages/mypage/common/information/section/PaymentInfo";
import OrderItemInfo from "@/components/pages/mypage/common/information/section/OrderItemInfo";
import ReceiptInfo from "@/components/pages/mypage/common/information/section/ReceiptInfo";
import { useGetOrderDetail } from "@/api/order/queries/useGetOrderDetail";
import { ORDER_TYPE } from "@/constants";
import { OrderType } from "@/types";

interface OrderDeliveryDetailProps {
	orderId: number;
	orderType: OrderType;
}

const OrderDetail = ({ orderId, orderType }: OrderDeliveryDetailProps) => {
	const { data: orderDetailData } = useGetOrderDetail(orderId, orderType);
	const { orderDto, orderItemDtoList } = orderDetailData;
	const searchParams = useSearchParams();
	const showReceipt = searchParams.get('showReceipt');

	return (
		<section className={styles.orderDeliveryDetailContainer({ showReceipt: !!showReceipt })}>
			{!showReceipt ?
				<>
					<OrderItemInfo data={orderDetailData} orderType={orderType} />
					<AddressInfo data={orderDto} showEditAddressInfo />
					{orderType === ORDER_TYPE.GENERAL
						? <OrderInfo data={orderDto} items={orderItemDtoList} type='orderDetail' />
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