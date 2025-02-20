'use client';
import * as styles from '../FindAccount.css';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Text from "@/components/common/text/Text";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { defaultConnectSnsValue, connectSnsSchema } from "@/utils/validation/authValidation";
import { ConnectSnsPassword } from "@/types";
import { useConnectSns } from "@/api/auth/mutations/useConnectSns";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import { maskString } from "@/utils/maskString";

const ConnectSns = () => {
	const { loginUserInfo } = useAuthStore();
	const userEmail = loginUserInfo?.data?.email;
	const { handleSubmit, control, errors, isValid } = useFormHandler<ConnectSnsPassword>(connectSnsSchema, defaultConnectSnsValue);
	const { mutate } = useConnectSns();
	const { addToast } = useToastStore();
	const router = useRouter();

	console.log('loginUserInfo', loginUserInfo)
	console.log('isValid', isValid)

	const onSubmit = (data: ConnectSnsPassword) => {
		if(!loginUserInfo) return;

		const body = {
			password: data.password,
			phoneNumber: loginUserInfo.data.mobile.replace(/-/g, ''), // 본인 휴대폰번호 ! Q. 국제번호일경우 => 처리 방침 ?
			provider: loginUserInfo.provider, // SNS 업체
			providerId: loginUserInfo.providerId, // sns 고유값
			tokenValidDays: null, // null 일 경우, 서버 최소 토큰유지: 2시간
		}
		// 현재 비밀번호로 테스트 불가한 상태 추가 작업 필요
		// response 데이터 값의 휴대폰번호가 DB 데이터와 상이함 확인 필요
		mutate(
			body,
			{
				onSuccess: (data) => {
					if (data.email && data.provider) {
						// 로그인 작업 필요
						addToast('SNS 연동이 완료되었습니다!', 'success');
						router.push('/');
					} else {
						addToast('SNS 연동에 실패했습니다.', 'error');
					}

				},
				onError: (error) => {
					console.log('error', error)
					if(axios.isAxiosError(error)) {
						const errorData = error.response?.data.errors[0];
						if (errorData) {
							addToast(errorData.defaultMessage || 'SNS 연동에 실패했습니다.', 'error');
						}
					}
				}
			}
		)
	}
	return (
		<section className={styles.connectSnsContainer}>
			<Text type='description' size='md' color='black'>
				고객님은 기존에 가입된 회원입니다.<br/>
				{maskString(userEmail || '')}<br/>
				기존 계정의 비밀번호 입력 후 연동이 완료됩니다.
			</Text>
			<div className={styles.connectSnsPassword}>
				<Controller
					control={control}
					name='password'
					render={({ field }) => (
						<DefaultTextField
							type='password'
							id='password'
							placeholder='비밀번호를 입력해주세요.'
							{...field}
						/>
					)}
				/>
				{errors.password &&
				<Text type='description' size='sm' color='red' align='left'>{errors.password.message}</Text>
				}
			</div>
			<div className={styles.connectSnsSubmitButton}>
				<DefaultButton
					type='main'
					borderRadius='sm'
					onClick={handleSubmit(onSubmit)}
					// isDisabled={!isValid}
				>
					연동하기
				</DefaultButton>
			</div>
		</section>
	);
};

export default ConnectSns;