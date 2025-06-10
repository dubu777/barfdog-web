'use client';
import * as styles from '../Account.css';
import * as yup from "yup";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller } from "react-hook-form";
import { SetPassword } from "@/types";
import { useSetPassword } from "@/api/auth/mutations/useSetPassword";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useToastStore } from "@/store/useToastStore";
import InputField from "@/components/common/inputField/InputField";

const setPasswordSchema = yup.object().shape({
	password: yup
		.string()
		.min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
		.required('비밀번호는 필수입니다.'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
		.required('비밀번호 확인은 필수입니다.'),
})

const defaultSetPasswordValues: SetPassword = {
	password: '',
	confirmPassword: '',
};

const SetPasswordComponent = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams.get('redirect');

	const { handleSubmit, control, errors, isValid } = useFormHandler<SetPassword>(setPasswordSchema, defaultSetPasswordValues);
	const { mutate } = useSetPassword();
	const { addToast } = useToastStore();

	console.log('/mypage/account/user-info')
	const onSubmit = (data: SetPassword) => {
		mutate(
			data,
			{
				onSuccess: (data) => {
					if (data.status === 200) {
						console.log(data)
						router.refresh();
						router.push(`/mypage/account/${redirect}`);
						addToast('비밀번호 설정이 완료되었습니다!', 'above-button');
					} else {
						return;
					}
				}
			}
		)
	}
	return (
		<section>
			<Text type='description' size='sm' color='grey'>
				간편 로그인으로 회원가입한 경우, 회원정보 수정을 위해 비밀번호를 생성해야 합니다.
			</Text>
			<form className={styles.accountForm}>
				<div className={styles.accountInputBox}>
					<Controller
						control={control}
						name='password'
						render={({ field }) => (
							<>
								<label className={styles.accountLabel}>새 비밀번호</label>
								<InputField
									masking
									id='password'
									placeholder='비밀번호를 입력해주세요.'
									className={styles.accountInput}
									error={errors?.password?.message}
									{...field}
								/>
							</>
						)}
					/>
				</div>
				<div className={styles.accountInputBox}>
					<Controller
						control={control}
						name='confirmPassword'
						render={({ field }) => (
							<>
								<label className={styles.accountLabel}>새 비밀번호 확인</label>
								<InputField
									masking
									id='confirmPassword'
									placeholder='비밀번호 확인을 입력해주세요.'
									className={styles.accountInput}
									error={errors?.confirmPassword?.message}
									onSubmit={isValid ? handleSubmit(onSubmit) : undefined}
									{...field}
								/>
							</>
						)}
					/>
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

export default SetPasswordComponent;