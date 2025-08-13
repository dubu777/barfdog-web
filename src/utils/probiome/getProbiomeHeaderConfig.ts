import { headers } from "next/headers";

interface HeaderConfig {
  title: string;
  showCloseButton: boolean;
}

// 경로별 헤더 설정 매핑
const HEADER_CONFIGS: Record<string, HeaderConfig> = {
  "/health-note/probiome": {
    title: "장내 미생물 검사",
    showCloseButton: false,
  },
  "/health-note/probiome/create": {
    title: "장내 미생물 검사",
    showCloseButton: false,
  },
  "/health-note/probiome/detail": {
    title: "상세보기",
    showCloseButton: false,
  },
  "/health-note/probiome/return-request": {
    title: "회수신청",
    showCloseButton: false,
  },
  "/health-note/probiome/survey": {
    title: "장내미생물 진단 설문",
    showCloseButton: true,
  },
};

export async function getProbiomeHeaderConfig(): Promise<HeaderConfig> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // 동적 경로 처리
  if (pathname.includes("/detail/")) {
    return HEADER_CONFIGS["/health-note/probiome/detail"];
  }
  if (pathname.includes("/return-request/")) {
    return HEADER_CONFIGS["/health-note/probiome/return-request"];
  }

  return HEADER_CONFIGS[pathname] || HEADER_CONFIGS["/health-note/probiome"];
}
