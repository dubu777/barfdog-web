import * as styles from "./UserInfoForm.css";
import { pointColor } from "@/styles/common.css";
import { useCallback, useMemo, useState } from "react";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import DefaultRadio from "@/components/common/defaultRadio/DefaultRadio";
import SearchAddress from "@/components/common/searchAddress/SearchAddress";
import DatePicker from "@/components/common/datePicker/DatePicker";
import {
	Control,
	Controller,
	DeepRequired,
	FieldErrors,
	Path,
	PathValue,
	UseFormClearErrors,
	UseFormSetError,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";
import {
	UpdateUserInfo,
	UserInfoFormFields,
	SignUpFormValues,
	AddressDto,
} from "@/types";

import { useGetAuthNumber } from "@/api/auth/mutations/useGetAuthNumber";
import { useToastStore } from "@/store/useToastStore";
import axios from "axios";

const userInfoFormFields: UserInfoFormFields[] = [
	{
		id: 'name',
		label: '이름(견주님)',
		inputType: 'text',
		isRequired: true,
	},
	{
		id: 'email',
		label: '이메일주소(아이디)',
		inputType: 'text',
		validationButtonText: '중복확인',
		isRequired: true,
	},
	{
		id: 'password',
		label: '비밀번호',
		inputType: 'password',
		isRequired: true,
	},
	{
		id: 'confirmPassword',
		label: '비밀번호 확인',
		inputType: 'password',
		isRequired: true,
		isSignUp: true,
	},
	{
		id: 'phoneNumber',
		label: '휴대폰 번호',
		inputType: 'text',
		validationButtonText: '인증번호 받기',
		isRequired: true,
	},
	{
		id: 'authNumber',
		label: '인증 번호',
		inputType: 'text',
		validationButtonText: '확인',
		isRequired: true,
	},
	{
		id: 'address',
		label: '주소 검색',
		inputType: 'address',
		isRequired: true,
	},
	{
		id: 'birthday',
		label: '생년월일(견주님)',
		inputType: 'birthday',
		isRequired: true,
	},
	{
		id: 'gender',
		label: '성별(견주님)',
		inputType: 'radio',
		isRequired: true,
	},
	{
		id: 'recommendCode',
		label: '추천코드',
		inputType: 'text',
		isRequired: false,
		placeholder: '추천코드는 계정 당 한번만 입력 가능합니다.',
		isSignUp: true,
	},
]

type FormValues<T extends boolean> = T extends true ? SignUpFormValues : UpdateUserInfo;

interface UserInfoFormProps<T extends boolean> {
	isSignUp?: T;
	control: Control<FormValues<T>>;
	watch: UseFormWatch<FormValues<T>>;
	errors: FieldErrors<FormValues<T>>;
	setValue: UseFormSetValue<FormValues<T>>;
	setError: UseFormSetError<FormValues<T>>;
	clearErrors?: UseFormClearErrors<FormValues<T>>;
	openAddressModal: boolean;
	setOpenAddressModal: (openAddressModal: boolean) => void;
}

const UserInfoForm = <T extends boolean>({
	isSignUp,
	control,
	watch,
	errors,
	setValue,
	setError,
	clearErrors,
	openAddressModal,
	setOpenAddressModal,
}: UserInfoFormProps<T>) => {
	const filteredUserInfoFormFields = useMemo(() => 
		isSignUp 
		? userInfoFormFields 
		: userInfoFormFields.filter(field => !field.isSignUp)
	, [isSignUp]);

	const [authNumber, setAuthNumber] = useState<string | null>(null);
	const { mutate: mutateAuthNumber } = useGetAuthNumber();
	const { addToast } = useToastStore();

	const phoneNumber = watch('phoneNumber' as Path<FormValues<T>>);
	const defaultPhoneNumber = watch('defaultPhoneNumber' as Path<FormValues<T>>);
	const hasCheckedAuthNumber = watch('hasCheckedAuthNumber' as Path<FormValues<T>>);
	const watcherAuthNumber = watch('authNumber' as Path<FormValues<T>>);

	const handleEmailDuplication = useCallback(() => {

	},[]);

	const handleGetAuthNumber = useCallback(() => {
		if (!phoneNumber) return;

		mutateAuthNumber(
			{ phoneNumber: phoneNumber as string },
			{
				onSuccess: (data) => {
					console.log('data', data)
					if(data.authNumber && data.responseCode === 200 && data.msg === null) {
						setAuthNumber(data.authNumber);
						addToast('인증번호가 발송되었습니다!', 'success');
						setError('authNumber' as Path<FormValues<T>>, { message: '인증번호를 입력해주세요.' });
						clearErrors?.('phoneNumber' as Path<FormValues<T>>);
					}
				},
				onError: (errorResponse) => {
					if (axios.isAxiosError(errorResponse)) {
						const error = errorResponse.response?.data
						const errorMessage = error?.errors[0].defaultMessage || '인증번호 발송에 실패했습니다.';
						setError('phoneNumber' as Path<FormValues<T>>, { message: errorMessage });
					}
				}
			}
		)
	},[watch, mutateAuthNumber, setValue, setError, addToast]);

	const handleCheckAuthNumber = useCallback(() => {
		if (!authNumber || !watcherAuthNumber) return;

		if (watcherAuthNumber === authNumber) {
			addToast('인증 되었습니다!', 'success');
			clearErrors?.('authNumber' as Path<FormValues<T>>);
			setValue('hasCheckedAuthNumber' as Path<FormValues<T>>, true as PathValue<FormValues<T>, Path<FormValues<T>>>);
			// setValue('hasCheckedAuthNumber' as keyof FormValues<T>, true);
		} else {
			// addToast('인증번호를 확인해주세요.', 'error');
			setError('authNumber' as Path<FormValues<T>>, { message: '인증번호를 확인해주세요.' });
		}
	},[watch, authNumber, setError, addToast]);

	const ErrorMessage = ({ name } : { name: keyof FieldErrors<FormValues<T>> }) =>(
		errors[name] &&
		<div className={styles.inputError}>
			<span className={pointColor}>{errors[name]?.message as string || ''}</span>
		</div>
	)

	return (
		<div className={styles.userInfoFormContainer}>
			{filteredUserInfoFormFields.map(input =>
				(input.id === 'authNumber' ? authNumber !== null : true)
				&& (
					<div key={input.id} className={styles.userInfoInputBox}>
						<label className={styles.userInfoLabel}>
							<Text type='description' size='md' color='black' align='left' weight='light'>
								{input.label}
								{input.isRequired &&
								<span className={pointColor}>*</span>
								}
							</Text>
						</label>
						{input.inputType === 'text' || input.inputType === 'password'
							? (
								<div className={styles.userInfoInput}>
									<div className={styles.inputField}>
										<Controller
											name={input.id as Path<FormValues<T>>}
											control={control}
											render={({field}) =>
												<DefaultTextField
													type={input.inputType as 'text' | 'password'}
													id={input.id}
													name={input.id}
													size='sm'
													value={field.value ? String(field.value) : ''}
													onChange={(value) => field.onChange(value)}
													placeholder={
														(input.inputType === 'password' && !isSignUp)
															? '현재 비밀번호를 입력해주세요.'
															: input.placeholder || ''
													}
													isDisabled={
														!!(
															(input.id === 'email' && !isSignUp) || 
															(input.id === 'authNumber' && authNumber && hasCheckedAuthNumber)
														)
													}
												/>
											}
										/>
										{[isSignUp && 'email', 'phoneNumber', 'authNumber'].includes(input.id) && input.validationButtonText &&
										<DefaultButton
											type='mainBorder'
											borderRadius='sm'
											className={styles.validationButton}
											isDisabled={
												!!(
													input.id === 'authNumber'
														? (!authNumber ? !watcherAuthNumber : hasCheckedAuthNumber)
														: input.id === 'phoneNumber'
															? defaultPhoneNumber === phoneNumber || false
															: false
												)
											}
											onClick={
												input.id === 'email'
													? isSignUp && handleEmailDuplication
													: input.id === 'phoneNumber'
														? handleGetAuthNumber
														: handleCheckAuthNumber
											}
										>
											{input.validationButtonText}
										</DefaultButton>
										}
									</div>
									<ErrorMessage name={input.id as keyof DeepRequired<FormValues<T>>}/>
								</div>
							)
							: input.inputType === 'radio'
								? (
									<div className={styles.userInfoInput}>
										<Controller
											name={'gender' as Path<FormValues<T>>}
											control={control}
											defaultValue={'NONE' as unknown as PathValue<FormValues<T>, Path<FormValues<T>>>}
											render={({field}) => (
												<DefaultRadio
													id={input.id}
													onChange={field.onChange}
													value={field.value as string}
													justifyContent='spaceBetween'
													options={[
														{name: '남자', value: 'MALE'},
														{name: '여자', value: 'FEMALE'},
														{name: '선택안함', value: 'NONE'}
													]}
												/>
											)}
										/>
										<ErrorMessage name={input.id as keyof DeepRequired<FormValues<T>>}/>
									</div>
								)
								: input.inputType === 'address'
									? (
										<div className={styles.userInfoInput}>
											<Controller
												name={'address' as Path<FormValues<T>>}
												control={control}
												render={({field}) => (
													<SearchAddress
														size='sm'
														isInAddressObject
														control={control}
														addressValues={field.value as AddressDto|| {}}
														openAddressModal={openAddressModal}
														setOpenAddressModal={setOpenAddressModal}
														handleSelectAddressData={(data) => {
															const {zonecode, address, sido} = data;
															setValue('address.zipcode' as Path<FormValues<T>>, zonecode as PathValue<FormValues<T>, Path<FormValues<T>>>);
															setValue('address.street' as Path<FormValues<T>>, address as PathValue<FormValues<T>, Path<FormValues<T>>>);
															setValue('address.city' as Path<FormValues<T>>, sido as PathValue<FormValues<T>, Path<FormValues<T>>>);
														}}
													/>
												)}
											/>
											<ErrorMessage name={input.id as keyof DeepRequired<FormValues<T>>}/>
										</div>
									)
									: input.inputType === 'birthday' && (
									<div className={styles.userInfoInput}>
										<Controller
											name={'birthday' as Path<FormValues<T>>}
											control={control}
											render={({field}) => (
												<DatePicker
													name={input.id}
													value={field.value as string ?? null}
													onChange={field.onChange}
												/>
											)}
										/>
										<ErrorMessage name={input.id as keyof DeepRequired<FormValues<T>>}/>
									</div>
								)
						}
					</div>
				))}
		</div>
	);
};

export default UserInfoForm;