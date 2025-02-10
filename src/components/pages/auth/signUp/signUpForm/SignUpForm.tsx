'use client';
import * as styles from './SignUpForm.css';
import { useState } from "react";
import { pointColor } from "@/styles/common.css";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import DefaultRadio from "@/components/common/defaultRadio/DefaultRadio";
import SearchAddress from "@/components/common/searchAddress/SearchAddress";
import DatePicker from "@/components/common/datePicker/DatePicker";
import { Control, Controller, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SignUpFormFields, SignUpFormValues } from "@/types/auth/signUp";

const signUpFormFields: SignUpFormFields[] = [
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
	},
	{
		id: 'phoneNumber',
		label: '휴대폰 번호',
		inputType: 'text',
		validationButtonText: '인증번호 받기',
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
	},
]

interface SignUpFormProps {
	control: Control<SignUpFormValues>;
	watch: UseFormWatch<SignUpFormValues>;
	errors: FieldErrors<SignUpFormValues>;
	setValue: UseFormSetValue<SignUpFormValues>;
}

const SignUpForm = ({ control, watch, errors, setValue }: SignUpFormProps) => {
	const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
	const formValues = watch();
	console.log(formValues)
	console.log(errors)
	
	const ErrorMessage = ({ input } : { input: SignUpFormFields }) =>(
		errors[input.id as keyof SignUpFormValues] &&
		<div className={styles.inputError}>
			<span className={pointColor}>{errors[input.id as keyof SignUpFormValues]?.message}</span>
		</div>
	)

	return (
		<div className={styles.signupFormContainer}>
			{signUpFormFields.map(input => (
				<div key={input.id} className={styles.signupInputBox}>
					<label className={styles.signupLabel}>
						<Text type='description' size='md' color='black' align='left' weight='light'>
							{input.label}
							{input.isRequired &&
								<span className={pointColor}>*</span>
							}
						</Text>
					</label>
					{input.inputType === 'text' || input.inputType === 'password'
						? (
							<div className={styles.signupInput}>
								<div className={styles.inputField}>
									<Controller
										name={input.id as keyof SignUpFormValues}
										control={control}
										render={({ field }) =>
											<DefaultTextField
												type={input.inputType as 'text' | 'password'}
												id={input.id}
												name={input.id}
												size='sm'
												value={field.value ? String(field.value) : ''}
												onChange={(value) => field.onChange(value)}
												placeholder={input.placeholder || ''}
											/>
										}
									/>
									{input.validationButtonText &&
										<DefaultButton type='mainBorder' borderRadius='sm' className={styles.validationButton}>
											{input.validationButtonText}
										</DefaultButton>
									}
								</div>
								<ErrorMessage input={input} />
							</div>
						)
						: input.inputType === 'radio'
						? (
							<div className={styles.signupInput}>
								<Controller
									name='gender'
									control={control}
									defaultValue='NONE'
									render={({ field }) => (
										<DefaultRadio
											id={input.id}
											onChange={field.onChange}
											value={field.value}
											justifyContent='spaceBetween'
											options={[
												{ name: '남자', value: 'MALE' },
												{ name: '여자', value: 'FEMALE' },
												{ name: '선택안함', value: 'NONE' }
											]}
										/>
									)}
								/>
								<ErrorMessage input={input} />
							</div>
							)
							: input.inputType === 'address'
								? (
									<div className={styles.signupInput}>
										<Controller
											name='address'
											control={control}
											render={({ field }) => (
												<SearchAddress
													size='sm'
													isInAddressObject
													control={control}
													addressValues={field.value || {}}
													openAddressModal={openAddressModal}
													setOpenAddressModal={setOpenAddressModal}
													handleSelectAddressData={(data) => {
														const { zonecode, address, sido } = data;
														setValue('address.zipcode', zonecode);
														setValue('address.street', address);
														setValue('address.city', sido);
													}}
												/>
											)}
										/>
										<ErrorMessage input={input} />
									</div>
								)
								: input.inputType === 'birthday' && (
									<div className={styles.signupInput}>
										<Controller
											name='birthday'
											control={control}
											render={({ field }) => (
												<DatePicker
													name={input.id}
													value={field.value ?? null}
													onChange={field.onChange}
												/>
											)}
										/>
										<ErrorMessage input={input} />
									</div>
								)
					}
				</div>
			))}
		</div>
	);
};

export default SignUpForm;