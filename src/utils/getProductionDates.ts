import { format, addWeeks, addDays, isAfter, subDays } from "date-fns";

// 결제일 기준 생산일 계산
const calculateProductionDateFromPayment = (paymentDate: Date): Date => {
  const dayOfWeek = paymentDate.getDay();
  const newDate = new Date(paymentDate);

  // 주문 마감 목요일 기준 전 후 비교
  const thisFriday = addDays(newDate, (5 - dayOfWeek + 7) % 7);

  if (dayOfWeek === 5 || isAfter(paymentDate, thisFriday)) {
    return addDays(thisFriday, 7); // 다음 주 금요일
  }

  return thisFriday;
};

// 배송일 기준 생산일 계산 (배송일 전 주 금요일)
const calculateProductionDateFromDelivery = (deliveryDate: Date): Date => {
  const newDate = new Date(deliveryDate);

  newDate.setDate(deliveryDate.getDate() - (deliveryDate.getDay() + 2) % 6);
  return newDate;
};

// 배송일 계산 생산일로부터 3일 후 화요일
const calculateDeliveryDate = (productionDate: Date): Date => {
  const newDate = new Date(productionDate);
  return addDays(newDate, 4); // 화요일
};

export const getProductionDates = (
  dateString: string | null,
  isPaymentDate = false, // 결제일 기준 여부, 기본값은 false (배송일 기준)
  dateFormatType: 'MM.dd' | 'yyyy.MM.dd' = 'MM.dd',
  planWeeklyPaymentCycle = 0, // 주 단위 이동 주기
) => {
  const formatDate = (date: Date) => format(date, dateFormatType);

  let productionDate: Date;
  let deliveryDate: Date;
  let receivingDate: Date;
  let paymentDate: string | null = null;

  if (dateString) {
    const baseDate = new Date(dateString);

    if (isPaymentDate) {
      // 결제일 기준 생산일 계산
      paymentDate = formatDate(baseDate);
      productionDate = calculateProductionDateFromPayment(baseDate);
    } else {
      // 배송일 기준 생산일 계산
      productionDate = calculateProductionDateFromDelivery(baseDate);
    }

    // 배송일, 수령일 계산 (수령일은 배송일로부터 1일 후)
    deliveryDate = calculateDeliveryDate(productionDate); // 화요일
    receivingDate = addDays(deliveryDate, 1); // 수요일
  } else {

    // 현재 날짜 기준
    const today = new Date();
    productionDate = calculateProductionDateFromDelivery(today);
    deliveryDate = calculateDeliveryDate(productionDate); // 화요일
    receivingDate = addDays(deliveryDate, 1); // 수요일
  }

  // 주 단위 이동 적용
  if (planWeeklyPaymentCycle > 0) {
    productionDate = addWeeks(productionDate, planWeeklyPaymentCycle);
    deliveryDate = addWeeks(deliveryDate, planWeeklyPaymentCycle);
    receivingDate = addWeeks(receivingDate, planWeeklyPaymentCycle);
    if (paymentDate) {
      const basePaymentDate = new Date(dateString!);
      paymentDate = formatDate(addWeeks(basePaymentDate, planWeeklyPaymentCycle));
    }
  }

  return {
    paymentDate,
    productionDate: formatDate(productionDate),  // 생산일 (금요일)
    deliveryDate: formatDate(deliveryDate),  // 배송일 (화요일)
    receivingDate: formatDate(receivingDate),  // 수령일 (수요일)
  };
};
