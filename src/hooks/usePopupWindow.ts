import { useCallback } from "react";

interface PopupOptions {
  width?: number;
  height?: number;
  resizable?: boolean;
  scrollbars?: boolean;
  name?: string;
}
/**
 * 팝업 창 열기용 훅
 *
 * @example
 * const openPopup = usePopupWindow();
 * openPopup('/popup/order-cancel', { width: 600, height: 800 });
 */

export default function usePopupWindow() {
  const openPopup = useCallback(
    (url: string, options: PopupOptions = {}) => {
      if (typeof window === 'undefined') return;

      const {
        width = 540,
        height = 480,
        resizable = false,
        scrollbars = false,
        name = 'popupWindow',
      } = options;

      // 중앙 정렬 계산
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const features = [
        `width=${width}`,
        `height=${height}`,
        `left=${left}`,
        `top=${top}`,
        `resizable=${resizable ? 'yes' : 'no'}`,
        `scrollbars=${scrollbars ? 'yes' : 'no'}`,
      ].join(',');

      const newWindow = window.open(url, name, features);

      if (newWindow) newWindow.focus();
      return newWindow;
    },
    []
  );

  return openPopup;
}