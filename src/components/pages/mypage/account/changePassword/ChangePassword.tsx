'use client';
import * as styles from '../Account.css';
import * as yup from "yup";
import axios from "axios";
import InputField from "@/components/common/inputField/InputField";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ErrorIcon from '/public/images/icons/close_small.svg';
import SuccessIcon from '/public/images/icons/check_small.svg';
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useChangePassword } from "@/api/auth/mutations/useChangePassword";
import { useToastStore } from "@/store/useToastStore";
import { ChangePassword } from "@/types";

const passwordValidation = [
	{
		rule: (password: string) => password.length >= 7,
		message: "최소 7자리 이상",
	},
	{
		rule: (password: string) => /[a-zA-Z]/.test(password) && /\d/.test(password) && /[\W_]/.test(password),
		message: "영문/숫자/특수문자 조합",
	},
	{
		rule: (password: string) =>
			password.length > 3 &&
			(!/(.)\1{2,}/.test(password) &&  // 동일 문자 3회 이상 반복 금지
				!/(012|123|234|345|456|567|678|789|890)/.test(password) &&  // 연속된 숫자 패턴 금지
				!/([a-zA-Z])\1{2,}/.test(password)), // 영문자 동일 문자 3회 이상 반복 금지
		message: "3회 이상 동일하거나 연속성이 없는 문자",
	},
];

const changePasswordSchema = yup.object().shape({
	password: yup.string().required('비밀번호는 필수입니다.'),
	newPassword: yup.string().required("새 비밀번호를 입력해주세요"),
	newPasswordConfirm: yup
		.string()
		.oneOf([yup.ref("newPassword")], "비밀번호가 일치하지 않습니다")
		.required("비밀번호 확인은 필수입니다"),
});

const defaultChangePasswordValues: ChangePassword = {
	password: '',
	newPassword: '',
	newPasswordConfirm: '',
};

const ChangePasswordComponent = () => {
	const {
		handleSubmit, control, errors, isValid, reset, trigger, clearErrors, dirtyFields, setValue, getValues, setError
	} = useFormHandler<ChangePassword>(changePasswordSchema, defaultChangePasswordValues);

	const { mutate } = useChangePassword();
	const { addToast } = useToastStore();

	const isValidPasswordForm = (newPassword: string) => {
		return passwordValidation.every((validation) => validation.rule(newPassword)) && isValid;
	};

	const onSubmit = (data: ChangePassword) => {
		mutate(
			data,
			{
				onSuccess: (data) => {
					if (data.status === 200) {
						addToast('비밀번호 변경이 완료되었습니다!', 'above-button');
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
						// const errorMessage = error?.response?.data?.errors[0].defaultMessage || '비밀번호 변경에 실패했습니다.';
						const errorMessage = '기존 비밀번호가 일치하지 않습니다.';
						setError('password', { message: errorMessage });
						addToast(errorMessage,'above-button');
					}
				}
			}
		)
	}

	const inputProps = {
		masking: true,
		isRequired: true,
		clearButton: true,
	}

	return (
		<section className={styles.accountContainer}>
			<form className={styles.accountForm}>
				<Controller
					name='password'
					control={control}
					render={({ field }) => {
						const passwordError = errors?.password?.message;
						return (
							<div>
								<InputField
									{...field}
									type='password'
									variants='box'
									placeholder='기존 비밀번호를 입력해주세요.'
									label='기존 비밀번호'
									onReset={() => setValue('password', '')}
									{...inputProps}
								/>
								{passwordError &&
								<div className={styles.accountError} style={{ marginTop: '8.5px' }}>
									<ErrorIcon />
									<DefaultText type='caption' color={!passwordError ? 'blue' : 'red'} inlineBlock>
										기존 비밀번호가 {passwordError ? '일치하지 않습니다' : '일치합니다'}
									</DefaultText>
								</div>
								}
							</div>
						);
					}}
				/>
				<Controller
					name="newPassword"
					control={control}
					render={({ field }) => (
						<div>
							<InputField
								{...field}
								type="password"
								variants="box"
								placeholder="새 비밀번호를 입력해주세요."
								label="새 비밀번호"
								error={errors?.newPassword?.message}
								touched={dirtyFields?.newPassword}
								onReset={() => setValue("newPassword", "")}
								onChange={(e) => {
									field.onChange(e);
									trigger('newPasswordConfirm');
								}}
								{...inputProps}
							/>
							{dirtyFields?.newPassword &&
							<div className={styles.accountErrors}>
								{passwordValidation.map(({ rule, message }) => {
									const isValid = rule(field.value);
									console.log(isValid)
									return (
										<div key={message} className={styles.accountError}>
											{isValid ? <SuccessIcon /> : <ErrorIcon />}
											<DefaultText type='caption' color={isValid ? 'blue' : 'red'} inlineBlock>
												{message}
											</DefaultText>
										</div>
									);
								})}
							</div>
							}
						</div>
					)}
				/>
				<Controller
					name='newPasswordConfirm'
					control={control}
					render={({ field }) => {
						const newPasswordConfirmError = errors?.newPasswordConfirm?.message;
						return (
							<div>
								<InputField
									{...field}
									type='password'
									variants='box'
									placeholder='새 비밀번호를 확인을 입력해주세요.'
									label='새 비밀번호 확인'
									onReset={() => setValue('newPasswordConfirm', '')}
									onSubmit={!isValidPasswordForm(getValues('newPassword')) ? handleSubmit(onSubmit) : undefined}
									{...inputProps}
								/>
								{dirtyFields.newPassword &&
									<div className={styles.accountError} style={{ marginTop: '8.5px' }}>
										{!newPasswordConfirmError ? <SuccessIcon /> : <ErrorIcon />}
										<DefaultText type='caption' color={!newPasswordConfirmError ? 'blue' : 'red'} inlineBlock>
											비밀번호가 {newPasswordConfirmError ? '일치하지 않습니다' : '일치합니다'}
										</DefaultText>
									</div>
								}
							</div>
						);
					}}
				/>
			</form>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='저장하기'
				onPrimaryClick={handleSubmit(onSubmit)}
				isPrimaryDisabled={!isValidPasswordForm(getValues('newPassword'))}
			/>
		</section>
	);
};

export default ChangePasswordComponent;