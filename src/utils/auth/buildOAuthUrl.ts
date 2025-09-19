import { OAuthClientConfig } from "@/config/oauthClient";
import { generateState } from "./state";

export function buildOAuthCodeUrl(config: OAuthClientConfig) {
  const { clientId, redirectUri, auth } = config;
  const state = generateState();
  const params = new URLSearchParams({
    response_type: auth.responseType,
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
  });
  return `${auth.codeUrl}?${params.toString()}`;
}
