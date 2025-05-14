import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import OrderBottomSheet from "@/components/pages/mypage/common/bottomSheet/orderBottomSheet/OrderBottomSheet";
import { CardActionsId, IsOpenCardModal, NormalizedCardData, OrderType } from "@/types";
import SubscriptionAllScheduleModal
	from "@/components/pages/mypage/common/modal/subscriptionAllScheduleModal/SubscriptionAllScheduleModal";
import PostponeShippingModal from "../../modal/postponeShippingModal/PostponeShippingModal";

interface CardModalProps {
	data: NormalizedCardData;
	orderId: number;
	orderType: OrderType;
	modalState: IsOpenCardModal;
	onClose: () => void;
	isOrderDetail?: boolean;
}

const CardModal = ({
	data,
	orderId,
	orderType,
	modalState,
	onClose,
	isOrderDetail = false,
}: CardModalProps) => {
	if (!modalState.isOpen) return null;

	switch (modalState.id) {
		case 'refundExchange':
			return (
				<AlertModal
					isOpen={modalState.isOpen}
					onClose={onClose}
					title="반품/교환 안내"
					content={`신선식품, 맞춤 제작 식품의 경우 판매자 귀책\n 상품에 한하여 반품 및 교환 신청이 가능합니다.`}
					confirmText="반품/교환 문의"
					cancelText="돌아가기"
					onConfirm={() => console.log('반품/교환 문의')}
					onCancel={onClose}
				/>
			)
		case 'subscriptionSchedule':
			return (
				<SubscriptionAllScheduleModal
					isOpen={modalState.isOpen}
					onClose={onClose}
				/>
			)
		case 'postponeShipping':
			if(modalState.subscriptionId) {
				return (
					<PostponeShippingModal
						subscriptionId={modalState.subscriptionId}
						isOpen={modalState.isOpen}
						onClose={onClose}
					/>
				)
			}
			return;
		default:
			return (
				<OrderBottomSheet
					data={data}
					orderId={orderId}
					orderType={orderType}
					isOpen={modalState.isOpen}
					type={modalState.id as CardActionsId}
					onClose={onClose}
					isOrderDetail={isOrderDetail}
				/>
			)
	}
};

export default CardModal;