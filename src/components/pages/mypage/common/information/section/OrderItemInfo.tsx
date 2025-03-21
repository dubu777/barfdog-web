import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "../Information.css";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePathname } from "next/navigation";
import { OrderType } from "@/types";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import OrderCard from "@/components/pages/mypage/common/cards/section/OrderCard";
import OrderIssueCard from "@/components/pages/mypage/common/cards/section/OrderIssueCard";

interface OrderItemInfoProps {
	data: any;
	orderType: OrderType;
	subscriptionId?: number;
	type?: 'default' | 'orderIssue';
}

const OrderItemInfo = ({ data, orderType, subscriptionId, type = 'default' }: OrderItemInfoProps) => {
	const { pushWithQuery } = useDynamicQueryPush();
	const pathname = usePathname();
	console.log(pathname);
	const handleShowReceipt = () => {
		pushWithQuery(`${pathname}`, { showReceipt: true });
	}
	return (
		<article className={styles.infoContainer({ isOpen: true })}>
			<div className={styles.infoItem}>
				<DefaultText type='title4'>주문 상품</DefaultText>
				{type === 'default' &&
					<button onClick={handleShowReceipt}><DefaultText type='label4' color='gray400'>영수증 보기</DefaultText></button>
				}
			</div>
			<div className={styles.infoDetailContainer}>
				{type === 'default' ? (
					orderType === 'subscription'
						? <SubscriptionCard data={data} type='subscriptionDetail' subscriptionId={subscriptionId} />
						: data?.orderItemDtoList.length > 0
							? <div className={styles.infoList}>
								{data?.orderItemDtoList?.map(item => (
									<OrderCard key={item.itemId} data={item} type='orderDetail' />
								))}
							</div>
							: <OrderCard data={data} type='orderDetail' />
					) : (
						<OrderIssueCard data={data} issueType={data.issueType} orderType={orderType} isDetail />
					)
				}
			</div>
		</article>
	);
};
export default OrderItemInfo;