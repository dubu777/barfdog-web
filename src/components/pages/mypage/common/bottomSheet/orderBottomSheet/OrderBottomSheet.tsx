import * as styles from './OrderBottomSheet.css';
import { pointColor } from "@/styles/common.css";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import OrderCard from "@/components/pages/mypage/common/cards/section/OrderCard";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePersistReviewStore } from "@/store/usePersistReviewStore";
import { CardActionsId, NormalizedCardData, OrderType, ReviewType } from '@/types';
import { ORDER_TYPE } from "@/constants";

interface OrderBottomSheetProps {
	data: NormalizedCardData;
	orderId: number;
	orderType: OrderType;
	isOpen: boolean;
	type: CardActionsId;
	onClose: () => void;
	onPrimaryClick?: () => void;
	isOrderDetail?: boolean;
}

const OrderBottomSheet = ({
	data,
	orderId,
	orderType,
	isOpen,
	type,
	onClose,
	isOrderDetail = false,
}: OrderBottomSheetProps) => {
	const { pushWithQuery } = useDynamicQueryPush();

	const isSubscription = orderType === ORDER_TYPE.SUBSCRIPTION;

	const title = type === 'orderCancel'
		? `정말로 ${isSubscription ? '구독' : '주문'}을 취소하시겠어요?`
		: '구매가 확정되었습니다.';

	const subtitle =
		type === 'orderCancel'
			? <span>주문 즉시 생산 준비에 돌입하는 신선식품의 경우<br/>준비 상태에 따라 승인 과정이 필요할 수 있습니다</span>
			: <span>구매상품은 만족스러우셨나요?<br/>리뷰 쓰고 <span className={pointColor}>최대 1,000원</span>의 적립금 혜택을 받아보세요!</span>;

	const primaryLabel = type === 'orderCancel' ? (isSubscription ? '구독 유지하기' : '주문취소') : '리뷰 작성하기';
	const secondaryLabel = type === 'orderCancel' ? (isSubscription ? '구독 취소' : '이전') : '이전';
	
	const { setReviewFormData } = usePersistReviewStore();
	const handlePrimaryClick = () => {
		// confirm: 리뷰 작성하기
		// cancel: general - 주문취소, subscription - 뒤로가기
		if (type === 'orderCancel' && !isSubscription) {
			// 주문 취소 로직 적용 필요

		} else if (type === 'confirm') {
			const reviewData = {
				orderId: data.id,
				title: data.itemName,
				reviewType: (orderType === ORDER_TYPE.SUBSCRIPTION ? 'SUBSCRIBE' : 'ITEM') as ReviewType,
				orderedDate: data.orderDate || data.nextPaymentDate,
				thumbnailUrl: data.imageUrl
			};

			setReviewFormData(reviewData);
			pushWithQuery('/mypage/review/create', {});
		} else {
			onClose();
		}
	};

	const handleSecondaryClick = () => {
		// cancel: subscription - 구독 해지 페이지 이동
		if (type === 'orderCancel' && isSubscription) {
			pushWithQuery(`/mypage/subscription/${data?.subscribeId}/cancel-subscription`, {} ,['status']);
		} else {
			onClose();
		}
	}

	return (
		<BottomSheet isOpen={isOpen} onClose={onClose} className={styles.bottomSheetContainer} closeButton={false}>
			<div className={styles.bottomSheetTitle}>
				<div>
					{type === 'confirm' && (
						<DefaultText type="title4" color="red">
							{isSubscription ? `정기배송 ${data.subscribeCount || 0}회차` : '일반배송상품'}
						</DefaultText>
					)}
					<DefaultText type="title4">{title}</DefaultText>
				</div>
				<DefaultText type="label4" color="gray600">{subtitle}</DefaultText>
			</div>
			<div className={styles.bottomSheetItem}>
				<div className={styles.bottomSheetItemTitle}>
					<DefaultText type="title4">주문상품</DefaultText>
					{!isOrderDetail &&
						<button onClick={() => pushWithQuery(`/mypage/order-delivery-inquiry/${orderId}`, { orderType })}>
							<DefaultText type="headline4" color="gray400">주문상세</DefaultText>
						</button>
					}
				</div>
				<OrderCard data={data} type="orderDetail" hasBottomSheet />
			</div>
			<ButtonDocked
				type="dual-button"
				primaryButtonSize={type === 'orderCancel' && isSubscription ? 'lg' : 'md'}
				secondaryButtonLabel={secondaryLabel}
				onSecondaryClick={handleSecondaryClick || onClose}
				primaryButtonLabel={primaryLabel}
				onPrimaryClick={handlePrimaryClick}
				secondaryButtonType={type === 'orderCancel' && isSubscription ? 'assistive' : 'primary'}
			/>
		</BottomSheet>
	);
};

export default OrderBottomSheet;
