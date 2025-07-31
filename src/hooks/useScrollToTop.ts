"use client";

import { useEffect } from "react";

export function useScrollToTop(dep: unknown) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dep]);
}
