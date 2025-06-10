'use client';

import { useEffect } from 'react';

export function useScrollToTop(dep: any) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dep]);
}