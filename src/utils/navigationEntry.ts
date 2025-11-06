import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const STORAGE_KEY = 'navigationEntryPoint';

/**
 * 현재 페이지에서 특정 페이지로 이동할 때 진입 경로를 저장
 * @param targetPath - 이동할 대상 경로
 * @param currentPath - 현재 경로 (기본값: window.location.pathname)
 * @param condition - 진입 경로를 저장할 조건 함수 (기본값: 항상 저장)
 */
export const saveEntryPoint = (
  targetPath: string, 
  currentPath?: string, 
  condition?: (currentPath: string, targetPath: string) => boolean
): void => {
  const current = currentPath || window.location.pathname;
  
  // 조건이 있고 조건을 만족하지 않으면 저장하지 않음
  if (condition && !condition(current, targetPath)) {
    return;
  }

  sessionStorage.setItem(STORAGE_KEY, current);
  console.log(`진입 경로 저장: ${current} -> ${targetPath}`);
};

/**
 * 저장된 진입 경로를 가져옴
 * @returns 저장된 진입 경로 또는 null
 */
export const getEntryPoint = (): string | null => {
  return sessionStorage.getItem(STORAGE_KEY);
};

/**
 * 저장된 진입 경로를 제거
 */
export const clearEntryPoint = (): void => {
  sessionStorage.removeItem(STORAGE_KEY);
};

/**
 * 저장된 진입 경로로 이동
 * @param router - Next.js router 객체
 * @param fallbackPath - 진입 경로가 없을 때 이동할 경로 (기본값: '/')
 */
export const navigateToEntryPoint = (router: AppRouterInstance, fallbackPath: string = '/'): void => {
  const entryPoint = getEntryPoint();
  
  if (entryPoint) {
    clearEntryPoint();
    console.log(`저장된 진입 경로로 이동: ${entryPoint}`);
    router.push(entryPoint);
  } else {
    console.log(`진입 경로가 없음 - fallback으로 이동: ${fallbackPath}`);
    router.push(fallbackPath);
  }
};