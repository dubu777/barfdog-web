import {useLayoutEffect, useState} from "react";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export function useBreakpoints() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const breakpoint = {
    isMobile: useMediaQuery('(max-width: 600px)'),
    active: 'SSR',
  };

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);
  if (isClient && breakpoint.isMobile) breakpoint.active = 'isMobile';

  return breakpoint;
}