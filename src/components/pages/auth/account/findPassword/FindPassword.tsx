'use client';
import { useRouter } from "next/navigation";
import * as styles from '../FindAccount.css';
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSendTemporaryPassword } from "@/api/auth/mutations/useFindAccount";
import { TemporaryPassword } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import { useAuthStore } from "@/store/useAuthStore";
import { defaultSendTempPwValues, sendTempPwSchema } from "@/utils/validation/authValidation";
import InputField from "@/components/common/inputField/InputField";

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
					addToast('임시비밀번호가 성공적으로 발급되었습니다!');
					setTempPwUserInfo(body);

					setTimeout(() => {
						router.push('/account/find-password/result');
					}, 1000);
				},
				onError: () => {
					addToast('일치하는 정보를 찾을 수 없습니다.');
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
							<>
								<label>이메일</label>
								<InputField
									id='email'
									placeholder='이메일을 입력해주세요.'
									error={errors?.email?.message}
									{...field}
								/>
							</>
						)}
					/>
				</div>
				<div>
					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<>
								<label>이름</label>
								<InputField
									id='name'
									placeholder='이름을 입력해주세요.'
									error={errors?.name?.message}
									{...field}
								/>
							</>
						)}
					/>
				</div>
				<div>
					<Controller
						control={control}
						name='phoneNumber'
						render={({ field }) => (
							<>
								<label>휴대폰 번호</label>
								<InputField
									type='number'
									id='phoneNumber'
									placeholder='휴대폰 번호를 입력해주세요.'
									error={errors?.phoneNumber?.message}
									onSubmit={isValid ? handleSubmit(onSubmit) : undefined}
									{...field}
								/>
							</>
						)}
					/>
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