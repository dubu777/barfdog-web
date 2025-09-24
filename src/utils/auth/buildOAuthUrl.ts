import { OAuthClientConfig } from "@/config/oauthClient";

export function buildOAuthCodeUrl(config: OAuthClientConfig, state: string) {
  const { clientId, redirectUri, auth } = config;
  const params = new URLSearchParams({
    response_type: auth.responseType,
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
  });
  return `${auth.codeUrl}?${params.toString()}`;
}
