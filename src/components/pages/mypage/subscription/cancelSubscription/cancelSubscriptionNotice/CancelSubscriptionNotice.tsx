import * as styles from './CancelSubscriptionNotice.css';
import { pointColor } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SubscriptionCard from "@/components/pages/mypage/common/cards/section/SubscriptionCard";
import Card from "@/components/common/card/Card";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import InfoIcon from '/public/images/icons/info.svg';
import InfoText from "@/components/pages/mypage/common/infoText/InfoText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useBackNavigation } from "@/utils";
import { SubscriptionDetailDto } from "@/types";

const cancellationNotices = [
	'결제 예정 상태라면, 이번 회차부터 해지가 가능합니다.',
	'결제 완료 후 생산 전이라면, 해지와 함께 전액 환불됩니다.',
	'결제 완료 후 생산이 시작된 경우, 다음 회차부터 해지가 적용됩니다.',
	'구독이 해지되면 할인 혜택과 정기 배송도 함께 종료됩니다.',
	'해지 시 적용된 쿠폰과 적립금은 자동으로 복원되며, 유효기간이 남아있는 경우에만 다시 사용하실 수 있습니다.',
]

interface CancelSubscriptionNoticeProps {
	subscriptionDetail: SubscriptionDetailDto;
	enableCompletedMode: () => void;
	isBeforePaying: boolean;
	isAfterProducing: boolean;
}

const CancelSubscriptionNotice = ({
	subscriptionDetail,
	enableCompletedMode,
	isBeforePaying,
	isAfterProducing,
}: CancelSubscriptionNoticeProps) => {
	const goBack = useBackNavigation();
	return (
		<>
			<div className={styles.cancelSubscriptionTitle}>
				<DefaultText type='title2'>
					{!isAfterProducing
						? <>정말로 구독을<br/>해지하시겠어요?</>
						:
							<>
								다음 회차인 <span className={pointColor}>{subscriptionDetail.subscribeCount+1}회차</span>부터<br/>
								구독 해지가 적용돼요
							</>
					}
				</DefaultText>
				<DefaultText type='body2' color='gray600'>
					{!isAfterProducing
						? '지금 해지하시면 우리아이 맞춤 식사가 종료돼요. 정기 할인 혜택과 정기 배송은 더이상 제공되지 않아요.'
						: <>
							<span className={pointColor}>이번 회차는 이미 생산이 시작되어 정상 배송돼요.</span>
							구독은 다음 회차부터 해지되며, 할인 혜택과 정기 배송도 함께 종료돼요
						</>
					}
				</DefaultText>
			</div>
			<div className={styles.cancelSubscriptionCard}>
				<SubscriptionCard
					data={subscriptionDetail}
					type='subscription'
					showActions={false}
				/>
			</div>
			{isBeforePaying &&
				<>
				환불 예정 금액 적용 필요
					{/*<SubscriptionRefundInfo />*/}
				</>
			}
			<div className={styles.cancelSubscriptionNotice}>
				<Card padding={12} shadow='none' align='start' className={styles.cancelSubscriptionNoticeBox}>
					<div className={styles.cancelSubscriptionNoticeTitle}>
						<SvgIcon src={InfoIcon} color='pastelRed' size={24} />
						<DefaultText type='label4' color='pastelRed'>구독 해지 안내</DefaultText>
					</div>
					<div className={styles.cancelSubscriptionNoticeList}>
						{cancellationNotices.map(notice => (
							<InfoText key={notice} text={notice} color='pastelRed' />
						))}
					</div>
				</Card>
			</div>
			<ButtonDocked
				type='dual-button'
				secondaryButtonLabel='해지하기'
				secondaryButtonType='assistive'
				onSecondaryClick={enableCompletedMode}
				primaryButtonSize='lg'
				primaryButtonLabel='구독 유지하기'
				onPrimaryClick={goBack}
			/>
		</>
	);
};

export default CancelSubscriptionNotice;