'use client';
import * as styles from '../../Account.css';
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { connectSnsSchema, defaultConnectSnsValue } from "@/utils/validation/authValidation";
import { ConnectSnsPassword } from "@/types";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InputField from "@/components/common/inputField/InputField";

interface AuthenticationProps {
	onLogin: (() => void) | null;
	goBack: () => void;
}

const Authentication = ({ onLogin, goBack }: AuthenticationProps) => {
	const { handleSubmit, control, errors, isValid } = useFormHandler<ConnectSnsPassword>(connectSnsSchema, defaultConnectSnsValue);

	const handleConnectSns = (data: ConnectSnsPassword) => {
		// 비밀번호 확인 검증 필요
		if(onLogin) {
			onLogin();
		}
	}

	return (
		<section className={styles.connectSnSAuthContainer}>
			<article className={styles.connectSnSAuthTitle}>
				<DefaultText type='title3'>
					계정정보 확인을 위해<br/>
					비밀번호를 입력해주세요
				</DefaultText>
				<DefaultText type='body1' color='gray600'>개인정보 보호를 위해 인증절차가 필요합니다.</DefaultText>
			</article>
			<article className={styles.connectSnSAuthForm}>
				<Controller
					control={control}
					name='password'
					render={({ field }) => (
						<InputField
							masking
							id='password'
							label='비밀번호 확인'
							isRequired
							placeholder='기존 비밀번호를 입력하세요'
							error={errors?.password?.message}
							onSubmit={isValid ? handleSubmit(handleConnectSns) : undefined}
							{...field}
						/>
					)}
				/>
			</article>
			<ButtonDocked
				type='dual-button'
				secondaryButtonLabel='돌아가기'
				onSecondaryClick={goBack}
				primaryButtonLabel='연동하기'
				onPrimaryClick={handleSubmit(handleConnectSns)}
				isPrimaryDisabled={!isValid}
				position='fixed'
			/>
		</section>
	);
};

export default Authentication;