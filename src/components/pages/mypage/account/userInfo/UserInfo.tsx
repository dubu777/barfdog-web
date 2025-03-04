'use client';
import * as styles from './UserInfo.css';
import axios from 'axios';
import { useState } from "react";
import UserInfoForm from "@/components/common/userInfoForm/UserInfoForm";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import ReceiveTerms from "@/components/common/receiveTerms/ReceiveTerms";
import { UpdateUserInfo } from "@/types/auth";
import { useGetUserInfo } from "@/api/auth/queries/useGetUserInfo";
import { useUpdateUserInfo } from "@/api/auth/mutations/useUpdateUserInfo";
import { useToastStore } from "@/store/useToastStore";
import { useFormHandler } from "@/hooks/useFormHandler";
import { defaultUpdateUserInfoValues, updateUserInfoSchema } from "@/utils/validation/authValidation";

const UserInfo = () => {
	const { data: userInfo } = useGetUserInfo();

	const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
	const [isReceiveAllChecked, setIsReceiveAllChecked] = useState<boolean>(false);

	const { handleSubmit, control, watch, errors, setValue, setError, isValid, clearErrors, dirtyFields } = useFormHandler<UpdateUserInfo>(updateUserInfoSchema, defaultUpdateUserInfoValues(userInfo));
	const password = watch('password');
	const hasCheckedAuthNumber = watch('hasCheckedAuthNumber');

	// 휴대폰 번를 변경할시 이를 감지하여 phoneNumber error
	// 인증번호 받기를 클릭시 phoneNumber error X, authNumber error
	// 인증번호 확인을 클릭시 authNumber error X (모든 error X)
	const isValidation = password !== null && (dirtyFields.phoneNumber ? hasCheckedAuthNumber : isValid);
	const { mutate } = useUpdateUserInfo();
	const { addToast } = useToastStore();

	console.log('errors', errors);
	console.log('isValid', isValid);
	console.log('isValidation', isValidation);
	console.log('hasCheckedAuthNumber', hasCheckedAuthNumber);

	const onSubmit = (data: UpdateUserInfo) => {
		console.log('formData!!!!!!!', data);
		// email 제외, birthday format(2000-01-01 -> 20000101)
		const body: UpdateUserInfo = {
			// ...Object.fromEntries(
			// 	Object.entries(data).filter(([key]) =>
			// 		!['email', 'birthday', 'defaultPhoneNumber', 'authNumber', 'hasCheckedAuthNumber'].includes(key))
			// ),
			address: data.address,
			gender: data.gender,
			name: data.name,
			password: data.password,
			phoneNumber: data.phoneNumber,
			receiveEmail: data.receiveEmail,
			receiveSms: data.receiveSms,
			birthday: data.birthday.replace(/-/g, ''), // "-" 제거
		};

		mutate(
			body,
			{
				onSuccess: (data) => {
					console.log('data!!!!!', data)
					if (data.status === 200) {
						addToast('회원 정보가 수정되었습니다!', 'success');
						setValue('password', '');
					}
				},
				onError: (error) => {
					if(axios.isAxiosError(error)) {
						const errorData = error.response?.data?.errors[0]?.defaultMessage || '회원 정보 수정에 실패했습니다.';
						if (errorData) {
							addToast(errorData, 'error');
							setValue('password', '');
						}
					}
				}
			}
		)
	}


	return (
		<section className={styles.userInfoContainer}>
			<UserInfoForm
				isSignUp={false}
				control={control}
				watch={watch}
				errors={errors}
				setValue={setValue}
				setError={setError}
				clearErrors={clearErrors}
				openAddressModal={openAddressModal}
				setOpenAddressModal={setOpenAddressModal}
			/>
			<article className={styles.userInfoReceiveTerms}>
				<Text type='description' size='md' color='black'>선택약관 동의</Text>
				<ReceiveTerms
					isSignUp={false}
					control={control}
					watch={watch}
					setValue={setValue}
					isReceiveAllChecked={isReceiveAllChecked}
					setIsReceiveAllChecked={setIsReceiveAllChecked}
				/>
			</article>
			<div className={styles.userInfoButtons}>
				<DefaultButton
					type='grayBorder'
					borderRadius='sm'
				>
					회원 탈퇴
				</DefaultButton>
				<DefaultButton
					type='main'
					borderRadius='sm'
					onClick={handleSubmit(onSubmit)}
					isDisabled={!isValidation}
				>
					저장
				</DefaultButton>
			</div>
		</section>
	);
};

export default UserInfo;