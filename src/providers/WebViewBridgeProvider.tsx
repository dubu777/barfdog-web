"use client";

import { useNativeAuth } from "@/hooks/auth/useNativeAuth";

export default function WebViewBridgeProvide({
  children,
}: {
  children: React.ReactNode;
}) {
  useNativeAuth();

  return <>{children}</>;
}
