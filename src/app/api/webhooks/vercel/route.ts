import {
  verifyVercelRequest,
  buildDeploymentMessage,
  VercelWebhookEvent,
} from "@/utils/webhook/vercel";
import {
  getNaverWorksConfigFromEnv,
  sendNaverWorksMessage,
} from "@/utils/webhook/naverWorks";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  const webhookSecret: string | undefined = process.env.VERCEL_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("[VercelWebhook] VERCEL_WEBHOOK_SECRET 미설정");
    return Response.json(
      { ok: false, error: "server_misconfigured" },
      { status: 500 }
    );
  }

  // 1. Vercel 시그니처 검증 + JSON 파싱
  const { ok, event } = await verifyVercelRequest(request, webhookSecret);

  if (!ok || !event) {
    console.warn("[VercelWebhook] invalid signature or payload");
    return Response.json(
      { ok: false, error: "invalid_signature_or_payload" },
      { status: 403 }
    );
  }

  const typedEvent: VercelWebhookEvent = event;

  // 2. 배포 성공/실패 외의 이벤트는 스킵
  if (
    typedEvent.type !== "deployment.succeeded" &&
    typedEvent.type !== "deployment.error"
  ) {
    return Response.json({ ok: true, skipped: true });
  }

  // 3. 네이버웍스로 보낼 메시지 생성
  const message: string | null = buildDeploymentMessage(typedEvent);
  if (!message) {
    return Response.json({ ok: true, skipped: true });
  }

  // 4. NAVER WORKS Bot 메시지 전송
  try {
    const config = getNaverWorksConfigFromEnv();
    await sendNaverWorksMessage(message, config);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[VercelWebhook] NAVER WORKS 메시지 전송 실패:", error);

    // 원하면 여기 status: 200 으로 바꿔서 Vercel 재시도 막을 수도 있음
    return Response.json(
      { ok: false, error: "failed_to_send_naver_works" },
      { status: 500 }
    );
  }
}
