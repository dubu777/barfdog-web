import { Fragment } from "react";
import * as styles from "@/components/pages/mypage/common/information/Information.css";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import Chips from "@/components/common/chips/Chips";
import CouponModal from "@/components/pages/order/common/modal/couponModal/CouponModal";
import useModal from "@/hooks/useModal";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import { ORDER_TYPE } from "@/constants";

interface SubscriptionPaymentInfoProps {
	data: any;
}

const SubscriptionPaymentInfo = ({
	data,
}: SubscriptionPaymentInfoProps) => {
	const orderPrice = data.nextPaymentPrice;
	const orderType = ORDER_TYPE.SUBSCRIPTION;
	const { data: coupons } = useGetCouponList();
	const { isOpen, onClose, onToggle } = useModal();

	const paidInfo = [
		{ label: '현재 회차', subLabel: `${data.subscribeCount}회차 결제 금액`, value: '적용 필요' },
		{ label: '다음 회차', subLabel: `${data.subscribeCount+1}회차 결제 금액`, value: `${data.nextPaymentPrice.toLocaleString()}원` },
	]

	return (
		<>
		<InfoSection
			title="결제 정보"
			isDefaultOpen
		>
			<div className={styles.infoBoxItemColumn}>
				{paidInfo.map((info, index) => (
					<Fragment key={info.label}>
						<div className={styles.subscriptionPaymentItem}>
							<div className={styles.infoBoxItem}>
								<Chips variant='outlined' size='sm' borderRadius='full'>{info.label}</Chips>
								<DefaultText type='label2' color='gray700'>{info.subLabel}</DefaultText>
							</div>
							<DefaultText type='headline2'>{info.value}</DefaultText>
						</div>
						{index === 0 && <Divider thickness={1} color='gray200' />}
					</Fragment>
				))}
			</div>
			<Button variant="outline" fullWidth size="sm" onClick={onToggle} className={styles.couponButton}>
				이번 회차에 쿠폰 적용
			</Button>
		</InfoSection>
		{isOpen &&
			<CouponModal
				orderType={orderType}
				coupons={coupons}
				isOpen={isOpen}
				onClose={onClose}
				orderPrice={orderPrice}
			/>
		}
		</>
	);
};

export default SubscriptionPaymentInfo;