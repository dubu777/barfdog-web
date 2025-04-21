'use client';
import * as styles from '../Account.css';
import axios from 'axios';
import { ChangeEvent, useState } from "react";
import { Controller } from "react-hook-form";
import ProfileCircle from '/public/images/myPage/profile_circle.svg';
import InputField from "@/components/common/inputField/InputField";
import DefaultText from "@/components/common/defaultText/DefaultText";
import MobileDatePicker from "@/components/common/datePicker/mobileDatePicker/MobileDatePicker";
import useDeviceState from "@/hooks/useDeviceState";
import DefaultRadio from "@/components/common/defaultRadio/DefaultRadio";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { UpdateUserInfo } from "@/types/auth";
import { useGetUserInfo } from "@/api/auth/queries/useGetUserInfo";
import { useUpdateUserInfo } from "@/api/auth/mutations/useUpdateUserInfo";
import { useGetAuthNumber } from "@/api/auth/mutations/useGetAuthNumber";
import { useToastStore } from "@/store/useToastStore";
import { useFormHandler } from "@/hooks/useFormHandler";
import { defaultUpdateUserInfoValues, updateUserInfoSchema } from "@/utils/validation/authValidation";
import { formatDate, formatPhoneNumber } from "@/utils";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import CustomDatePicker from '@/components/common/datePicker/CustomDatePicker';

