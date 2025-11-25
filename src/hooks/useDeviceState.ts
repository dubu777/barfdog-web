import { useState, useEffect, useCallback } from "react";

type DeviceOS = "iOS" | "Android" | "Other";

interface DeviceState {
  isMobileWidth: boolean;
  isMobileDevice: boolean;
  deviceWidth: number;
  deviceOS: DeviceOS;
  isWebView: boolean;
}

/**
 * debounce 유틸
 */
function debounce(func: () => void, delay: number): () => void {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}

/**
 * 모바일 OS 감지
 */
function getMobileOS(): DeviceOS {
  // navigator.userAgentData가 없는 경우 전통적 userAgent나 window.opera 확인
  const userAgent = navigator.userAgent || window.opera || "";
  const hasMSStream = typeof window.MSStream !== "undefined";

  if (/android/i.test(userAgent)) return "Android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !hasMSStream) return "iOS";
  return "Other";
}

/**
 * WebView 환경 감지
 */
function checkIsWebView(): boolean {
  const userAgent = navigator.userAgent || "";

  // React Native WebView 감지
  if (/ReactNativeWebView/i.test(userAgent)) return true;

  // iOS WebView 감지 (WKWebView, UIWebView)
  if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent)) return true;

  // Android WebView 감지
  if (/wv|WebView/i.test(userAgent) && /Android/i.test(userAgent)) return true;

  return false;
}

export default function useDeviceState(): DeviceState {
  const [deviceState, setDeviceState] = useState<DeviceState>({
    isMobileWidth: false,
    isMobileDevice: false,
    deviceWidth: 0,
    deviceOS: "Other",
    isWebView: false,
  });

  /** 모바일 디바이스 여부 확인 */
  const checkIsMobileDevice = useCallback(() => {
    if (navigator.userAgentData) {
      return navigator.userAgentData.mobile || navigator.maxTouchPoints > 0;
    }
    return (
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  /** 디바이스 상태 업데이트 */
  const updateDeviceState = useCallback(() => {
    const deviceWidth = window.innerWidth;
    setDeviceState({
      isMobileWidth: deviceWidth <= 600,
      isMobileDevice: checkIsMobileDevice(),
      deviceWidth,
      deviceOS: getMobileOS(),
      isWebView: checkIsWebView(),
    });
  }, [checkIsMobileDevice]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 초기 상태 설정
    updateDeviceState();

    // 리사이즈 이벤트 핸들러에 debounce 적용
    const debouncedUpdate = debounce(updateDeviceState, 100);
    window.addEventListener("resize", debouncedUpdate);

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, [updateDeviceState]);

  return deviceState;
}
