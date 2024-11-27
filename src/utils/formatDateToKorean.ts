export const formatDateToKorean = (date?: string): string => {
  if (!date) {
    return ''; // date가 없을 경우 빈 문자열 반환 (필요에 따라 다른 기본값 설정 가능)
  }

  const [year, month, day] = date.split('.');
  
  if (!year || !month || !day) {
    return ''; // 올바르지 않은 날짜 형식일 경우 빈 문자열 반환
  }
  
  return `${year}년 ${month}월 ${day}일`;
};