'use client';
import * as yup from "yup";
import { commonWrapper } from "@/styles/common.css";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useToastStore } from "@/store/useToastStore";
import { useFormHandler } from "@/hooks/useFormHandler";
import { SetPassword as SetPasswordType } from "@/types";
import { useSetPassword } from "@/api/auth/mutations/useSetPassword";

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

const defaultSetPasswordValues: SetPasswordType = {
	password: '',
	confirmPassword: '',
};

export default function SetPassword() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams.get('redirect');

	const { handleSubmit, control, errors, isValid } = useFormHandler<SetPasswordType>(setPasswordSchema, defaultSetPasswordValues);
	const { mutate } = useSetPassword();
	const { addToast } = useToastStore();

	console.log('/mypage/account/user-info')
	const onSubmit = (data: SetPasswordType) => {
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
			<form
				className={commonWrapper({
					direction: 'col',
					align: 'start',
					gap: 20,
					padding: 20,
				})}
			>
				<Controller
					control={control}
					name='password'
					render={({ field }) => (
						<InputField
							masking
							label='새 비밀번호'
							isRequired
							id='password'
							placeholder='비밀번호를 입력해주세요.'
							error={errors?.password?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name='confirmPassword'
					render={({ field }) => (
						<InputField
							masking
							label='새 비밀번호 확인'
							isRequired
							id='confirmPassword'
							placeholder='비밀번호 확인을 입력해주세요.'
							error={errors?.confirmPassword?.message}
							onSubmit={isValid ? handleSubmit(onSubmit) : undefined}
							{...field}
						/>
					)}
				/>
			</form>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='저장'
				onPrimaryClick={handleSubmit(onSubmit)}
				isPrimaryDisabled={!isValid}
			/>
		</section>
	);
};