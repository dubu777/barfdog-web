// src/app/api/oauth/[provider]/token/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OAUTH_SERVER_CONFIG } from "@/config/oauthServer";
import { SnsProvider } from "@/types";

function validateEnv(provider: SnsProvider) {
  const cfg = OAUTH_SERVER_CONFIG[provider];
  if (!cfg.clientId || !cfg.redirectUri || !cfg.tokenUrl) return false;
  if (provider === "naver" && !cfg.clientSecret) return false;
  return true;
}

function buildBody(provider: SnsProvider, code: string, state?: string) {
  const cfg = OAUTH_SERVER_CONFIG[provider];
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: cfg.clientId,
    redirect_uri: cfg.redirectUri,
    code,
  });

  // kakao: client_secret 옵션
  if (provider === "kakao" && cfg.clientSecret) {
    body.set("client_secret", cfg.clientSecret);
  }

  // naver: client_secret 필수 + 토큰 교환에도 state 포함
  if (provider === "naver") {
    body.set("client_secret", cfg.clientSecret!);
    if (state) body.set("state", state);
  }

  return body;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { provider: SnsProvider } }
) {
  try {
    const provider = params.provider;
    if (provider !== "kakao" && provider !== "naver") {
      return NextResponse.json(
        { message: "unsupported provider" },
        { status: 400 }
      );
    }

    if (!validateEnv(provider)) {
      return NextResponse.json(
        { message: "server env missing for provider" },
        { status: 500 }
      );
    }

    const { code, state } = (await req.json()) as {
      code?: string;
      state?: string;
    };
    if (!code) {
      return NextResponse.json({ message: "code required" }, { status: 400 });
    }
    const cfg = OAUTH_SERVER_CONFIG[provider];
    if (cfg.requireState && !state) {
      return NextResponse.json({ message: "state required" }, { status: 400 });
    }

    // 공급자 토큰 엔드포인트 호출
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(cfg.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: buildBody(provider, code, state),
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return NextResponse.json(
        {
          message: `${provider} token exchange failed`,
          status: res.status,
          detail,
        },
        { status: 502 }
      );
    }

    const json = await res.json(); // { access_token, ... }
    return NextResponse.json(json, { status: 200 });
  } catch (err: any) {
    const aborted = err?.name === "AbortError";
    return NextResponse.json(
      { message: aborted ? "timeout" : "internal error" },
      { status: aborted ? 504 : 500 }
    );
  }
}
