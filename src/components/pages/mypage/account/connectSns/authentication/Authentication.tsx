'use client';
import * as styles from '../../Account.css';
import axios from "axios";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { connectSnsSchema, defaultConnectSnsValue } from "@/utils/validation/authValidation";
import { ConnectSnsPassword } from "@/types";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InputField from "@/components/common/inputField/InputField";
import { useGetUserInfo } from "@/api/auth/queries/useGetUserInfo";
import { useConnectSns } from "@/api/auth/mutations/useConnectSns";
import { useToastStore } from "@/store/useToastStore";
import { useBackNavigation } from "@/utils";

interface AuthenticationProps {
	provider: 'kakao' | 'naver';
}

const Authentication = ({ provider }: AuthenticationProps) => {
	const { data: userInfo } = useGetUserInfo();
	const { handleSubmit, control, errors, isValid, dirtyFields } = useFormHandler<ConnectSnsPassword>(connectSnsSchema, defaultConnectSnsValue);
	const { mutate: connectSnSMutate } = useConnectSns();
	const { addToast } = useToastStore();
	const goBack = useBackNavigation();

	const handleConnectSns = (data: ConnectSnsPassword) => {
		// providerId 어떻게 쓰이는지? 유니크한 값이면 되는지?
		const uniqueId = `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

		if (!userInfo) return;
		const body = {
			password: data.password,
			phoneNumber: userInfo.phoneNumber,
			provider: provider,
			providerId: uniqueId,
			tokenValidDays: null,
		}
		// 현재 관리자 비밀번호로 테스트 불가한 상태 확인 필요
		connectSnSMutate(
			body,
			{
				onSuccess: (data) => {
					if (data.email && data.provider) {
						// 로그인 작업 필요
						addToast('SNS 연동이 완료되었습니다!', 'above-button');
					} else {
						addToast('SNS 연동에 실패했습니다.', 'above-button');
					}
				},
				onError: (error) => {
					console.log('error', error)
					if(axios.isAxiosError(error)) {
						const errorData = error.response?.data.errors[0];
						if (errorData) {
							addToast(errorData.defaultMessage || 'SNS 연동에 실패했습니다.', 'above-button');
						}
					}
				}
			}
		)
	}

	return (
		<section className={styles.connectSnSAuthContainer}>
			<article className={styles.connectSnSAuthTitle}>
				<DefaultText type='title3'>
					계정정보 확인을 위해<br/>
					비밀번호를 입력해주세요
				</DefaultText>
				<DefaultText type='body1' color='gray600'>개인정보 보호를 위해 인증절차가 필요합니다.</DefaultText>
			</article>
			<article className={styles.connectSnSAuthForm}>
				<Controller
					control={control}
					name='password'
					render={({ field }) => (
						<InputField
							masking
							id='password'
							label='비밀번호 확인'
							isRequired
							placeholder='기존 비밀번호를 입력하세요'
							error={errors?.password?.message}
							touched={dirtyFields?.password}
							onSubmit={isValid ? handleSubmit(handleConnectSns) : undefined}
							{...field}
						/>
					)}
				/>
			</article>
			<ButtonDocked
				type='dual-button'
				secondaryButtonLabel='돌아가기'
				onSecondaryClick={goBack}
				primaryButtonLabel='연동하기'
				onPrimaryClick={handleSubmit(handleConnectSns)}
			/>
		</section>
	);
};

export default Authentication;