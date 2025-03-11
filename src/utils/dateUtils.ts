export const daysSince = (startDate: string): number => {
  const today = new Date();
  const start = new Date(startDate);
  const differenceInTime = today.getTime() - start.getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
}

interface DateComponents {
  year: number;
  month: string;
  day: string;
  hours: string;
  min: string;
}

type getDateType = 'fullDateTime' | 'fullDateTimeKR' | 'onlyDate' | 'onlyDateKR' | 'onlyTime' | 'onlyTimeKR';

export const formatDate = (dateStr: string, type: getDateType): string => {
  if (!dateStr) return '-';

  // 서버에서 받은 YYYYMMDD 형태일 경우 → Date 객체로 변환
  if (/^\d{8}$/.test(dateStr)) {
    dateStr = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
  }

  const date = new Date(dateStr);

  const dateComponents: DateComponents = {
    year: Number(date.getFullYear()),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    day: String(date.getDate()).padStart(2, '0'),
    hours: String(date.getHours()).padStart(2, '0'),
    min: String(date.getMinutes()).padStart(2, '0'),
  };
  console.log('dateComponents.year', dateComponents.year)
  const dateFormats: Record<getDateType, () => string> = {
    fullDateTime: () => `${dateComponents.year}.${dateComponents.month}.${dateComponents.day} ${dateComponents.hours}:${dateComponents.min}`,
    fullDateTimeKR: () => `${dateComponents.year}년 ${dateComponents.month}월 ${dateComponents.day}일 ${dateComponents.hours}시 ${dateComponents.min}분`,
    onlyDate: () => `${dateComponents.year}.${dateComponents.month}.${dateComponents.day}`,
    onlyDateKR: () => `${dateComponents.year}년 ${dateComponents.month}월 ${dateComponents.day}일`,
    onlyTime: () => `${dateComponents.hours}:${dateComponents.min}`,
    onlyTimeKR: () => `${dateComponents.hours}시 ${dateComponents.min}분`,
  };

  return dateFormats[type]();
};
