import * as styles from '../Card.css';
import { themeVars } from "@/styles/theme.css";
import { useState } from 'react';
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import ArrowIcon from '/public/images/icons/chevron-sort-up.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import BaseCard from "@/components/pages/mypage/common/cards/section/BaseCard";
import { ORDER_TYPE, subscriptionPlanInfo } from "@/constants";
import { IsOpenCardModal, NormalizedOrderCardData, CardActionsId } from "@/types";
import { getOrderStatusActions } from "@/utils/mypage/getOrderStatusActions";

type OrderCardType = 'orderDeliveryInquiry' | 'orderIssue' | 'orderDetail';

interface OrderCardProps {
	// 마이페이지 주문/배송, 취소/교환/반품 데이터 타입 정의 및 적용 필요
	data: any;
	type: OrderCardType;
	hasBottomSheet?: boolean;
}

const normalizeOrderData = (orderData: any): NormalizedOrderCardData => {
	const data = orderData?.orderDto ? orderData.orderDto : orderData;
	console.log('normalizeOrderData', orderData)
	return {
		id: data.orderId || data.id || data.itemId,
		name: data.name || data.dogName || data.itemName || '',
		imageUrl: data.thumbnailUrl || '',
		itemName: data.recipeName || '',
		price: data.paymentPrice || data.finalPrice || '',
		plan: subscriptionPlanInfo?.[data.plan] || null,
		orderType: data.orderType === 'subscribe' ? ORDER_TYPE.SUBSCRIPTION : data.orderType,
		status: data.orderStatus || data.status,
		// status: 'REVIEW_SUBMIT',
		subscribeId: data?.subscribeId || null,
		subscribeCount: data.subscribeCount || null,
		amount: data.amount || null,
		optionNames: data?.selectOptionDtoList?.map(option => option.optionName).join(' ,') || null,
	};
};

const OrderCard = ({ data, type, hasBottomSheet = false }: OrderCardProps) => {
	const { pushWithQuery } = useDynamicQueryPush();

	const normalizedData = hasBottomSheet ? data : normalizeOrderData(data);
	const status = normalizedData.status;
	const orderType = normalizedData.orderType;

	const orderStatusLabelActions = getOrderStatusActions(status, orderType, type);
	const orderActions = orderStatusLabelActions?.actions;
	const orderStatusLabel = orderStatusLabelActions?.label;

	const [isOpenModal, setIsOpenModal] = useState<IsOpenCardModal>({ id: null, isOpen: false });

	const handleActions = (url?: string, params?: string, id?: CardActionsId) => {
		switch (id) {
			case 'subscriptionSchedule': {
				if (orderType === ORDER_TYPE.SUBSCRIPTION) {
					console.log('전체구독일정')
					pushWithQuery(`/mypage${url}/${normalizedData.subscribeId}/${params}`, {})
				} else {
					console.log('재구매')
				}
				break;
			}
			case 'subscriptionDetail': {
				console.log('구독조회');
				// pushWithQuery(`/mypage/subscription/${normalizedData?.subscribeId}`, {}, ['orderType']);
				break;
			}
			case 'itemDetail': {
				pushWithQuery(`/store/${normalizedData.id}`, {});
				break;
			}
			case 'orderCancel':
			case 'refundExchange':
			case 'confirm': {
				console.log(id)
				setIsOpenModal({ id: id as CardActionsId, isOpen: true });
				break;
			}
			case 'orderDetail': {
				pushWithQuery(`/mypage/ordersy/${normalizedData.id}`, { orderType: orderType });
				break;
			}
			case 'deliveryTracking': {
				console.log('배송조회')
				break;
			}
			case 'review': {
				console.log('리뷰작성')
				break;
			}
			case 'repurchase': {
				console.log('재구매')
				break;
			}
			default: return;
		}
	}
	return (
		<BaseCard
			type='order'
			data={normalizedData}
			align='between'
			cardHeaderTitle={
				<div className={styles.orderCardInfoTop}>
					<Text type='label4'>
						{orderType === ORDER_TYPE.SUBSCRIPTION ? `정기배송 ${normalizedData.subscribeCount}회차 ` : '일반배송 '}
						<span>
							{orderStatusLabel}
						</span>
					</Text>
					{type === 'orderDeliveryInquiry' && !hasBottomSheet &&
					<button
						className={styles.orderCardDetailButton}
						onClick={() => pushWithQuery(`/mypage/orders/${normalizedData.id}`, { orderType: orderType })}
					>
						<Text type='headline4' color='red'>주문 상세</Text>
						<SvgIcon src={ArrowIcon} size={20} style={{ transform: 'rotate(90deg)', color: themeVars.colors.red.red }} />
					</button>
					}
				</div>
			}
			cardActions={orderActions}
			handleActions={handleActions}
			showCardActions={!hasBottomSheet}
			isOpenModal={isOpenModal}
			setIsOpenModal={setIsOpenModal}
			isOrderDetail={type === 'orderDetail'}
		/>
	);
};

export default OrderCard;