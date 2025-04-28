import * as styles from "@/components/pages/mypage/common/information/Information.css";
import Button from "@/components/common/button/Button";
import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import PaymentCard from "@/components/pages/mypage/common/paymentCard/PaymentCard";
import InfoBox from "@/components/common/infoBox/InfoBox";
import ChangePaymentMethodModal
from "@/components/pages/mypage/common/modal/changePaymentMethodModal/ChangePaymentMethodModal";
import useModal from "@/hooks/useModal";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { PaymentMethod } from "@/types";

interface SubscriptionPaymentCardInfoProps {
	subscribeCount: number;
	isBeforePaying: boolean;
}

const SubscriptionPaymentMethodInfo = ({
	subscribeCount,
	isBeforePaying,
}: SubscriptionPaymentCardInfoProps) => {
	const { paymentMethodDetail } = usePersistMypageStore();
	const cardDetail = paymentMethodDetail?.subscribeCardDto;
	const paymentMethod = paymentMethodDetail?.paymentMethod;

	const isChangedPaymentMethod = false;
	const subscribeCountByStatus = isBeforePaying ? subscribeCount : subscribeCount + 1;


	const { isOpen, onClose, onToggle } = useModal();

	return (
		<>
		<InfoSection
			title="정기결제 수단"
			isDefaultOpen
		>
			{isChangedPaymentMethod &&
				<InfoBox text={`${subscribeCountByStatus}회차부터 결제수단 변경이 적용돼요`} color='blue' />
			}
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
				subscribeCountByStatus={subscribeCountByStatus}
				isBeforePaying={isBeforePaying}
			/>
		}
		</>
	);
};

export default SubscriptionPaymentMethodInfo;