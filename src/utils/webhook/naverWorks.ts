import jwt from "jsonwebtoken";

export interface NaverWorksConfig {
  clientId: string;
  clientSecret: string;
  serviceAccount: string;
  privateKey: string;
  botId: string;
  channelId: string;
}

/**
 * ENV 에서 NAVER WORKS 설정 읽기
 */
export function getNaverWorksConfigFromEnv(): NaverWorksConfig {
  const clientId: string | undefined = process.env.NAVER_WORKS_CLIENT_ID;
  const clientSecret: string | undefined =
    process.env.NAVER_WORKS_CLIENT_SECRET;
  const serviceAccount: string | undefined =
    process.env.NAVER_WORKS_SERVICE_ACCOUNT;
  const rawPrivateKey: string | undefined = process.env.NAVER_WORKS_PRIVATE_KEY;
  const botId: string | undefined = process.env.NAVER_WORKS_BOT_ID;
  const channelId: string | undefined = process.env.NAVER_WORKS_CHANNEL_ID;

  if (
    !clientId ||
    !clientSecret ||
    !serviceAccount ||
    !rawPrivateKey ||
    !botId ||
    !channelId
  ) {
    throw new Error(
      "NAVER WORKS 관련 환경 변수(NAVER_WORKS_*)가 모두 설정되어 있지 않습니다."
    );
  }

  // ENV에 저장할 때 줄바꿈을 \n 으로 넣었다면 복원
  const privateKey: string = rawPrivateKey.replace(/\\n/g, "\n");

  return {
    clientId,
    clientSecret,
    serviceAccount,
    privateKey,
    botId,
    channelId,
  };
}

/**
 * 서비스 계정용 JWT 생성 (RS256)
 */
export function createNaverWorksJwt(
  clientId: string,
  serviceAccount: string,
  privateKey: string
): string {
  const now: number = Math.floor(Date.now() / 1000);

  const payload: jwt.JwtPayload = {
    iss: clientId,
    sub: serviceAccount,
    iat: now,
    exp: now + 60 * 60, // 1시간
  };

  const token: string = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
  });

  return token;
}

/**
 * JWT로 Access Token 발급
 */
export async function getNaverWorksAccessToken(
  jwtToken: string,
  clientId: string,
  clientSecret: string
): Promise<string> {
  const authUrl: string = "https://auth.worksmobile.com/oauth2/v2.0/token";

  const body: string = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    client_id: clientId,
    client_secret: clientSecret,
    assertion: jwtToken,
    scope: "bot",
  }).toString();

  const response: Response = await fetch(authUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    const text: string = await response.text();
    console.error("[NaverWorks] 토큰 요청 실패:", response.status, text);
    throw new Error("NAVER WORKS access token 요청 실패");
  }

  const json: unknown = await response.json();
  const accessToken: string | undefined = (json as { access_token?: string })
    .access_token;

  if (!accessToken) {
    throw new Error(
      "NAVER WORKS access token 응답에 access_token 이 없습니다."
    );
  }

  return accessToken;
}

/**
 * Bot → 채널로 텍스트 메시지 전송
 */
export async function sendNaverWorksMessage(
  text: string,
  config?: NaverWorksConfig
): Promise<void> {
  const resolvedConfig: NaverWorksConfig =
    config ?? getNaverWorksConfigFromEnv();

  const jwtToken: string = createNaverWorksJwt(
    resolvedConfig.clientId,
    resolvedConfig.serviceAccount,
    resolvedConfig.privateKey
  );

  const accessToken: string = await getNaverWorksAccessToken(
    jwtToken,
    resolvedConfig.clientId,
    resolvedConfig.clientSecret
  );

  const url: string = `https://www.worksapis.com/v1.0/bots/${resolvedConfig.botId}/channels/${resolvedConfig.channelId}/messages`;

  const body: string = JSON.stringify({
    content: {
      type: "text",
      text,
    },
  });

  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    const textRes: string = await response.text();
    console.error("[NaverWorks] 메시지 전송 실패:", response.status, textRes);
    throw new Error("NAVER WORKS 메시지 전송 실패");
  }
}
