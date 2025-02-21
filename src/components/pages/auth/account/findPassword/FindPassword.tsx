'use client';
import { useRouter } from "next/navigation";
import * as styles from '../FindAccount.css';
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSendTemporaryPassword } from "@/api/auth/mutations/useFindAccount";
import { TemporaryPassword } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import { useAuthStore } from "@/store/useAuthStore";
import { defaultSendTempPwValues, sendTempPwSchema } from "@/utils/validation/authValidation";

const FindPassword = () => {
	const router = useRouter();
	const { handleSubmit, control, errors, isValid } = useFormHandler<TemporaryPassword>(sendTempPwSchema, defaultSendTempPwValues);
	const { mutate } = useSendTemporaryPassword();
	const { setTempPwUserInfo } = useAuthStore();
	const { addToast } = useToastStore();

	const onSubmit = (data: TemporaryPassword) => {
		const body = {
			email: data.email,
			name: data.name,
			phoneNumber: data.phoneNumber,
		}
		mutate(
			body,
			{
				onSuccess:() => {
					console.log('onSuccess data', data)
					addToast('임시비밀번호가 성공적으로 발급되었습니다!', 'success');
					setTempPwUserInfo(body);

					setTimeout(() => {
						router.push('/account/find-password/result');
					}, 1000);
				},
				onError: () => {
					addToast('일치하는 정보를 찾을 수 없습니다.', 'error')
				}
			}
		)
	}
	return (
		<section className={styles.findAccountContainer}>
			<Text type='title' size='titleLg'>비밀번호 찾기</Text>
			<form className={styles.findAccountForm}>
				<div>
					<Controller
						control={control}
						name='email'
						render={({ field }) => (
							<DefaultTextField
								id='email'
								label='이메일'
								placeholder='이메일을 입력해주세요.'
								{...field}
							/>
						)}
					/>
					{errors.email &&
					<Text type='description' size='sm' color='red'align='left'>{errors.email.message}</Text>
					}
				</div>
				<div>
					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<DefaultTextField
								id='name'
								label='이름'
								placeholder='이름을 입력해주세요.'
								{...field}
							/>
						)}
					/>
					{errors.name &&
					<Text type='description' size='sm' color='red'align='left'>{errors.name.message}</Text>
					}
				</div>
				<div>
					<Controller
						control={control}
						name='phoneNumber'
						render={({ field }) => (
							<DefaultTextField
								type='number'
								id='phoneNumber'
								label='휴대폰 번호'
								placeholder='휴대폰 번호를 입력해주세요.'
								isPhoneNumber
								onSubmit={isValid ? handleSubmit(onSubmit) : undefined}
								{...field}
							/>
						)}
					/>
					{errors.phoneNumber &&
					<Text type='description' size='sm' color='red' align='left'>{errors.phoneNumber.message}</Text>
					}
				</div>
			</form>
			<div>
				<DefaultButton
					type='main'
					borderRadius='sm'
					size='md'
					isDisabled={!isValid}
					onClick={handleSubmit(onSubmit)}
				>
					임시비밀번호 받기
				</DefaultButton>
			</div>
		</section>
	);
};

export default FindPassword;