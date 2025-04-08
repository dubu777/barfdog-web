import { format } from "date-fns";

const TARGET_DAY_INDEX = 2; // 정기구독 발송 요일: 화요일
const DEADLINE_DAY_INDEX = 4; // 주문 마감 요일: 목요일

export const calculateNextDeliveryDate = () => {
  const today = new Date();
  const currentDayIndex = today.getDay();
  
  // 주문 마감 전(목요일 포함)이면 다음 주 화요일, 이후면 다다음 주 화요일로 배송
  const daysToAdd = currentDayIndex <= DEADLINE_DAY_INDEX
    ? TARGET_DAY_INDEX + 7 - currentDayIndex
    : TARGET_DAY_INDEX + 14 - currentDayIndex;
  
    const nextDeliveryDate = new Date(today);
    nextDeliveryDate.setDate(today.getDate() + daysToAdd);
  
    return format(nextDeliveryDate, 'yyyy-MM-dd');
};
