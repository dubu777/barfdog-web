import { useRouter } from "next/navigation";
import InfoSection from "@/components/pages/mypage/layout/information/layout/InfoSection";

interface PaymentInfoProps {
	subscriptionId?: number;
	data: any;
	type: 'subscription' | 'orderDetail' | 'orderIssue';
	isDefaultOpen?: boolean;
}

const PaymentInfo = ({
	subscriptionId,
	data,
	type = 'subscription',
	isDefaultOpen = true,
}: PaymentInfoProps) => {
	const paymentType = type === 'subscription' || data.orderType === 'subscription';
	const router = useRouter();
	const deliveryFee = 'free';

	const paymentInfo = [
		{ label: "결제수단", value: "신용카드 (삼성)" },
		{ label: "총 금액", value: "270,000원" },
		{ label: "배송비", value: deliveryFee ? `${paymentType ? '정기구독' : ''}무료` : '5,000원' },
		{ label: "쿠폰사용", value: "-1,000원" },
		{ label: "적립금 사용", value: "-2,000원" },
		{ label: "할인 혜택", value: "등급할인혜택 5%할인" },
	];

	const buttons =
		type === "subscription"
			? [{ label: "결제수단변경", onClick: () => router.push(`/mypage/subscription/${subscriptionId}/`) }]
			: [];

	const infoLists = [
		{ items: paymentInfo, noBorder: true },
	];

	return (
		<InfoSection
			title="결제정보"
			subTitle="주문금액"
			subTitleRight={paymentType ? `N회차 진행중` : '48,450원'}
			infoLists={infoLists}
			isDefaultOpen={isDefaultOpen}
			buttons={buttons}
		/>
	);
};

export default PaymentInfo;