import * as styles from '../WithdrawalAccount.css';
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import DefaultText from "@/components/common/defaultText/DefaultText";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import DefaultTextarea from "@/components/common/defaultTextarea/DefaultTextarea";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

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

	const handleToggle = (id: string, checked: boolean) => {
		if (id === 'other') {
			setOtherReason('');
		}
		const updatedValues = checked
			? [...selectedReasons, id]
			: selectedReasons.filter(value => value !== id);

		setSelectedReasons(updatedValues);
	};

	return (
		<article className={styles.withdrawalContainerBox({ type: 'reason' })}>
			<div className={styles.withdrawalContainerTitle({ type: 'reason' })}>
				<DefaultText type='title3'>회원 탈퇴 사유를 입력해주세요</DefaultText>
				<DefaultText type='body1' color='gray600'>서비스에 만족을 드리지 못해 죄송합니다<br/>바프독 서비스에 아쉬운 점을 남겨주세요</DefaultText>
			</div>
			<ul className={styles.reasonCheckboxList}>
				{withdrawalReasons.map(reason => (
					<li key={reason.id}>
						<DefaultCheckbox
							id={reason.id}
							name={reason.id}
							value={selectedReasons.includes(reason.id)}
							label={reason.label}
							onChange={(checked) => handleToggle(reason.id, checked as boolean)}
						/>
						{selectedReasons.includes('other') && reason.id === 'other' &&
							<DefaultTextarea
								id='otherReason'
								value={otherReason}
								placeholder='기타 이유를 남겨주세요'
								minLength={0}
								maxLength={1000}
								onChange={(e) => setOtherReason(e.target.value)}
								className={styles.otherReasonTextarea}
							/>
						}
					</li>
				))}
			</ul>
			<ButtonDocked
				type='dual-button'
				secondaryButtonLabel='돌아가기'
				onSecondaryClick={() => pushWithQuery('/', {}, ['step'])}
				primaryButtonLabel='탈퇴하기'
				onPrimaryClick={() => pushWithQuery(pathname, { step: 'confirmation' })}
				isPrimaryDisabled={selectedReasons.length === 0}
			/>
		</article>
	);
};

export default WithdrawalReasonForm;