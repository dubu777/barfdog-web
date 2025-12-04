import crypto from "crypto";

export type VercelDeploymentEventType =
  | "deployment.succeeded"
  | "deployment.error"
  | string;

export interface VercelDeploymentPayload {
  team?: { id: string | null };
  user?: { id: string };
  deployment: {
    id: string;
    url: string;
    name: string;
    meta?: Record<string, string>;
  };
  links?: {
    deployment?: string;
    project?: string;
  };
  target?: "production" | "staging" | null;
  project?: {
    id: string;
  };
  plan?: string;
  regions?: string[];
  error?: unknown;
  meta?: Record<string, string>;
  [key: string]: unknown;
}

export interface VercelWebhookEvent {
  id: string;
  type: VercelDeploymentEventType;
  createdAt: number;
  region: string | null;
  payload: VercelDeploymentPayload;
}

export interface VerifyVercelResult {
  ok: boolean;
  event?: VercelWebhookEvent;
}

// Vercel 문서 기준: x-vercel-signature = sha1(HMAC(body, secret))
function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac("sha1", secret).update(data).digest("hex");
}

/**
 * Vercel Webhook 요청 검증
 * - 시그니처 검증 실패하면 ok: false
 * - 성공하면 event에 파싱된 JSON 리턴
 */
export async function verifyVercelRequest(
  request: Request,
  secret: string
): Promise<VerifyVercelResult> {
  const rawBody: string = await request.text();
  const rawBodyBuffer: Buffer = Buffer.from(rawBody, "utf-8");

  const bodySignature: string = sha1(rawBodyBuffer, secret);
  const headerSignature: string | null =
    request.headers.get("x-vercel-signature");

  if (!headerSignature) {
    return { ok: false };
  }

  // Timing attack 방지를 위한 안전한 비교
  const bodySignatureBuffer: Buffer = Buffer.from(bodySignature, "utf-8");
  const headerSignatureBuffer: Buffer = Buffer.from(headerSignature, "utf-8");

  if (
    bodySignatureBuffer.length !== headerSignatureBuffer.length ||
    !crypto.timingSafeEqual(bodySignatureBuffer, headerSignatureBuffer)
  ) {
    return { ok: false };
  }

  try {
    const event: VercelWebhookEvent = JSON.parse(
      rawBodyBuffer.toString("utf-8")
    ) as VercelWebhookEvent;
    return { ok: true, event };
  } catch (error) {
    console.error("[VercelWebhook] JSON parse error:", error);
    return { ok: false };
  }
}

/**
 * Vercel 배포 성공/실패 이벤트 → 네이버웍스에 보낼 메시지 문자열로 변환
 */
export function buildDeploymentMessage(
  event: VercelWebhookEvent
): string | null {
  const { type, payload } = event;
  const { deployment, error } = payload;

  if (!deployment) return null;

  const baseInfo: string = [
    `프로젝트: ${deployment.name}`,
    `배포: ${process.env.DEPLOY_PUBLIC_URL}`,
  ].join("\n");

  if (type === "deployment.succeeded") {
    return `✅ [Vercel] 배포 성공\n${baseInfo}`;
  }

  if (type === "deployment.error") {
    const errorText: string =
      (typeof error === "object" && error !== null
        ? (error as { message?: string; code?: string }).message ||
          (error as { message?: string; code?: string }).code ||
          JSON.stringify(error)
        : typeof error === "string"
        ? error
        : "") || "에러 정보 없음";

    return `❌ [Vercel] 배포 실패\n${baseInfo}\n에러: ${errorText}`;
  }

  return null;
}
