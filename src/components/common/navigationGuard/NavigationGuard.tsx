"use client";

import { useNavigationGuard } from "@/hooks/useNavigationGuard";
import { ReactNode } from "react";

interface NavigationGuardProps {
  children: ReactNode;
  /** 경고창을 띄울지 여부 */
  shouldBlock?: boolean;
}

export default function NavigationGuard({
  children,
  shouldBlock = true,
}: NavigationGuardProps) {
  useNavigationGuard({shouldBlock});
  return <>{children}</>;
}
