import * as styles from './OrderBottomSheet.css';
import { pointColor } from "@/styles/common.css";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import OrderCard from "@/components/pages/mypage/common/cards/section/OrderCard";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePersistReviewStore } from "@/store/usePersistReviewStore";
import { ReviewType } from '@/types';

interface OrderBottomSheetProps {
	data: any;
	orderId: number;
	orderType: 'general' | 'subscription';
	isOpen: boolean;
	type: 'cancel' | 'confirm';
	onClose: () => void;
	onPrimaryClick?: () => void;
}

const OrderBottomSheet = ({
	data,
	orderId,
	orderType,
	isOpen,
	type,
	onClose,
}: OrderBottomSheetProps) => {
	const orderData = {
		...data,
		orderType: orderType,
		subscribeCount: data.subscribeCount || 0
	}

	const { pushWithQuery } = useDynamicQueryPush();

	const isSubscription = orderType === 'subscription';

	const title = type === 'cancel'
		? `정말로 ${isSubscription ? '구독' : '주문'}을 취소하시겠어요?`
		: '구매가 확정되었습니다.';

	const subtitle =
		type === 'cancel'
			? <span>주문 즉시 생산 준비에 돌입하는 신선식품의 경우<br/>준비 상태에 따라 승인 과정이 필요할 수 있습니다</span>
			: <span>구매상품은 만족스러우셨나요?<br/>리뷰 쓰고 <span className={pointColor}>최대 1,000원</span>의 적립금 혜택을 받아보세요!</span>;

	const primaryLabel = type === 'cancel' ? (isSubscription ? '구독 유지하기' : '주문취소') : '리뷰 작성하기';
	const secondaryLabel = type === 'cancel' ? (isSubscription ? '구독 취소' : '이전') : '이전';

	console.log('orderBottomSheet', orderData)
	console.log('type', type)
	console.log('isSubscription', isSubscription)
	const { setReviewFormData } = usePersistReviewStore();
	const handlePrimaryClick = () => {
		// confirm: 리뷰 작성하기
		// cancel: general - 주문취소, subscription - 뒤로가기
		if (type === 'cancel' && !isSubscription) {
			// 주문 취소 로직 적용 필요

		} else if (type === 'confirm') {
			const reviewData = {
				orderId: data.orderId || data.id,
				title: data.recipeName,
				reviewType: (orderType === 'subscription' ? 'SUBSCRIBE' : 'ITEM') as ReviewType,
				orderedDate: data.orderDate,
				thumbnailUrl: data.thumbnailUrl
			};

			setReviewFormData(reviewData);
			pushWithQuery('/mypage/review/create', {});
		} else {
			onClose();
		}
	};

	const handleSecondaryClick = () => {
		// cancel: subscription - 구독 해지 페이지 이동
		if (type === 'cancel' && isSubscription) {
			pushWithQuery(`/mypage/subscription/${data.subscribeId}/cancel-subscription`, {} ,['status']);
		} else {
			onClose();
		}
	}

	return (
		<BottomSheet isOpen={isOpen} onClose={onClose} className={styles.bottomSheetContainer}>
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
					<button onClick={() => pushWithQuery(`/mypage/order-delivery-inquiry/${orderId}`, { orderType })}>
						<DefaultText type="headline4" color="gray400">주문상세</DefaultText>
					</button>
				</div>
				<OrderCard data={orderData} type="orderDeliveryInquiry" hasBottomSheet />
			</div>
			<ButtonDocked
				type="dual-button"
				primaryButtonSize={type === 'cancel' && isSubscription ? 'lg' : 'md'}
				secondaryButtonLabel={secondaryLabel}
				onSecondaryClick={handleSecondaryClick || onClose}
				primaryButtonLabel={primaryLabel}
				onPrimaryClick={handlePrimaryClick}
				secondaryButtonType={type === 'cancel' && isSubscription ? 'assistive' : 'primary'}
			/>
		</BottomSheet>
	);
};

export default OrderBottomSheet;
