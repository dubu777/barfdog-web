import { useRouter } from "next/navigation";
import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import { PAYMENT } from "@/constants";
import { InfoListsItem } from "@/types";

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
	const subscriptionType = type === 'subscription' || data.orderType === 'subscribe';
	const router = useRouter();

	const deliveryFee = data?.deliveryPrice;
	const paymentPrice = `${data?.paymentPrice?.toLocaleString()}원`;
	const orderPrice = `${data?.orderPrice?.toLocaleString()}원`;
	const discountCoupon = `${data?.discountCoupon !== 0 ? '-' : ''}${data?.discountCoupon?.toLocaleString()}원`;
	const discountReward = `${data?.discountReward !== 0 ? '-' : ''}${data?.discountReward?.toLocaleString()}원`;
	const discountGrade = Math.round((data?.discountGrade / data?.orderPrice) * 100);

	const paymentInfo = [
		{ label: "결제수단", value: PAYMENT[data?.paymentMethod] },
		{ label: "총 금액", value: paymentPrice },
		{ label: "배송비", value: deliveryFee === 0 ? `${subscriptionType ? '정기구독' : ''} 무료` : '5,000원' },
		data?.discountCoupon !== 0 ? { label: "쿠폰사용", value: discountCoupon } : undefined,
		data?.discountReward !== 0 ? { label: "적립금 사용", value: discountReward } : undefined,
		subscriptionType && discountGrade !== 0 ? { label: "할인 혜택", value: `등급할인혜택 ${discountGrade}%할인` } : undefined,
	].filter(Boolean) as InfoListsItem[]; 

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
			subTitleRight={subscriptionType ? `월 ${orderPrice}` : paymentPrice}
			infoLists={infoLists}
			isDefaultOpen={isDefaultOpen}
			buttons={buttons}
		/>
	);
};

export default PaymentInfo;