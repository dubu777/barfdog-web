"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { setSnsCallbackUrl } from "@/utils/auth/snsCallbackUrl";

import { SnsProvider } from "@/types";
import { buildOAuthCodeUrl } from "@/utils/auth/buildOAuthUrl";
import { OAUTH_CLIENT_CONFIG } from "@/config/oauthClient";

type UseSocialLoginOptions = {
  callbackUrl?: string;
  defer?: boolean;
  onDeferredLoginClick?: (start: () => void) => void;
};

export function useSocialLogin(
  provider: SnsProvider,
  options?: UseSocialLoginOptions
) {
  const router = useRouter();
  const config = OAUTH_CLIENT_CONFIG[provider];

  const start = useCallback(() => {
    if (options?.callbackUrl) setSnsCallbackUrl(options.callbackUrl);
    const url = buildOAuthCodeUrl(config);
    router.push(url);
  }, [config, options?.callbackUrl, router]);

  const handleClick = useCallback(() => {
    if (options?.defer && options?.onDeferredLoginClick) {
      options.onDeferredLoginClick(start);
    } else {
      start();
    }
  }, [start, options?.defer, options?.onDeferredLoginClick]);

  return { start, handleClick };
}
