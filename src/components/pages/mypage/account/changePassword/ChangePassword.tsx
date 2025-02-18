'use client';
import * as styles from '../Account.css';
import * as yup from "yup";
import axios from "axios";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useChangePassword } from "@/api/auth/mutations/useChangePassword";
import { useToastStore } from "@/store/useToastStore";
import { ChangePassword } from "@/types";

const changePasswordSchema = yup.object().shape({
	password: yup
		.string()
		.required('비밀번호는 필수입니다.'),
	newPassword: yup
		.string()
		.min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
		.required('비밀번호는 필수입니다.'),
	newPasswordConfirm: yup
		.string()
		.oneOf([yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.')
		.required('비밀번호 확인은 필수입니다.'),
})

const defaultChangePasswordValues: ChangePassword = {
	password: '',
	newPassword: '',
	newPasswordConfirm: '',
};

const ChangePasswordComponent = () => {
	const { handleSubmit, control, errors, isValid, reset, clearErrors } = useFormHandler<ChangePassword>(changePasswordSchema, defaultChangePasswordValues);
	const { mutate } = useChangePassword();
	const { addToast } = useToastStore();

	const onSubmit = (data: ChangePassword) => {
		mutate(
			data,
			{
				onSuccess: (data) => {
					if (data.status === 200) {
						addToast('비밀번호 변경이 완료되었습니다!', 'success');
						setTimeout(() => {
							if (window.document.activeElement instanceof HTMLElement) {
								window.document.activeElement.blur();
								clearErrors()
								reset(undefined, { keepErrors: false, keepDirty: false })
							}
						}, 0);
					}
				},
				onError: (error) => {
					console.log('error', error);
					if(axios.isAxiosError(error)) {
						console.log('!?!?error')
						const errorMessage = error?.response?.data?.errors[0].defaultMessage || '비밀번호 변경에 실패했습니다.';
						addToast(errorMessage, 'error');
					}
				}
			}
		)
	}
	return (
		<section>
			<form className={styles.accountForm}>
				<div>
					<Controller
						control={control}
						name='password'
						render={({ field }) => (
							<DefaultTextField
								type='password'
								id='password'
								label='현재 비밀번호'
								labelPosition='left'
								placeholder='현재 비밀번호를 입력해주세요.'
								{...field}
							/>
						)}
					/>
					{errors.password &&
					<Text type='description' size='sm' color='red'align='left'>{errors.password.message}</Text>
					}
				</div>
				<div>
					<Controller
						control={control}
						name='newPassword'
						render={({ field }) => (
							<DefaultTextField
								type='password'
								id='newPassword'
								label='새 비밀번호 확인'
								labelPosition='left'
								placeholder='새로운 비밀번호를 입력해주세요.'
								isPhoneNumber
								onSubmit={isValid ? handleSubmit(onSubmit) : undefined}
								{...field}
							/>
						)}
					/>
					{errors.newPassword &&
					<Text type='description' size='sm' color='red' align='left'>{errors.newPassword.message}</Text>
					}
				</div>
				<div>
					<Controller
						control={control}
						name='newPasswordConfirm'
						render={({ field }) => (
							<DefaultTextField
								type='password'
								id='newPasswordConfirm'
								label='새 비밀번호 확인'
								labelPosition='left'
								placeholder='새로운 비밀번호 확인을 입력해주세요.'
								isPhoneNumber
								onSubmit={isValid ? handleSubmit(onSubmit) : undefined}
								{...field}
							/>
						)}
					/>
					{errors.newPasswordConfirm &&
					<Text type='description' size='sm' color='red' align='left'>{errors.newPasswordConfirm.message}</Text>
					}
				</div>
			</form>
			<div className={styles.accountSubmitButton}>
				<DefaultButton
					type='main'
					borderRadius='sm'
					onClick={handleSubmit(onSubmit)}
					isDisabled={!isValid}
				>
					저장
				</DefaultButton>
			</div>
		</section>
	);
};

export default ChangePasswordComponent;