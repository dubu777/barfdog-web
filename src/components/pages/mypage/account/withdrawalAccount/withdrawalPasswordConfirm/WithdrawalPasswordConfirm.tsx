import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import InputField from "@/components/common/inputField/InputField";
import InputStatusMessage from "@/components/common/inputStatusMessage/InputStatusMessage";
import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { useState } from "react";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import { useWithdrawalAccount } from "@/api/auth/mutations/useWithdrawalAccount";
import { isAxiosError } from "axios";

export default function WithdrawalPasswordConfirm() {
  const router = useRouter();
  const { isOpen: isOpenErrorAlert, onClose: onCloseErrorAlert, onToggle: onToggleErrorAlert } = useModal();

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { mutate: withdrawalAccount } = useWithdrawalAccount();
  
  const onSubmit = () => {
    withdrawalAccount({ password }, 
      {
        onSuccess: () => {
          router.push('/');
          sessionStorage.setItem("withdrawalSuccess", "true");
        },
        onError: (error) => {
          const code = isAxiosError(error) ? error?.response?.data?.errors[0].code : null;
          switch (code) {
            case 'Wrong Password':
              setPasswordError('기존 비밀번호가 일치하지 않습니다');
              break;
            case 'ordering':
            case 'reserving':
              onToggleErrorAlert();
              break;
            default:
              setPasswordError('관리자에게 문의해주세요');
          }
        }
      }
    );
  }
  return (
    <>
      <article className={commonWrapper({ direction: 'col', align: 'start', gap: 32, padding: '40/20' })}>
        <Text type='title3'>
          회원 인증을 위해<br/>
          비밀번호를 입력해 주세요
        </Text>
        <div className={commonWrapper({ width: 'full', direction: 'col', align: 'start', gap: 8 })}>
          <InputField
            isRequired
            type="password"
            variants="box"
            placeholder="기존 비밀번호를 입력해주세요."
            label="기존 비밀번호"
            onReset={() => setPassword("")}
            clearButton
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(null);
            }}
            onSubmit={onSubmit}
          />
          {passwordError && (
            <InputStatusMessage
              type='error'
              message={passwordError}
            />
          )}
        </div>
        <ButtonDocked
          type="full-button"
          primaryButtonLabel="탈퇴하기"
          onPrimaryClick={onSubmit}
          isPrimaryDisabled={!!passwordError || !password.length}
        />
      </article>
      {isOpenErrorAlert && 
        <AlertModal
          isOpen={isOpenErrorAlert}
          onConfirm={onCloseErrorAlert}
          onClose={onCloseErrorAlert}
          title='회원 탈퇴를 진행할 수 없습니다'
          content='현재 구독 중이거나 완료되지 않은 주문이 있어 탈퇴할 수 없습니다. 구독 해지 및 주문 완료 후 다시 시도해 주세요.'
          confirmText='확인'
          buttonPosition='right'
          closeOnBackgroundClick={false}
        />
      }
    </>
  );
}