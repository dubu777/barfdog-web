import * as styles from "@/components/pages/mypage/common/information/Information.css";
import Button from "@/components/common/button/Button";
import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import PaymentCard from "@/components/pages/mypage/common/paymentCard/PaymentCard";
import ChangePaymentMethodModal
from "@/components/pages/mypage/common/modal/changePaymentMethodModal/ChangePaymentMethodModal";
import useModal from "@/hooks/useModal";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { PaymentMethod } from "@/types";

interface SubscriptionPaymentCardInfoProps {
	data: any;
	handleChangePaymentMethod: () => void;
}

const SubscriptionPaymentMethodInfo = ({
	data,
	handleChangePaymentMethod
}: SubscriptionPaymentCardInfoProps) => {
	const { paymentMethodDetail } = usePersistMypageStore();
	const cardDetail = paymentMethodDetail?.subscribeCardDto;
	const paymentMethod = paymentMethodDetail?.paymentMethod;

	const { isOpen, onClose, onToggle } = useModal();

	return (
		<>
		<InfoSection
			title="정기결제 수단"
			isDefaultOpen
		>
			<PaymentCard
				cardSize='sm'
				paymentMethod={paymentMethod as PaymentMethod}
				cardName={cardDetail?.cardName || undefined}
				cardNumber={cardDetail?.cardNumber || undefined}
			/>
			<Button variant="outline" fullWidth size="sm" onClick={onToggle} className={styles.couponButton}>
				결제수단변경
			</Button>
		</InfoSection>
		{isOpen &&
			<ChangePaymentMethodModal
				isOpen={isOpen}
				onClose={onClose}
				data={cardDetail}
				handleChangePaymentMethod={handleChangePaymentMethod}
			/>
		}
		</>
	);
};

export default SubscriptionPaymentMethodInfo;