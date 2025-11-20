/**
 * 웹뷰 환경 감지
 */
export function isWebView(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent;
  return userAgent.includes('BarfdogApp');
}

/**
 * RN 웹뷰로 로그 전송
 */
export function sendLogToNative(message: string, data?: any) {
  if (!isWebView()) {
    // 일반 브라우저에서는 console.log만 사용
    console.log(message, data);
    return;
  }

  try {
    // RN으로 메시지 전송
    if (window.ReactNativeWebView) {
      const payload = {
        type: 'DEBUG_LOG',
        payload: {
          message,
          data,
          timestamp: new Date().toISOString(),
        },
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(payload));
    }

    // 브라우저 콘솔에도 출력
    console.log(message, data);
  } catch (error) {
    console.error('Failed to send log to native:', error);
  }
}

// TypeScript 타입 선언
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(message: string): void;
    };
  }
}