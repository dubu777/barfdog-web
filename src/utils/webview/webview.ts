export const isReactNativeWebView = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!window.ReactNativeWebView;
};

/**
 * Native에 메시지 전송
 */
export const sendMessageToNative = (message: {
  type: string;
  payload?: any;
}): void => {
  if (isReactNativeWebView()) {
    window.ReactNativeWebView!.postMessage(JSON.stringify(message));
    console.log("📤 Native에 메시지 전송:", message.type);
  } else {
    console.warn("⚠️ Native WebView 환경이 아닙니다.");
  }
};

/**
 * Native에서 토큰 요청
 */
export const requestTokensFromNative = (): void => {
  sendMessageToNative({ type: "REQUEST_TOKENS" });
};

/**
 * Native에 로그아웃 알림
 */
export const notifyLogoutToNative = (): void => {
  sendMessageToNative({ type: "LOGOUT" });
};

/**
 * Native에 토큰 업데이트 알림
 */
export const notifyTokenUpdateToNative = (tokens: {
  accessToken: string;
  refreshToken?: string;
}): void => {
  sendMessageToNative({
    type: "TOKEN_UPDATED",
    payload: tokens,
  });
};
