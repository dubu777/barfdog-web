'use client';
import * as styles from './SignUp.css';
import Text from "@/components/common/text/Text";
import SignUpForm from "@/components/pages/auth/signUp/signUpForm/SignUpForm";
import SignUpTerms from "@/components/pages/auth/signUp/signUpTerms/SignUpTerms";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useFormHandler } from "@/hooks/useFormHandler";
import { defaultSignUpValues, signUpSchema } from "@/utils/validation/authValidation";
import { SignUpFormValues } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";

const SignUp = () => {
	const { loginUserInfo } = useAuthStore();
	const { handleSubmit, control, watch, errors, setValue, setError } = useFormHandler<SignUpFormValues>(signUpSchema, defaultSignUpValues(loginUserInfo));

	const onSubmit = (data: SignUpFormValues) => {
		console.log('formData', data);
	}
	return (
		<section className={styles.signUpContainer}>
			<Text type='title' size='titleLg'>회원가입</Text>
			<form>
				<SignUpForm
					control={control}
					watch={watch}
					errors={errors}
					setError={setError}
					setValue={setValue}
				/>
				<SignUpTerms
					isSignUp
					control={control}
					watch={watch}
					setValue={setValue}
					setError={setError}
				/>
			</form>
			<div className={styles.submitButton}>
				<DefaultButton onClick={handleSubmit(onSubmit)} type='main' borderRadius='sm' >
					회원가입
				</DefaultButton>
			</div>
		</section>
	);
};

export default SignUp;