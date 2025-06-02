"use client";
import { useMemo } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Header from "@/components/layout/header/Header";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useBackNavigation } from "@/utils";
import { getHeaderProps } from "@/utils/getHeaderProps";

type HealthNoteParams = {
  dogId?: string;
  historyId?: string;
};

interface HealthNoteHeaderProps {}

const HealthNoteHeader = ({}: HealthNoteHeaderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawParams = useParams();
  const params = Object.fromEntries(
    Object.entries(rawParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ])
  ) as Record<string, string>;
  const goBack = useBackNavigation();
  const goBackPreviousPage = useBackNavigation(undefined, true);

  const {
    isOpen: isOpenConfirmAlert,
    onClose: onCloseConfirmAlert,
    onToggle: onToggleConfirmAlert,
  } = useModal();

  const headerConfigs: Record<
    string,
    {
      centerTitle?: string;
      leftTitle?: string;
      showCloseButton?: boolean;
      showBackButton?: boolean;
      showCartButton?: boolean;
      onClose?: () => void;
      onBack?: () => void;
    }
  > = {
    "/health-note/dogs": {
      centerTitle: "반려견 전체보기",
      showBackButton: true,
      onBack: goBack,
    },
    "/health-note/full-check": {
      centerTitle: "건강 종합 진단",
      showBackButton: true,
      onBack: goBackPreviousPage,
    },
    "/health-note/body-check": {
      centerTitle: "부위별 진단",
      showBackButton: true,
      onBack: goBackPreviousPage,
    },
    "/health-note/health-check-history": {
      centerTitle: "건강검진 내역",
      showBackButton: true,
      onBack: goBackPreviousPage,
    },
    "/health-note/health-check-history/create": {
      centerTitle: "건강검진 등록",
      showBackButton: true,
      onBack: goBackPreviousPage,
    },
  };

  const dynamicHeaderConfigs: Record<
    string,
    (
      params?: HealthNoteParams,
      searchParams?: URLSearchParams
    ) => {
      centerTitle?: string;
      leftTitle?: string;
      showBackButton?: boolean;
      showCartButton?: boolean;
      showCloseButton?: boolean;
      onClose?: () => void;
      onBack?: () => void;
    }
  > = {
    "/health-note/dogs/": (params) => {
      const dogDetail = !!params?.dogId;
      return {
        centerTitle: dogDetail ? "반려견 정보 수정" : "반려견 추가",
        showBackButton: dogDetail,
        onBack: goBackPreviousPage,
        showCloseButton: !dogDetail,
        onClose: onToggleConfirmAlert,
      };
    },
  };

  const headerProps = useMemo(
    () =>
      getHeaderProps({
        pathname,
        headerConfigs,
        dynamicHeaderConfigs,
        params,
        searchParams,
      }),
    [pathname, params]
  );

  const excludePaths = [
    "/health-note/full-check/survey",
    "/health-note/full-check/result",
    "/health-note/body-check/survey",
    "/health-note/guest",
    "/health-note",
    "health-note/body-check/survey",
    `/health-note/health-check-history/${params.historyId}`,
  ];

  const shouldRenderHeader = useMemo(() => {
    // pathname이 excludePaths 중 하나라도 포함하면 false
    return !excludePaths.some((path) => pathname === path);
  }, [pathname]);

  return (
    <>
      {shouldRenderHeader && <Header {...headerProps} />}
      {isOpenConfirmAlert && (
        <AlertModal
          title="등록을 종료하시겠어요?"
          content="입력하신 정보는 저장되지 않아요"
          isOpen={isOpenConfirmAlert}
          onClose={onCloseConfirmAlert}
          cancelText="돌아가기"
          confirmText="삭제하기"
          onCancel={() => onCloseConfirmAlert()}
          onConfirm={() => goBackPreviousPage()}
        />
      )}
    </>
  );
};

export default HealthNoteHeader;
