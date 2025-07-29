// 빈 값 처리를 위한 상수
export const EMPTY_VALUE_TEXT = "없음";

// 배열 값을 문자열로 변환하는 함수
export const formatArrayValue = (value: string[]): string => {
  return value.length > 0 ? value.join(", ") : EMPTY_VALUE_TEXT;
};

// 값 포맷팅 함수
export const formatValue = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return formatArrayValue(value);
  }
  return value || EMPTY_VALUE_TEXT;
};
