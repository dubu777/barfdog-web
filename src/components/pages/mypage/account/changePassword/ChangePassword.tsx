'use client';
import * as styles from '../Account.css';
import * as yup from "yup";
import axios from "axios";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useChangePassword } from "@/api/auth/mutations/useChangePassword";
import { useToastStore } from "@/store/useToastStore";
import { ChangePassword } from "@/types";
import InputField from "@/components/common/inputField/InputField";
import MyPageBottomButton from "@/components/pages/mypage/layout/bottomButton/MyPageBottomButton";

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
	const { handleSubmit, control, errors, isValid, reset, clearErrors, dirtyFields, setValue } = useFormHandler<ChangePassword>(changePasswordSchema, defaultChangePasswordValues);
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
		<section className={styles.accountContainer}>
			<form className={styles.accountForm}>
				<Controller
					name='password'
					control={control}
					render={({field}) =>
						<InputField
							{...field}
							type='password'
							variants='fillBox'
							placeholder='기존 비밀번호를 입력해주세요.'
							label='기존 비밀번호'
							error={errors?.password?.message}
							touched={dirtyFields?.password}
							masking
							isRequired
							clearButton
							onReset={() => setValue('password', '')}
						/>
					}
				/>
				<Controller
					name='newPassword'
					control={control}
					render={({field}) =>
						<InputField
							{...field}
							type='password'
							variants='fillBox'
							placeholder='새 비밀번호를 입력해주세요.'
							label='새 비밀번호'
							error={errors?.newPassword?.message}
							touched={dirtyFields?.newPassword}
							masking
							isRequired
							clearButton
							onReset={() => setValue('newPassword', '')}
						/>
					}
				/>
				<Controller
					name='newPasswordConfirm'
					control={control}
					render={({field}) =>
						<InputField
							{...field}
							type='password'
							variants='fillBox'
							placeholder='새 비밀번호를 확인을 입력해주세요.'
							label='새 비밀번호 확인'
							error={errors?.newPasswordConfirm?.message}
							touched={dirtyFields?.newPasswordConfirm}
							masking
							isRequired
							clearButton
							onReset={() => setValue('newPasswordConfirm', '')}
						/>
					}
				/>
			</form>
			<MyPageBottomButton
				handleSubmit={() => handleSubmit(onSubmit)}
				// isDisabled={!isValid}
			/>
		</section>
	);
};

export default ChangePasswordComponent;