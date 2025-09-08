"use client";
import { commonWrapper } from "@/styles/common.css";
import { useState } from "react";
import NaverImage from "public/images/mypage/naver.svg";
import KakaoImage from "public/images/mypage/kakao.svg";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import Authentication from "@/components/pages/mypage/account/connectSns/authentication/Authentication";
import DefaultEmptyState from "@/components/pages/mypage/common/emptyState/defaultEmptyState/DefaultEmptyState";
import LoginSnsButton from "@/components/pages/auth/login/loginSnsButton/LoginSnsButton";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useToastStore } from "@/store/useToastStore";
import { useCompletedMode } from "@/hooks/useCompletedMode";
import { useGetConnectedSns } from "@/api/auth/queries/useGetConnectedSns";
import { useDisconnectSns } from "@/api/auth/mutations/useDisconnectSns";
import { SNS_LOGIN_CONFIG } from "@/config/snsLoginProviderConfig";

export default function ConnectSns() {
  const { data: snsProvider } = useGetConnectedSns();
  const { mutate: disconnectSnsMutate } = useDisconnectSns();

  const { isOpen, onToggle, onClose } = useModal();
  const { addToast } = useToastStore();
  const { completedMode, enableCompletedMode, disableCompletedMode } =
    useCompletedMode();
  const { isOpen: isOpenDisconnectAlert, onClose: onCloseDisconnectAlert, onToggle: onToggleDisconnectAlert } = useModal();

  const [loginFn, setLoginFn] = useState<(() => void) | null>(null);

  const handleCloseConnectBottomSheet = () => {
    onClose();
    setLoginFn(null);
  };

  const handleEnableAuthenticationMode = (fn: () => void) => {
    onClose();
    enableCompletedMode();
    setLoginFn(() => fn);
  };

  const handleDisableAuthenticationMode = () => {
    disableCompletedMode();
  };

  const handleDisconnectSns = () => {
    disconnectSnsMutate(undefined, {
      onSuccess: (response) => {
        console.log(response);
        if (response.status === 200) {
          addToast("연동이 해제되었습니다!", "above-button");
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <section>
      <Divider thickness={2} color='gray50' />
      {!completedMode ? (
        <>
          {!snsProvider ? (
            <DefaultEmptyState title="현재 연동된 SNS가 없습니다." />
          ) : (
            <div className={commonWrapper({ direction: 'col', padding: '0/20', backgroundColors: 'gray0' })}>
              <div className={commonWrapper({ padding: '16/0', justify: 'between' })}>
                <Text type="label1">
                  {SNS_LOGIN_CONFIG[snsProvider].name}
                </Text>
                {snsProvider === "naver" ? <NaverImage /> : <KakaoImage />}
              </div>
              <Divider thickness={1} color='gray200' />
            </div>
          )}
          <ButtonDocked
            type="full-button"
            onPrimaryClick={snsProvider ? onToggleDisconnectAlert : onToggle}
            primaryButtonVariant={snsProvider ? "outline" : "solid"}
            primaryButtonLabel={
              !snsProvider ? "SNS 연동하기" : "연동 해제하기"
            }
          />
          {isOpen &&
            <BottomSheet
              isOpen={isOpen}
              onClose={handleCloseConnectBottomSheet}
              title="SNS 연동하러가기"
            >
              <div
                className={commonWrapper({
                  direction: 'col',
                  padding: 20,
                  paddingBottom: 40,
                  gap: 12
                })}
              >
                <LoginSnsButton
                  size="sm"
                  borderRadius="sm"
                  provider="naver"
                  callbackUrl="/mypage/account/connect-sns"
                  defer
                  showSymbolButton
                  onDeferredLoginClick={(fn) =>
                    handleEnableAuthenticationMode(fn)
                  }
                />
                <LoginSnsButton
                  size="sm"
                  borderRadius="sm"
                  provider="kakao"
                  callbackUrl="/mypage/account/connect-sns"
                  defer
                  showSymbolButton
                  onDeferredLoginClick={(fn) =>
                    handleEnableAuthenticationMode(fn)
                  }
                />
              </div>
            </BottomSheet>
          }
          {snsProvider &&isOpenDisconnectAlert &&
            <AlertModal 
              isOpen={isOpenDisconnectAlert}
              onClose={onCloseDisconnectAlert}
              title={`${SNS_LOGIN_CONFIG[snsProvider].name} 연동을 해제하시겠어요?`}
              content="해제하면 더이상 카카오 계정으로 로그인할 수 없어요"
              confirmText="해제"
              cancelText="취소"
              onConfirm={handleDisconnectSns}
            />
          }
        </>
      ) : (
        <Authentication
          onLogin={loginFn}
          goBack={handleDisableAuthenticationMode}
        />
      )}
    </section>
  );
};
