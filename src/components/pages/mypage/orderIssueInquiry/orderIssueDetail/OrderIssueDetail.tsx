'use client';
import * as styles from './OrderIssueDetail.css';
import { infoCard, infoContainer, infoDetailContainer, infoItem } from "@/components/pages/mypage/common/information/Information.css";
import { ORDER_ISSUE_TYPE } from "@/constants/mypage";
import SubscriptionInfo from "@/components/pages/mypage/common/information/section/SubscriptionInfo";
import OrderInfo from "@/components/pages/mypage/common/information/section/OrderInfo";
import PaymentInfo from "@/components/pages/mypage/common/information/section/PaymentInfo";
import SubscriptionRefundInfo from "@/components/pages/mypage/common/information/section/SubscriptionRefundInfo";
import AddressInfo from "@/components/pages/mypage/common/information/section/AddressInfo";
import OrderItemInfo from "@/components/pages/mypage/common/information/section/OrderItemInfo";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import StatusTracker from "@/components/pages/mypage/common/statusTracker/StatusTracker";
import { ORDER_TYPE } from '@/constants';

interface OrderIssueDetailProps {
	issueId: string;
	issueType: keyof typeof ORDER_ISSUE_TYPE;
}

const OrderIssueDetail = ({ issueId, issueType }: OrderIssueDetailProps) => {
	const issueTypeName = ORDER_ISSUE_TYPE[issueType];
	const data = {
		"id": 3,
		"issueType": "REFUND",
		"requestDate": "2025.01.15",
		"name": "ProductName",
		"imageUrl": "https://dev.barfdogserver.com/product2-image.jpg",
		"orderPrice": 272400,
		"orderType": 'items',
		"requestStatus": 'COMPLETED',
		"requestReason": '급여 방법을 잘 모르겠어요',
		"subscribeId": 6666,
	}
	
	const steps = () => {
		switch (issueType) {
			case 'CANCEL':
				return [
					{ key: "REQUESTED", label: "접수완료", isActive: data?.requestStatus === "REQUESTED"},
					{ key: "COMPLETED", label: "카드사\n환불요청", isActive: data?.requestStatus === "COMPLETED"},
				];
			case 'REFUND':
				return [
					{ key: "REQUESTED", label: "접수완료", isActive: data?.requestStatus === "REQUESTED"},
					{ key: "PROGRESSING", label: `${issueTypeName} 진행중`, isActive: data?.requestStatus === "PROGRESSING"},
					{ key: "COMPLETED", label: `${issueTypeName}\n처리완료`, isActive: data?.requestStatus === "COMPLETED"},
				];
			case 'EXCHANGE':
				return [
					{ key: "REQUESTED", label: "접수완료", isActive: data?.requestStatus === "REQUESTED"},
					{ key: "PROGRESSING", label: `${issueTypeName} 진행중`, isActive: data?.requestStatus === "PROGRESSING"},
					{ key: "COMPLETED", label: `${issueTypeName}\n처리완료`, isActive: data?.requestStatus === "COMPLETED"},
				]
		}
	};
	return (
		<section className={styles.orderIssueDetailContainer}>
			<StatusTracker statusTitle={`${issueTypeName} 진행중`} steps={steps()} />
			{/* orderType 수정 및 데이터 타입 확인 필요 */}
			<OrderItemInfo type='orderIssue' data={data} orderType={data.orderType as 'items'} />
			{issueType === 'CANCEL' && data.orderType === 'subscription' &&
				<article className={infoContainer({ isOpen: true })}>
					<div className={infoItem}>
						<DefaultText type='title4'>취소사유</DefaultText>
					</div>
					<Card shadow='none' className={`${infoDetailContainer} ${infoCard}`}>
						<DefaultText type='body3'>{data.requestReason}</DefaultText>
					</Card>
				</article>
			}
			<AddressInfo data={data} />
			{data.orderType === ORDER_TYPE.SUBSCRIPTION
				? <SubscriptionInfo subscriptionId={data?.subscribeId} data={data} type='orderIssue' />
				: <OrderInfo data={data} type='orderIssue' items={[]} />
			}
			{issueType === 'EXCHANGE' || data.requestStatus !== 'COMPLETED'
				? <PaymentInfo data={data} type='orderIssue' />
				: <SubscriptionRefundInfo data={data} />
			}
		</section>
	);
};

export default OrderIssueDetail;