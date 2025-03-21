import * as styles from '../Card.css';
import { themeVars } from "@/styles/theme.css";
import { useState } from 'react';
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import ArrowIcon from '/public/images/icons/chevron-sort-up.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import CardSection from "@/components/pages/mypage/layout/cards/layout/CardSection";
import CardProductInfo from "@/components/pages/mypage/layout/cards/layout/CardProductInfo";
import CardActions from "@/components/pages/mypage/layout/cards/layout/CardActions";
import CardModal from "@/components/pages/mypage/layout/cards/layout/CardModal";
import { ORDER_DELIVERY_INQUIRY_STATUS } from "@/constants/mypage";

type OrderCardModalKeyType = 'cancel' | 'refundExchange' | 'confirm';

interface OrderCardProps {
	// 마이페이지 주문/배송, 취소/교환/반품 데이터 타입 정의 및 적용 필요
	data: any;
	type: 'orderDeliveryInquiry' | 'orderIssue' | 'orderDetail';
	hasBottomSheet?: boolean;
}

const OrderCard = ({ data, type, hasBottomSheet = false }: OrderCardProps) => {
	const { pushWithQuery } = useDynamicQueryPush();

	const cardDetail = data?.orderDto ? data.orderDto : data;
	const status: keyof typeof ORDER_DELIVERY_INQUIRY_STATUS = 'PAYMENT_DONE';
	const orderType = (data?.recipeName && data?.subscribeId) ? 'subscription' : data.orderType ||  'general';
	const orderId = data?.orderId || data?.id;

	const orderStatusLabel = ORDER_DELIVERY_INQUIRY_STATUS[status]?.label || ''
	const actions = ORDER_DELIVERY_INQUIRY_STATUS[status]?.actions;
	const modifiedActions = actions?.map((action) => ({
		...action,
		label: action.label === '주문취소' && (status === 'BEFORE_PAYMENT' || status === 'PAYMENT_DONE')
			? orderType === 'subscription' ? '구독취소' : action.label
			: status === 'REVIEW_SUBMIT' && action.label === '전체구독일정'
				? orderType === 'general' ? '재구매' : action.label
				:action.label
	}))

	const [isOpenModal, setIsOpenModal] = useState<{
		key: OrderCardModalKeyType | null;
		isOpen: boolean
	}>({
		key: null,
		isOpen: false,
	});

	const handleActions = (url: string | undefined, params: string | undefined, key: string | undefined) => {
		if (status === 'REVIEW_SUBMIT') {
			console.log(url, params, key);
			if (orderType === 'subscription') {
				pushWithQuery(`/mypage${url}/${cardDetail.subscribeId}/${params}`, {})
			} else {
				// 재구매 루트 적용 필요
				pushWithQuery(`/store/${cardDetail.itemId}`, {})
			}
		} else {
			if (!url && key) {
				// 구매확정 버튼 클릭시 OrderBottomSheet -> 현재 주문 관련 데이터 적용으로 확인, 적용 필요
				setIsOpenModal({ key: key as OrderCardModalKeyType, isOpen: true });
			} else {
				pushWithQuery(`/mypage${url}`, {})
			}
		}
	}
	return (
		<CardSection>
			<div className={styles.orderCardInfoTop}>
				<DefaultText type='label4'>
					{orderType === 'subscription' ? `정기배송 ${cardDetail.subscribeCount}회차 ` : '일반배송 '}
					{orderStatusLabel}
				</DefaultText>
				{type === 'orderDeliveryInquiry' && !hasBottomSheet &&
					<button
						className={styles.orderCardDetailButton}
						onClick={() => pushWithQuery(`/mypage/order-delivery-inquiry/${orderId}`, { orderType: orderType })}
					>
						<DefaultText type='headline4' color='red'>주문 상세</DefaultText>
						<SvgIcon src={ArrowIcon} size={20} style={{ transform: 'rotate(90deg)', color: themeVars.colors.red.red }} />
					</button>
				}
			</div>
			<CardProductInfo
				name={cardDetail.name || cardDetail.dogName || cardDetail.itemName}
				imageUrl={cardDetail.thumbnailUrl}
				itemName={cardDetail.recipeName || ''}
				price={cardDetail.paymentPrice}
			/>
			{!hasBottomSheet &&
				<CardActions
					actions={modifiedActions}
					onActionClick={(url, params , key) => handleActions(url, params, key)}
					isButtonWrap
					status={status}
				/>
			}
			<CardModal
				data={cardDetail}
				orderId={orderId}
				orderType={orderType}
				modalState={isOpenModal}
				onClose={() => setIsOpenModal({ key: null, isOpen: false })}
			/>
		</CardSection>
	);
};

export default OrderCard;