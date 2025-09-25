"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { setSnsCallbackUrl } from "@/utils/auth/snsCallbackUrl";

import { SnsProvider } from "@/types";
import { buildOAuthCodeUrl } from "@/utils/auth/buildOAuthUrl";
import { OAUTH_CLIENT_CONFIG } from "@/config/oauthClient";
import { generateState } from "@/utils/auth/state";

type UseSocialLoginOptions = {
  callbackUrl?: string;
  defer?: boolean;
  onDeferredLoginClick?: (start: () => void) => void;
  nextPath?: string;
};

export function useSocialLogin(
  provider: SnsProvider,
  options?: UseSocialLoginOptions
) {
  const router = useRouter();

  const start = useCallback(() => {
    if (options?.callbackUrl) setSnsCallbackUrl(options.callbackUrl);
    const config = OAUTH_CLIENT_CONFIG[provider];
    const state = generateState();
    sessionStorage.setItem(`oauth.state.${provider}`, state);

    if (options?.nextPath) {
      sessionStorage.setItem("oauth.next", options.nextPath);
    }

    const url = buildOAuthCodeUrl(config, state);
    router.push(url);
  }, [provider, options?.callbackUrl, router]);

  const handleClick = useCallback(() => {
    if (options?.defer && options?.onDeferredLoginClick) {
      options.onDeferredLoginClick(start);
    } else {
      start();
    }
  }, [start, options?.defer, options?.onDeferredLoginClick]);

  return { start, handleClick };
}
