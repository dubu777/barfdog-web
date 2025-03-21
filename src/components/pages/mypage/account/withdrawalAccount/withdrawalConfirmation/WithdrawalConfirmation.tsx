import * as styles from '../WithdrawalAccount.css';
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/common/inputField/InputField";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useWithdrawalUser } from "@/api/auth/mutations/useWithdrawalUser";

const WithdrawalConfirmation = () => {
	const router = useRouter();
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const { mutate } = useWithdrawalUser();

	const handleSubmit = () => {
		mutate(
			{ password: password },
			{
				onSuccess: (data) => {
				// 성공시 로그아웃 처리 필요
				},
				onError: (error) => {
					if (axios.isAxiosError(error)) {
						let errorMessage = '회원탈퇴에 문제가 있습니다.'
						if (error?.response?.data?.errors[0]?.defaultMessage) {
							errorMessage = error?.response?.data?.errors[0]?.defaultMessage;
						}
						setError(errorMessage);
					}
				}
			}
		)
	}
	return (
		<article className={styles.withdrawalContainerBox({ type: 'confirmation' })}>
			<div className={styles.withdrawalContainerTitle({ type: 'confirmation' })}>
				<DefaultText type='title3'>개인정보 확인을 위해<br/>비밀번호를 입력해주세요</DefaultText>
				<DefaultText type='body1' color='gray600'>개인정보 보호를 위해 인증절차가 필요합니다</DefaultText>
			</div>
			<InputField
				type='password'
				placeholder='기존 비밀번호를 입력하세요'
				label='비밀번호 확인'
				isRequired
				onReset={() => setPassword('')}
				onChange={(e) => {
					setPassword(e.target.value);
					setError('');
				}}
				onSubmit={password.length > 0 ? handleSubmit : undefined}
				touched={error.length > 0}
				error={error}
			/>
			<ButtonDocked
				type='dual-button'
				secondaryButtonLabel='돌아가기'
				onSecondaryClick={() => router.push('/')}
				primaryButtonLabel='확인'
				onPrimaryClick={handleSubmit}
				isPrimaryDisabled={password.length === 0}
			/>
		</article>
	);
};

export default WithdrawalConfirmation;