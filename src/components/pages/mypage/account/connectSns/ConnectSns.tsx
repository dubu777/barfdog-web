"use client";
import { useState } from "react";
import * as styles from "../Account.css";
import NaverImage from "public/images/mypage/naver.svg";
import KakaoImage from "public/images/mypage/kakao.svg";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import useModal from "@/hooks/useModal";
import DefaultText from "@/components/common/defaultText/DefaultText";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import DefaultEmptyState from "@/components/pages/mypage/common/emptyState/defaultEmptyState/DefaultEmptyState";
import { useToastStore } from "@/store/useToastStore";
import { useCompletedMode } from "@/hooks/useCompletedMode";
import { useGetConnectedSns } from "@/api/auth/queries/useGetConnectedSns";
import { useDisconnectSns } from "@/api/auth/mutations/useDisconnectSns";
import LoginSnsButton from "@/components/pages/auth/login/loginSnsButton/LoginSnsButton";
import Authentication from "@/components/pages/mypage/account/connectSns/authentication/Authentication";

const ConnectSns = () => {
  const { data: snsProvider } = useGetConnectedSns();
  const { mutate: disconnectSnsMutate } = useDisconnectSns();

  const { isOpen, onToggle, onClose } = useModal();
  const { addToast } = useToastStore();
  const { completedMode, enableCompletedMode, disableCompletedMode } =
    useCompletedMode();

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
      {!completedMode ? (
        <>
          {!snsProvider ? (
            <DefaultEmptyState title="현재 연동된 SNS가 없습니다." />
          ) : (
            <div className={styles.connectedSns}>
              <DefaultText type="label1">
                {snsProvider === "naver" ? "네이버" : "카카오"}
              </DefaultText>
              {snsProvider === "naver" ? <NaverImage /> : <KakaoImage />}
            </div>
          )}
          <div className={styles.disconnectSnsSubmit}>
            <ButtonDocked
              type="full-button"
              onPrimaryClick={snsProvider ? handleDisconnectSns : onToggle}
              primaryButtonLabel={
                !snsProvider ? "SNS 연동하기" : "연동 해제하기"
              }
            />
          </div>
          <BottomSheet
            isOpen={isOpen}
            onClose={handleCloseConnectBottomSheet}
            title="SNS 연동하러가기"
          >
            <div className={styles.connectSnsBox}>
              <LoginSnsButton
                size="sm"
                borderRadius="sm"
                provider="naver"
                callbackUrl="/mypage/account/connect-sns"
                defer
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
                onDeferredLoginClick={(fn) =>
                  handleEnableAuthenticationMode(fn)
                }
              />
            </div>
          </BottomSheet>
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

export default ConnectSns;
