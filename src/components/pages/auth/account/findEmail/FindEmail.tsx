'use client';
import * as styles from '../FindAccount.css';
import { useRouter } from "next/navigation";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFindUserEmail } from "@/api/auth/mutations/useFindAccount";
import { useToastStore } from "@/store/useToastStore";
import { useAuthStore } from "@/store/useAuthStore";
import { defaultFindUserEmailValues, findUserEmailSchema } from "@/utils/validation/authValidation";
import { FindUserEmail } from "@/types";
import InputField from "@/components/common/inputField/InputField";

const FindEmail = () => {
	const router = useRouter();
	const { handleSubmit, control, errors, isValid } = useFormHandler<FindUserEmail>(findUserEmailSchema, defaultFindUserEmailValues);
	const { mutate } = useFindUserEmail();
	const { addToast } = useToastStore();
	const { setTempEmailUserInfo } = useAuthStore();

	const onSubmit = (data: FindUserEmail) => {
		mutate(
			{ name: data.name, phoneNumber: data.phoneNumber },
			{
				onSuccess: (data) => {
					addToast('아이디가 성공적으로 확인되었습니다!', 'success');
					setTempEmailUserInfo(data);
					setTimeout(() => {
						router.push('/account/find-id/result');
					}, 1000);
				},
				onError: () => {
					addToast('일치하는 정보를 찾을 수 없습니다.', 'error');
				},
			},
		)
	}
	return (
		<section className={styles.findAccountContainer}>
			<Text type='title' size='titleLg'>아이디 찾기</Text>
			<form className={styles.findAccountForm}>
				<div>
					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<>
								<label>이름</label>
								<InputField
									id='name'
									label='이름'
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
									label='휴대폰 번호'
									placeholder='휴대폰 번호를 입력해주세요.'
									onSubmit={isValid ? handleSubmit(onSubmit) : undefined}
									error={errors?.phoneNumber?.message}
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
					아이디찾기
				</DefaultButton>
			</div>
		</section>
	);
};

export default FindEmail;