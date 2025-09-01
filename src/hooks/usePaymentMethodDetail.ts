import { useGetPaymentList } from "@/api/mypage/subscription/queries/useGetPaymentList";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";

export function usePaymentMethodDetail() {
	const { data: paymentList } = useGetPaymentList();
	const { setPaymentMethodDetail } = usePersistMypageStore();

	return (subscribeId: number) => {
		const matched = paymentList?.find(payment => payment.subscribeCardDto.subscribeId === subscribeId);
		if (matched) setPaymentMethodDetail(matched);
		else console.warn('결제수단을 찾을 수 없습니다.');
	}
}