import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import { useRouter } from "next/navigation";
import { PAYMENT } from "@/constants";
import { InfoListsButtons, InfoListsItem } from "@/types";

interface PaymentInfoProps {
	data: any;
	type: 'subscription' | 'orderDetail' | 'orderIssue' | 'changePaymentMethod';
	isDefaultOpen?: boolean;
	handleChangePaymentMethod?: () => void;
}

const PaymentInfo = ({
	data,
	type = 'subscription',
	isDefaultOpen = true,
	handleChangePaymentMethod,
}: PaymentInfoProps) => {
	const subscriptionType = type === 'subscription' || type === 'changePaymentMethod' || data.orderType === 'subscribe';
	const router = useRouter();

	const deliveryFee = data?.deliveryPrice;
	const paymentPrice = `${data?.paymentPrice?.toLocaleString()}원`;
	const orderPrice = `${data?.orderPrice?.toLocaleString()}원`;
	const discountCoupon = `-${data?.discountCoupon?.toLocaleString()}원`;
	const discountReward = `-${data?.discountReward?.toLocaleString()}원`;
	const discountGrade = `-${data?.discountGrade?.toLocaleString()}원`;
	const salePrice = `-${data?.salePrice?.toLocaleString()}원`;
	// const discountGrade = Math.round((data?.discountGrade / data?.orderPrice) * 100);

	console.log('subscriptionType', subscriptionType)
	console.log('deliveryFee', deliveryFee)
	const paymentInfo = [
		{ label: "결제수단", value: PAYMENT[data?.paymentMethod] },
		{ label: "총 금액", value: paymentPrice },
		data?.salePrice !== 0 ? { label: "할인 혜택", value: salePrice } : undefined,
		{ label: "배송비", value: deliveryFee === 0 ? `${subscriptionType ? '정기구독' : ''} 무료` : '5,000원' },
		data?.discountGrade !== 0 ? { label: "등급 할인", value: discountGrade } : undefined,
		data?.discountCoupon !== 0 ? { label: "쿠폰 사용", value: discountCoupon } : undefined,
		data?.discountReward !== 0 ? { label: "적립금 사용", value: discountReward } : undefined,
	].filter(Boolean) as InfoListsItem[];

	const buttons =
		type === "subscription" && data.status === 'SUBSCRIBING'
			? [{ label: "결제수단변경", onClick: handleChangePaymentMethod } as  InfoListsButtons]
			: [];

	const infoLists = [
		{ items: paymentInfo, noBorder: true },
	];
	console.log(data)
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