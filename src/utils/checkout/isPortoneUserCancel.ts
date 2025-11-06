import { IamportCallback } from "@/types";

const CANCEL_PATTERNS = [
  "사용자가결제를취소하였습니다", // 네이버페이
  "결제포기사용자가결제를취소하셨습니다", // 카카오페이/NHN
];
function normalize(s: string) {
  return (
    s
      .toLowerCase()
      // 공백/괄호/구두점/하이픈 등 제거
      .replace(/[\s\[\]\.\,\!\-\_\:]/g, "")
  );
}

export function isPortoneUserCancel(res: IamportCallback): boolean {
  if (!res || res.success) return false;
  const raw = (res.error_msg ?? "").trim();
  if (!raw) return false;

  const norm = normalize(raw);

  return CANCEL_PATTERNS.some((p) => norm.includes(p));
}
