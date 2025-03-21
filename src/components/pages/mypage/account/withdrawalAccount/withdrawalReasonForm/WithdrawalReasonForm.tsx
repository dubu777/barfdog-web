import * as styles from '../WithdrawalAccount.css';
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import ReasonSelectionForm from "@/components/pages/mypage/layout/reasonSelectionForm/ReasonSelectionForm";

const withdrawalReasons = [
	{ id: 'not_using', label: '더 이상 서비스를 이용하지 않아서' },
	{ id: 'other_service', label: '타 서비스를 이용하게 되어서' },
	{ id: 'delivery_issue', label: '배송 상태가 아쉬워서' },
	{ id: 'high_price', label: '상품 가격이 높아서' },
	{ id: 'order_process', label: '주문 과정이 불편해서' },
	{ id: 'benefit_issue', label: '이용 혜택이 아쉬워서' },
	{ id: 'privacy_concern', label: '개인정보 보안이 걱정되어서' },
	{ id: 'other', label: '기타' },
];

const WithdrawalReasonForm = () => {
	const pathname = usePathname();
	const { pushWithQuery } = useDynamicQueryPush();
	const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
	const [otherReason, setOtherReason] = useState<string>('');

	return (
		<article className={styles.withdrawalContainerBox({ type: 'reason' })}>
			<ReasonSelectionForm
				title='회원 탈퇴 사유를 입력해주세요'
				subTitle={`서비스에 만족을 드리지 못해 죄송합니다\n바프독 서비스에 아쉬운 점을 남겨주세요`}
				reasons={withdrawalReasons}
				selectedReasons={selectedReasons}
				setSelectedReasons={setSelectedReasons}
				otherReason={otherReason}
				setOtherReason={setOtherReason}
				confirmButtonText='탈퇴하기'
				onConfirm={() => pushWithQuery(pathname, { step: 'confirmation' })}
				onCancel={() => pushWithQuery('/', {}, ['step'])}
			/>
		</article>
	);
};

export default WithdrawalReasonForm;