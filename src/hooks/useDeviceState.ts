import { useState, useEffect } from "react";

export default function useDeviceState() {
  const [deviceState, setDeviceState] = useState({
    isMobileWidth: false,
    isMobileDevice: false,
    deviceWidth: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getIsMobileDevice = () =>
      ("userAgentData" in navigator
        ? (navigator as any).userAgentData.mobile
        : /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) || false;
    const updateDeviceState = () => {
      const deviceWidth = window.innerWidth;
      const isMobileWidth = deviceWidth <= 600;
      const isMobileDevice = getIsMobileDevice();

      setDeviceState({
        isMobileWidth, // 모바일 너비
        isMobileDevice, //  모바일 기기
        deviceWidth,
      });
    };

    // 초기 상태 설정
    updateDeviceState();

    // 리사이즈 이벤트 등록
    window.addEventListener("resize", updateDeviceState);

    return () => {
      // 리스너 제거
      window.removeEventListener("resize", updateDeviceState);
    };
  }, []);

  return deviceState;
}
