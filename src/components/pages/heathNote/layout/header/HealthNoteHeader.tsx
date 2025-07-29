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
  reportId?: string;
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
    },
    "/health-note/body-check": {
      centerTitle: "부위별 진단",
      showBackButton: true,
    },
    "/health-note/health-check-history": {
      centerTitle: "건강검진 내역",
      showBackButton: true,
    },
    "/health-note/health-check-history/create": {
      centerTitle: "건강검진 등록",
      showBackButton: true,
    },
    "/health-note/dogpedia": {
      centerTitle: "견종 백과",
      showBackButton: true,
    },
    "/health-note/gut-check": {
      centerTitle: "장내 미생물 검사",
      showBackButton: true,
    },
    "/health-note/gut-check/create": {
      centerTitle: "장내 미생물 검사",
      showBackButton: true,
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
    "/health-note/gut-check/detail/": () => ({
      centerTitle: "",
      showBackButton: true,
    }),
    "/health-note/gut-check/return-request/": () => ({
      centerTitle: "회수신청",
      showBackButton: true,
    }),
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

  // 정확히 일치하면 제외할 경로
  const exactExcludePaths = [
    "/health-note/guest",
    "/health-note",
    `/health-note/health-check-history/${params.historyId}`,
    `/health-note/full-check/result/${params.reportId}`,
    "/health-note/gut-check/survey",
  ];

  // 접두사로 시작하면 제외할 경로
  const prefixExcludePaths = [
    "/health-note/full-check/survey",
    "/health-note/body-check/survey",
    "/health-note/body-check/result",
  ];

  const shouldRenderHeader = useMemo(() => {
    if (exactExcludePaths.includes(pathname)) {
      return false;
    }

    if (prefixExcludePaths.some((prefix) => pathname.startsWith(prefix))) {
      return false;
    }

    return true;
  }, [pathname, params.historyId]);

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