const UserInfo = () => {
	const { data: userInfo } = useGetUserInfo();

	const { handleSubmit, control, getValues, watch, errors, setValue, setError, isValid, clearErrors, dirtyFields } = useFormHandler<UpdateUserInfo>(updateUserInfoSchema, defaultUpdateUserInfoValues(userInfo));

	const [changedPhoneNumber, setChangedPhoneNumber] = useState<boolean>(false);
	const [authNumber, setAuthNumber] = useState<string>('');

	const { mutate } = useUpdateUserInfo();
	const { mutate: mutateAuthNumber } = useGetAuthNumber();

	const { addToast } = useToastStore();
	const { isMobileDevice } = useDeviceState();

	// 연락처 변경 X
	const keepCurrentPhoneNumber = !changedPhoneNumber || watch('phoneNumber') === watch('defaultPhoneNumber');
	// 연락처 변경 O -> 인증번호 확인 완료 확인을 위한 상태값
	const hasCheckedAuthNumber = getValues('hasCheckedAuthNumber');
	// 최종 form 필수 요소 검증
	const isValidFormValues = (watch('phoneNumber') !== watch('defaultPhoneNumber') ? hasCheckedAuthNumber : true) && isValid;

	// 연락처 input change
	const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// 연락처 변경시 기존 연락처와 같을 경우 인증번호 입력 요소 제외
		if (value === getValues('defaultPhoneNumber')) {
			setValue('authNumber', '');
			clearErrors('authNumber');
			setAuthNumber('');
		}
		// 연락처 변경시 입력창을 모두 지우게 될 경우 기존 연락처로 적용
		if (value === '') {
			setValue('phoneNumber', getValues('defaultPhoneNumber') as string);
			setChangedPhoneNumber(false);
		} else {
			setChangedPhoneNumber(true);
		}
	}

	// 연락처 변경 및 확인 로직
	const handlePhoneNumberConfirm = () => {
		// 연락처 변경 버튼 클릭시 인증번호, 인증번호 확인 상태 상태값 초기화 (다른번호로 재시도 할 경우 대비)
		setValue('hasCheckedAuthNumber', false);
		setValue('authNumber', '');
		clearErrors('authNumber');
		setAuthNumber('');

		const isPhoneNumberUnchangedOrNotVerified =
			!dirtyFields.phoneNumber || (keepCurrentPhoneNumber && !getValues('hasCheckedAuthNumber'));

		if (isPhoneNumberUnchangedOrNotVerified) {
			// 연락처 변경 필드 초기화 및 입력 버튼 변경
			setValue('phoneNumber', '');
			setChangedPhoneNumber(true)

		} else {
			// 인증번호 발송을 위한 Mutation 적용 및 인증번호 필드 초기화
			setValue('authNumber', '');
			mutateAuthNumber(
				{ phoneNumber: getValues('phoneNumber') as string },
				{
					onSuccess: (data) => {
						// 다이렉트센드 에서 받아오는 데이터 형태로 msg null 값이어야 성공
						setAuthNumber(data.authNumber as string);
						if(data.authNumber && data.responseCode === 200 && data.msg === null) {
							setAuthNumber(data.authNumber);
							addToast('인증번호가 발송되었습니다!', 'above-button');
							setError('authNumber', { message: '인증번호를 입력해주세요' });
						}
					},
					onError: (errorResponse) => {
						if (axios.isAxiosError(errorResponse)) {
							const error = errorResponse.response?.data
							const errorMessage = error?.errors[0].defaultMessage || '연락처를 확인해주세요';
							setError('phoneNumber', { message: errorMessage });
						}
					}
				}
			)
		}
	}

	// 인증번호 확인 로직
	const handleCheckAuthNumber = (value: string) => {
		if (!authNumber || !value) return;

		// 인증번호 확인 검증은 발급받은 인증번호를 상태값에 저장 후 비교
		if (value === authNumber) {
			addToast('인증 되었습니다!', 'above-button');

			// 인증번호 상태값 성공처리 및 인증번호 필드값 초기화
			setValue('hasCheckedAuthNumber', true);
			clearErrors?.('authNumber');
			setAuthNumber('');
			setChangedPhoneNumber(false);
		} else {
			setError('authNumber', { message: '인증번호를 확인해주세요' });
		}
	};

	const onSubmit = (data: UpdateUserInfo) => {
		// email 제외, birthday format(2000-01-01 -> 20000101)
		const body: UpdateUserInfo = {
			address: data.address,
			gender: data.gender,
			name: data.name,
			password: data.password,
			phoneNumber: data.phoneNumber,
			receiveEmail: data.receiveEmail,
			receiveSms: data.receiveSms,
			birthday: formatDate(data.birthday, 'onlyDateDot').replace(/-/g, ''), // "-" 제거
		};
		mutate(
			body,
			{
				onSuccess: (data) => {
					if (data.status === 200) {
						addToast('회원 정보가 수정되었습니다!', 'above-button');
						setValue('password', '');
					}
				},
				onError: (error) => {
					if(axios.isAxiosError(error)) {
						const errorData = error.response?.data?.errors[0]?.defaultMessage || '회원 정보 수정에 실패했습니다.';
						if (errorData) {
							addToast(errorData, 'above-button');
							setValue('password', '');
						}
					}
				}
			}
		)
	}
	return (
		<section className={`${styles.accountContainer} ${styles.userInfoBox}`}>
			<DefaultText type='title4'>
				회원 정보
			</DefaultText>
			<div className={styles.uploadProfile}>
				<SvgIcon src={ProfileCircle} size={89} />
				<DefaultText type='label4' color='gray600'>프로필 사진</DefaultText>
			</div>
			<form className={styles.userInfoForm}>
				<Controller
					name='name'
					control={control}
					render={({field}) =>
						<InputField
							{...field}
							variants='box'
							placeholder='이름을 입력해주세요.'
							label='이름'
							error={errors?.name?.message}
							touched
							isRequired
						/>
					}
				/>
				<Controller
					name='phoneNumber'
					control={control}
					render={({field}) =>
						<InputField
							{...field}
							value={keepCurrentPhoneNumber ? formatPhoneNumber(getValues('phoneNumber')) : field.value}
							onSubmit={handlePhoneNumberConfirm}
							onChange={(e) => {
								field.onChange(e);
								handlePhoneNumberChange(e);
							}}
							confirmButton
							confirmButtonText={!keepCurrentPhoneNumber ? '입력' : '번호변경'}
							placeholder='번호만 입력해주세요'
							label='연락처'
							isRequired
							disabled={keepCurrentPhoneNumber}
							error={errors?.phoneNumber?.message}
						/>
					}
				/>
				{authNumber && changedPhoneNumber &&
					<Controller
						name='authNumber'
						control={control}
						render={({field}) =>
							<InputField
								{...field}
								value={field.value as string}
								onSubmit={() => handleCheckAuthNumber(field.value as string)}
								error={errors?.authNumber?.message}
								confirmButton
								confirmButtonText='확인'
								placeholder='인증번호를 입력해주세요'
							/>
						}
					/>
				}
				<Controller
					name='email'
					control={control}
					render={({field}) =>
						<InputField
							{...field}
							disabled
							label='이메일'
							isRequired
						/>
					}
				/>
				<Controller
					name='gender'
					control={control}
					render={({field}) =>
						<DefaultRadio
							id='gender'
							onChange={field.onChange}
							value={field.value as string}
							label='성별정보'
							isRequired
							options={[
								{name: '남자', value: 'MALE'},
								{name: '여자', value: 'FEMALE'},
								{name: '선택안함', value: 'NONE'}
							]}
						/>
					}
				/>
				<Controller
					name='birthday'
					control={control}
					render={({field}) =>
					<>
						{isMobileDevice
							? <MobileDatePicker
								value={formatDate(field.value, 'onlyDateDot')}
								onChange={(date) => field.onChange(date)}
								label='생년월일'
								isRequired
							/>
							: <CustomDatePicker
								name='birthday'
								value={formatDate(field.value, 'onlyDateDot')}
								onChange={(date) => {
									console.log(date)
									field.onChange(date)
								}}
							/>
						}
					</>
					}
				/>
			</form>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='저장하기'
				onPrimaryClick={handleSubmit(onSubmit)}
				isPrimaryDisabled={!isValidFormValues}
			/>
		</section>
	);
};

export default UserInfo;