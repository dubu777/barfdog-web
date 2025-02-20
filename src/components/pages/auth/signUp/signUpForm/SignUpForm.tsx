'use client';
import { useState } from "react";
import {Control, FieldErrors, UseFormSetError, UseFormSetValue, UseFormWatch} from "react-hook-form";
import { SignUpFormValues } from "@/types";
import UserInfoForm from "@/components/common/userInfoForm/UserInfoForm";

interface SignUpFormProps {
	control: Control<SignUpFormValues>;
	watch: UseFormWatch<SignUpFormValues>;
	errors: FieldErrors<SignUpFormValues>;
	setValue: UseFormSetValue<SignUpFormValues>;
	setError: UseFormSetError<SignUpFormValues>;
}

const SignUpForm = ({ control, watch, errors, setValue, setError }: SignUpFormProps) => {
	const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);

	return (
		<UserInfoForm
			isSignUp
			control={control}
			watch={watch}
			errors={errors}
			setValue={setValue}
			setError={setError}
			openAddressModal={openAddressModal}
			setOpenAddressModal={setOpenAddressModal}
		/>
	);
};

export default SignUpForm;