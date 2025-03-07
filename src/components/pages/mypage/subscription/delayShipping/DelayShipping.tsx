'use client';
import * as styles from './DelayShipping.css';
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { pointColor } from "@/styles/common.css";
import { getProductionDates } from "@/utils";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InfoIcon from '/public/images/myPage/info-red.svg';
import WeeklyDatePicker from "@/components/common/weeklyDatePicker/WeeklyDatePicker";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

const DelayShipping = ({ subscribeId }: { subscribeId: number }) => {
	const { data: detail } = useGetSubscriptionDetail(subscribeId);
	const defaultProductionDates = getProductionDates(detail.nextDeliveryDate);

	const handleSubmit = () => {

	}
	return (
		<section className={styles.delayShippingContainer}>
			<article className={styles.userShippingBox}>
				<div className={styles.userShippingText}>
					<DefaultText type='title4'>최대 8주까지 미룰 수 있어요</DefaultText>
					<DefaultText type='label4' color='gray600' className={styles.dogName}>
						{detail.dogName}의<br/>
						<span className={pointColor}>정기배송 {detail.subscribeCount + 1}회차 신규 도착 예정일</span>을 변경하시겠어요?
					</DefaultText>
				</div>
				<div className={styles.userShippingDate}>
					<div className={styles.dateBox}>
						<DefaultText type='caption' color='gray500'>기존 도착 예정일</DefaultText>
						<DefaultText type='label1'>{defaultProductionDates.receivingDate}</DefaultText>
					</div>
					<div className={styles.dateBox}>
						<DefaultText type='caption' color='gray500'>신규 도착 예정일</DefaultText>
						<DefaultText type='label1' color='red'>신규 도착 예정일</DefaultText>
					</div>
				</div>
			</article>
			<article className={styles.selectShippingBox}>
				<DefaultText type='headline2'>발송 희망 주차를 선택해주세요</DefaultText>
				<WeeklyDatePicker />

			</article>
			<article className={styles.shippingInfoBox}>
				<div className={styles.shippingInfo}>
					<InfoIcon />
					<DefaultText type='label4' color='pastelRed' className={styles.infoText}>
						&lsquo;배송 희망일&apos; 변경 시, 선택한 주차를 기준으로 전체 남은 회차의 배송 일정이 변경됩니다.<br/>
						&lsquo;배송 주기&apos;의 변경을 희망하는 경우 ‘식단 변경’ 페이지를 이용해주세요.<br/>
						&lsquo;배송 희망일&apos;이 공휴일과 겹쳤을 시 다음 영업일에 발송이 진행됩니다.
					</DefaultText>
				</div>
			</article>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='저장하기'
				onPrimaryClick={handleSubmit}
			/>
		</section>
	);
};

export default DelayShipping;