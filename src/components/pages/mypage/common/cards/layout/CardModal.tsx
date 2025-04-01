import { OrderType } from "@/types";
import Modal from "@/components/common/modal/Modal";
import OrderBottomSheet from "@/components/pages/mypage/common/bottomSheet/orderBottomSheet/OrderBottomSheet";

interface CardModalProps {
	data: any;
	orderId: number;
	orderType: OrderType;
	modalState: { key: 'cancel' | 'refundExchange' | 'confirm' | null; isOpen: boolean };
	onClose: () => void;
}

const CardModal = ({
	data,
	orderId,
	orderType,
	modalState,
	onClose,
}: CardModalProps) => {
	if (!modalState.isOpen) return null;

	return modalState.key === 'refundExchange' ? (
		<Modal
			isOpen={modalState.isOpen}
			onClose={onClose}
			title="반품/교환 안내"
			content={`신선식품, 맞춤 제작 식품의 경우 판매자 귀책\n 상품에 한하여 반품 및 교환 신청이 가능합니다.`}
			confirmText="반품/교환 문의"
			cancelText="돌아가기"
			onConfirm={() => console.log('반품/교환 문의')}
			onCancel={onClose}
		/>
	) : (
		<OrderBottomSheet
			data={data}
			orderId={orderId}
			orderType={orderType}
			isOpen={modalState.isOpen}
			type={modalState.key === 'cancel' ? 'cancel' : 'confirm'}
			onClose={onClose}
		/>
	);
};

export default CardModal;