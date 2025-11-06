"use client";
import { commonWrapper } from "@/styles/common.css";
import NaverImage from "public/images/mypage/naver.svg";
import KakaoImage from "public/images/mypage/kakao.svg";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import EmptyState from "@/components/pages/mypage/common/emptyState/EmptyState";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { OAUTH_CLIENT_CONFIG } from "@/config/oauthClient";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";
import { useGetUserInfo } from "@/api/mypage/account/queries/useGetUserInfo";
import { useDisconnectSns } from "@/api/mypage/account/mutations/useDisconnectSns";

export default function ConnectedSns() {
  const { data: userInfo } = useGetUserInfo();
  const snsProvider = userInfo?.provider;

  const { mutate: disconnectSns } = useDisconnectSns();
  const { handleSuccess, handleError } = useApiResponseHandler();
  const {
    isOpen: isOpenDisconnectAlert,
    onClose: onCloseDisconnectAlert,
    onToggle: onToggleDisconnectAlert,
  } = useModal();

  const handleDisconnectSns = () => {
    disconnectSns(undefined, {
      onSuccess: () => {
        handleSuccess("연동이 해제됐습니다");
      },
      onError: (error) => {
        console.log(error);
        handleError(error, "연동 해제에 실패했습니다.", undefined, "above-button");
      },
    });
  };

  return (
    <section>
      <Divider thickness={2} color="gray50" />
      {!snsProvider ? (
        <EmptyState title="현재 연동된 SNS가 없습니다." />
      ) : (
        <div
          className={commonWrapper({
            direction: "col",
            padding: "0/20",
            backgroundColors: "gray0",
          })}
        >
          <div
            className={commonWrapper({
              padding: "16/0",
              justify: "between",
            })}
          >
            <Text type="label1">
              {OAUTH_CLIENT_CONFIG[snsProvider].name}
            </Text>
            {snsProvider === "naver" ? <NaverImage /> : <KakaoImage />}
          </div>
          <Divider thickness={1} color="gray200" />
        </div>
      )}
      {snsProvider && 
        <ButtonDocked
          type="full-button"
          onPrimaryClick={onToggleDisconnectAlert}
          primaryButtonVariant="outline"
          primaryButtonLabel="연동 해제하기"
        />
      }
      {snsProvider && isOpenDisconnectAlert && (
        <AlertModal
          isOpen={isOpenDisconnectAlert}
          onClose={onCloseDisconnectAlert}
          title={`${OAUTH_CLIENT_CONFIG[snsProvider].name} 연동을 해제하시겠어요?`}
          content={`연동을 해제하면 ${OAUTH_CLIENT_CONFIG[snsProvider].name} 로그인은 중단돼요. 원하실 때 다시 연결하실 수 있어요.`}
          confirmText="해제"
          cancelText="취소"
          onConfirm={handleDisconnectSns}
        />
      )}
    </section>
  );
}
