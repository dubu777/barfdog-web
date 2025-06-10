import * as styles from './SubscriptionAllScheduleModal.css';
import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ArrowIcon from '/public/images/icons/chevron-sort-up.svg';
import { themeVars } from "@/styles/theme.css";

const dummyData = [
	{
		orderNumber: 1000003965,
		status: "pending", // 진행예정
		round: 5,
		paymentStatus: "payment_pending", // 결제예정
		arrivalStatus: "arrival_pending", // 도착예정
		paymentDate: "25.01.17",
		arrivalDate: "25.01.17",
	},
	{
		orderNumber: 1000003964,
		status: "pending", // 진행예정
		round: 4,
		paymentStatus: "payment_pending", // 결제예정
		arrivalStatus: "arrival_pending", // 도착예정
		paymentDate: "25.01.17",
		arrivalDate: "25.01.17",
	},
	{
		orderNumber: 1000003967,
		status: "in_progress", // 진행중
		round: 3,
		paymentStatus: "payment_pending", // 결제예정
		arrivalStatus: "arrival_pending", // 도착예정
		paymentDate: "25.01.17",
		arrivalDate: "25.01.17",
	},
	{
		orderNumber: 1000003966,
		status: "delayed", // 미루기 적용
		round: 3,
		paymentStatus: "payment_pending", // 결제예정
		arrivalStatus: "arrival_pending", // 도착예정
		paymentDate: "25.02.24",
		arrivalDate: "25.02.28",
	},
	{
		orderNumber: 1000003972,
		status: "completed", // 진행완료
		round: 2,
		paymentStatus: "payment_completed", // 결제완료
		arrivalStatus: "arrival_completed", // 도착완료
		paymentDate: "25.01.17",
		arrivalDate: "25.01.17",
	},
	{
		orderNumber: 1000003971,
		status: "completed", // 진행완료
		round: 1,
		paymentStatus: "payment_completed", // 결제완료
		arrivalStatus: "arrival_completed", // 도착완료
		paymentDate: "25.01.17",
		arrivalDate: "25.01.17",
	},
	{
		orderNumber: 1000003969,
		status: "canceled", // 해지
		round: null,
		paymentStatus: "canceled", // 구독해지일
		arrivalStatus: null,
		paymentDate: "25.03.06",
		arrivalDate: null,
	},
	{
		orderNumber: 1000003974,
		status: "canceled_after_payment", // 결제 후 주문 취소
		round: 3,
		paymentStatus: "canceled", // 결제취소
		arrivalStatus: "arrival_pending", // 도착예정
		paymentDate: "25.02.24",
		arrivalDate: "25.02.28",
	},
	{
		orderNumber: 1000003974,
		status: "payment_failed", // 결제 실패
		round: 3,
		paymentStatus: "payment_failed", // 결제실패
		arrivalStatus: "arrival_pending", // 도착예정
		paymentDate: "25.02.25",
		arrivalDate: "25.02.28",
	},
];

interface SubscriptionAllScheduleModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const SubscriptionAllScheduleModal = ({
	isOpen,
	onClose
}: SubscriptionAllScheduleModalProps) => {
	const statusLabels: Record<string, string> = {
		pending: "진행예정",
		in_progress: "진행중",
		delayed: "미루기",
		completed: "진행완료",
		canceled: "해지",
		canceled_after_payment: "진행취소",
		payment_failed: "결제 실패",
	};

	const paymentStatusLabels: Record<string, string> = {
		payment_pending: "결제예정",
		payment_completed: "결제완료",
		payment_canceled: "결제취소",
		canceled: "결제취소",
		payment_failed: "결제실패",
	};

	const arrivalStatusLabels: Record<string, string> = {
		arrival_pending: "도착예정",
		arrival_completed: "도착완료",
	};

	const getStatusLabel = (status: string, labels: Record<string, string>) => {
		return labels[status] || "";
	};

	const statusActions: Record<string, { label: string; type: "order" | "delivery" | "cancel" }[]> = {
		in_progress: [{ label: "주문상세", type: "order" }],
		completed: [
			{ label: "주문상세", type: "order" },
			{ label: "배송조회", type: "delivery" },
		],
		canceled_after_payment: [{ label: "취소상세", type: "cancel" }],
	};
	return (
		<FullModalWrapper
			headerTitle='전체구독일정'
			isVisible={isOpen}
			handleClose={onClose}
		>
			<div className={styles.scheduleList}>
				{dummyData.map((data, index) => {
					const active = data.status === 'in_progress' || data.status === 'canceled';
					const isDelayedOrCanceled = data.status === 'delayed' || data.status === 'canceled_after_payment' || data.status === 'payment_failed';
					const textLineThrough = { textDecoration: 'line-through' };

					const status = getStatusLabel(data.status, statusLabels);
					const paymentStatus = getStatusLabel(data.paymentStatus, paymentStatusLabels);
					const arrivalStatus = getStatusLabel(data.arrivalStatus || '', arrivalStatusLabels);

					const actions = statusActions[data.status] || [];
					return (
						<div key={`${index}-${data.orderNumber}`} className={styles.scheduleItem({ active })}>
							<div className={styles.scheduleItemStatus}>
								{data.status !== 'canceled' &&
								<DefaultText type='caption' color={active ? 'gray800' : 'gray400'}>{status}</DefaultText>
								}
								<DefaultText type='title3' color={active ? 'gray900' : 'gray600'} style={isDelayedOrCanceled ? textLineThrough : {}}>
									{data.status !== 'canceled' ? `${data.round}회차` : status}
								</DefaultText>
							</div>
							<div className={styles.itemPaymentArrivalStatus}>
								{data.paymentDate &&
								<DefaultText type='caption' color={active ? 'gray800' : 'gray400'} style={isDelayedOrCanceled ? textLineThrough : {}}>
									{data.paymentDate}
								</DefaultText>
								}
								{data.arrivalDate &&
								<DefaultText type='caption' color={active ? 'gray800' : 'gray400'} style={isDelayedOrCanceled ? textLineThrough : {}}>
									{data.arrivalDate}
								</DefaultText>
								}
							</div>
							<div className={styles.itemPaymentArrivalStatus}>
								{data.status === 'canceled'
									? <DefaultText type='caption' color='gray800'>구독해지일</DefaultText>
									: <>
										<DefaultText type='caption' color={active ? 'gray800' : 'gray400'} style={data.status !== 'canceled_after_payment' && isDelayedOrCanceled ? textLineThrough : {}}>
											{paymentStatus}
										</DefaultText>
										<DefaultText type='caption' color={active ? 'gray800' : 'gray400'} style={isDelayedOrCanceled ? textLineThrough : {}}>
											{arrivalStatus}
										</DefaultText>
									</>
								}
							</div>
							<div className={styles.scheduleActions}>
								{actions.map((action) => (
									<button key={action.label} className={styles.scheduleActionButton}>
										<DefaultText type='headline4' color='red'>{action.label}</DefaultText>
										{action.label &&
										<SvgIcon src={ArrowIcon} size={20} style={{ transform: 'rotate(90deg)', color: themeVars.colors.red.red }} />
										}
									</button>
								))}
							</div>
						</div>
					)
				})}
			</div>
			<div className={styles.scheduleNotice}>
				<DefaultText type='caption' color='gray500'>• ‘이전 회차의 도착완료 다음날’ 부터, ‘현재 회차의 도착 완료일'까지가 ‘진행중 회차'의 기간에 해당합니다.</DefaultText>
				<DefaultText type='caption' color='gray500'>• ‘진행 중 회차' 이후에 대한 일정은, ‘이번 배송 미루기, 배송일 변경' 등에 따라 변경될 수 있습니다.</DefaultText>
				<DefaultText type='caption' color='gray500'>• ‘진행 중 회차'가 결제 미진행 상태일 경우, 다음 회차 결제 예정일에 현재 회차가 다시 진행됩니다. (ex. 2회차 결제 실패 시, 3회차 결제 예정일에 2회차 결제 및 정기배송이 진행됩니다. 3회차를 포함한 이후 일정들이 다음 회차 예정일로 미뤄지는 형태입니다.)</DefaultText>
				<DefaultText type='caption' color='gray500'>• 임시/대체공휴일로 인한 영업일 변경 시 배송 예정일이 영업일 기준으로 조정될 수 있습니다.</DefaultText>
				<DefaultText type='caption' color='gray500'>• 진행 중인 구독의 전체 구독 일정은 ‘진행 완료 회차’ 및 ‘진행 중 회차'를 포함하며, ‘진행 중 회차’를 기준으로 최대 3개의 구독 진행 예정 일정이 추가됩니다.</DefaultText>
			</div>
		</FullModalWrapper>
	);
};

export default SubscriptionAllScheduleModal;