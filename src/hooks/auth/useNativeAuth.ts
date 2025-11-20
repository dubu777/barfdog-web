import { AUTH_CONFIG } from "@/constants/auth";
import { getCookie, setCookie } from "@/utils/auth/cookie";
import { sendLogToNative } from "@/utils/debug/webviewLogger";
import { useEffect } from "react";

interface NativeMessage {
  type: string;
  payload?: any;
}

export function useNativeAuth() {
  useEffect(() => {
    const handleNativeMessage = (event: MessageEvent) => {
      try {
        const data: NativeMessage = JSON.parse(event.data);

        if (data.type === "INJECT_TOKENS" && data.payload) {
          const { accessToken } = data.payload;

          sendLogToNative('[useNativeAuth] 토큰 수신', {
            tokenLength: accessToken?.length,
            tokenPrefix: accessToken?.substring(0, 10)
          });

          // 쿠키에 토큰 저장
          setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, accessToken);

          // 저장 확인
          const savedToken = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
          sendLogToNative('[useNativeAuth] 토큰 저장 확인', {
            saved: !!savedToken,
            savedLength: savedToken?.length
          });

          console.log("✅ Native에서 토큰 수신 완료");

          // 페이지 새로고침 제거 - React Query가 자동으로 재요청함
          // window.location.reload();
        }
      } catch (error) {
        sendLogToNative('[useNativeAuth] ❌ 메시지 파싱 실패', {
          error: error instanceof Error ? error.message : String(error)
        });
        console.error("Native 메시지 파싱 실패:", error);
      }
    };

    // React Native WebView 메시지 리스너
    window.addEventListener("message", handleNativeMessage);
    document.addEventListener("message", handleNativeMessage as any); // Android

    // 컴포넌트 마운트 시 Native에 토큰 요청 (선택사항)
    if (window.ReactNativeWebView) {
      const storedToken = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
      sendLogToNative('[useNativeAuth] 초기 토큰 확인', {
        hasToken: !!storedToken,
        tokenLength: storedToken?.length
      });

      if (!storedToken) {
        sendLogToNative('[useNativeAuth] Native에 토큰 요청');
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "REQUEST_TOKENS",
          })
        );
      }
    }

    return () => {
      window.removeEventListener("message", handleNativeMessage);
      document.removeEventListener("message", handleNativeMessage as any);
    };
  }, []);
}
