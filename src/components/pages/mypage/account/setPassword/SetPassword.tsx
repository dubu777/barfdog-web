'use client';
import * as yup from "yup";
import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import InputField from "@/components/ui/inputField/InputField";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Text from "@/components/ui/text/Text";
import InputStatusMessage from "@/components/ui/inputStatusMessage/InputStatusMessage";
import { useFormHandler } from "@/hooks/useFormHandler";
import { SetPassword as SetPasswordType } from "@/types/mypage/account";
import { getPasswordCriteria, isValidPassword } from "@/utils/validation/auth/password";
import { useSetPassword } from "@/api/mypage/account/mutations/useSetPassword";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";

const setPasswordSchema = yup.object().shape({
	password: yup.string().required("새 비밀번호를 입력해주세요"),
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
	const { 
		handleSubmit, 
		control, 
		errors, 
		setValue, 
		trigger, 
		dirtyFields,
		getValues,
		isValid,
	} = useFormHandler<SetPasswordType>(setPasswordSchema, defaultSetPasswordValues);
	const router = useRouter();
	const { mutate } = useSetPassword();
	const { handleSuccess } = useApiResponseHandler();

	const onSubmit = (data: SetPasswordType) => {
		mutate(
			data,
			{
				onSuccess: () => {
					handleSuccess('비밀번호 설정이 완료됐습니다');
					router.push('/mypage/account');
				}
			}
		)
	}
	return (
		<section className={commonWrapper({ 
			direction: 'col', 
			align: 'start', 
			gap: 32, 
			paddingX: 20,
			paddingY: 40,
		})}>
			<div className={commonWrapper({ direction: 'col', align: 'start', gap: 12 })}>
				<Text type='title3'>
					회원정보 수정을 위해<br/>
					비밀번호를 설정해 주세요
				</Text>
				<Text type='body3' color='gray600'>
					SNS 간편 로그인으로 가입하신 경우에는 회원정보 보호를 위해 처음 1회 비밀번호 설정이 필요해요
				</Text>
			</div>
			<form
				className={commonWrapper({
					direction: 'col',
					align: 'start',
					gap: 20,
				})}
			>
				<Controller
					control={control}
					name='password'
					render={({ field }) => (
						<div className={commonWrapper({ width: 'full', direction: 'col', align: 'start', gap: 8 })}>
              <InputField
                {...field}
								isRequired
                type="password"
                variants="box"
                placeholder="새 비밀번호를 입력해주세요."
                label="새 비밀번호"
                error={errors?.password?.message}
                onReset={() => setValue("password", "")}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("confirmPassword");
                }}
              />
              {dirtyFields?.password && (
                <div className={commonWrapper({ direction: 'col', gap: 4 })}>
                  {getPasswordCriteria(field.value).map(({ label, ok }) => {
                    return (
                      <InputStatusMessage
                        key={label} type={ok ? 'success' : 'error'}
                        message={label}
                      />
                    );
                  })}
                </div>
              )}
            </div>
					)}
				/>
				<Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => {
            const passwordConfirmError = errors?.confirmPassword?.message;
            return (
              <div className={commonWrapper({ width: 'full', direction: 'col', align: 'start', gap: 8 })}>
                <InputField
                  {...field}
									isRequired
                  type="password"
                  variants="box"
                  placeholder="새 비밀번호를 확인을 입력해주세요."
                  label="새 비밀번호 확인"
                  onReset={() => setValue("confirmPassword", "")}
                  onSubmit={
                    !isValidPassword(field.value)
                      ? handleSubmit(onSubmit)
                      : undefined
                  }
                />
                {dirtyFields.confirmPassword && (
                  <InputStatusMessage
                    type={!passwordConfirmError ? 'success' : 'error'}
                    message={
                      `비밀번호가 ${!passwordConfirmError ? '일치합니다' : '일치하지 않습니다'}`
                    }
                  />
                )}
              </div>
            );
          }}
        />
			</form>
			<ButtonDocked
				type='full-button'
				primaryButtonLabel='저장하기'
				onPrimaryClick={handleSubmit(onSubmit)}
				isPrimaryDisabled={!isValidPassword(getValues("password")) || !isValid}
			/>
		</section>
	);
};