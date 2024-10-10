'use client';
import { useRouter } from "next/navigation";

export const useBackNavigation = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return goBack;
};