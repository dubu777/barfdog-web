"use client";
import { useMemo, useCallback } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Header from "@/components/layout/header/Header";
import { getHeaderProps } from "@/utils/getHeaderProps";

type HealthNoteParams = {
  petId?: string;
  diagnosisId?: string;
  reportId?: string;
};

export default function HealthNoteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawParams = useParams();
  const params = Object.fromEntries(
    Object.entries(rawParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ])
  ) as Record<string, string>;
  const goBackToMain = useCallback(() => {
    router.push("/health-note");
  }, [router]);

  const headerConfigs = useMemo<Record<
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
  >>(() => ({
    "full-check": {
      centerTitle: "건강 종합 진단",
      showBackButton: true,
      onBack: goBackToMain,
    },
    "body-check": {
      centerTitle: "부위별 진단",
      showBackButton: true,
      onBack: goBackToMain,
    },
    "medical-history": {
      centerTitle: "병원 진료 기록",
      showBackButton: true,
      onBack: goBackToMain,
    },
    "medical-history/create": {
      centerTitle: "병원 진료 기록 등록",
      showBackButton: true,
    },
    dogpedia: {
      centerTitle: "견종 백과",
      showBackButton: true,
    },
    probiome: {
      centerTitle: "장내 미생물 검사",
      showBackButton: true,
      onBack: goBackToMain,
    },
    "probiome/create": {
      centerTitle: "장내 미생물 검사",
      showBackButton: true,
    },
    "ai-obesity-check": {
      centerTitle: "AI 비만 진단",
      showBackButton: true,
      onBack: goBackToMain,
    },
  }), [goBackToMain]);

  const dynamicHeaderConfigs = useMemo<Record<
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
  >>(() => ({
    "probiome/detail/": () => ({
      centerTitle: "상세보기",
      showBackButton: true,
    }),
    "ai-obesity-check/result/": () => ({
      showBackButton: true,
      onBack: goBackToMain,
    }),
  }), [goBackToMain]);

  const headerProps = useMemo(
    () =>
      getHeaderProps({
        pathname,
        headerConfigs,
        dynamicHeaderConfigs,
        params,
        searchParams,
      }),
    [pathname, params, searchParams, headerConfigs, dynamicHeaderConfigs]
  );

  // 정확히 일치하면 제외할 경로
  const exactExcludePaths = useMemo(() => [
    "/health-note/guest",
    "/health-note",
    `/health-note/${params.petId}/medical-history/${params.diagnosisId}`,
    `/health-note/${params.petId}/full-check/result/${params.diagnosisId}`,
    `/health-note/${params.petId}/probiome/survey`,
    `/health-note/${params.petId}/probiome/pickup/${params.diagnosisId}`,
    `/health-note/${params.petId}/ai-obesity-check`,
  ], [params.petId, params.diagnosisId]);

  // 접두사로 시작하면 제외할 경로
  const prefixExcludePaths = useMemo(() => [
    `/health-note/${params.petId}/full-check/survey`,
    `/health-note/${params.petId}/body-check/survey`,
    `/health-note/${params.petId}/body-check/result`,
  ], [params.petId]);

  const shouldRenderHeader = useMemo(() => {
    if (exactExcludePaths.includes(pathname)) {
      return false;
    }

    if (prefixExcludePaths.some((prefix) => pathname.startsWith(prefix))) {
      return false;
    }

    return true;
  }, [pathname, exactExcludePaths, prefixExcludePaths]);

  return <>{shouldRenderHeader && <Header {...headerProps} />}</>;
}
