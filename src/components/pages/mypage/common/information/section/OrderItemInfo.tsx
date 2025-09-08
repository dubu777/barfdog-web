import Text from "@/components/common/text/Text";
import * as styles from "../Information.css";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePathname } from "next/navigation";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import OrderCard from "@/components/pages/mypage/common/cards/section/OrderCard";
import OrderIssueCard from "@/components/pages/mypage/common/cards/section/OrderIssueCard";
import { ORDER_TYPE } from "@/constants";
import { OrderType } from "@/types";

interface OrderItemInfoProps {
	data: any;
	orderType: OrderType | 'items';
	subscriptionId?: number;
	type?: 'default' | 'orderIssue' | 'subscriptionDetail';
}

const OrderItemInfo = ({ data, orderType, type = 'default' }: OrderItemInfoProps) => {
	const { pushWithQuery } = useDynamicQueryPush();
	const pathname = usePathname();
	
	const handleShowReceipt = () => {
		pushWithQuery(`${pathname}`, { showReceipt: true });
	}

	return (
		<article className={styles.infoContainer({ isOpen: true })}>
			<div className={styles.infoItem}>
				<Text type='title4'>주문 상품</Text>
				{type !== 'orderIssue' &&
					<button onClick={handleShowReceipt}><Text type='label4' color='gray400'>영수증 보기</Text></button>
				}
			</div>
			<div className={styles.infoDetailContainer}>
				{type === 'default' ? (
					orderType === ORDER_TYPE.SUBSCRIPTION
						? <OrderCard data={data?.orderDto || data} type='orderDetail' />
						: data?.orderItemDtoList.length > 0
							? <div className={styles.infoList}>
								{data?.orderItemDtoList?.map(item => (
									<OrderCard key={item.itemId} data={{...item, orderType: orderType}} type='orderDetail' />
								))}
							</div>
							: <OrderCard data={data} type='orderDetail' />
					)
					: type === 'orderIssue'
						? <OrderIssueCard data={data} issueType={data.issueType} orderType={orderType as OrderType} isDetail />
						: <SubscriptionCard data={data} type='subscriptionDetail' />
				}
			</div>
		</article>
	);
};
export default OrderItemInfo;