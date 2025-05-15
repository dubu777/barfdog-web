
/**
 * 주어진 엘리먼트로 스무스 스크롤.
 * @param element HTMLElement | null — 스크롤할 대상
 * @param offset number — 고정 헤더 높이 등 오프셋
 */
export function scrollToElement(element: HTMLElement | null) {
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
