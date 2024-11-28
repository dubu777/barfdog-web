// 생산 및 수령 예정일 계산
export const getProductionDates = (dateString: string | null, planWeeklyPaymentCycle = 0) => {
  const formatDate = (date: Date) =>
    `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}.`;

  const addWeeks = (date: Date, weeks: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + weeks * 7);  // weeks를 일수로 변환하여 더함
    return newDate;
  };

  const calculateProductionDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    const newDate = new Date(date);

    // 월 ~ 목 : 그 주의 토요일
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      newDate.setDate(date.getDate() + (6 - dayOfWeek));
    } else { // 금 ~ 일 : 다음 주의 토요일
      newDate.setDate(date.getDate() + (13 - dayOfWeek));
    }

    return newDate;
  };

  const calculateReceivingDate = (prodDate: Date) => {
    const newDate = new Date(prodDate);
    newDate.setDate(prodDate.getDate() + 5);  // 생산 예정일의 다음 수요일
    return newDate;
  };

  let productionDate, shipmentDate, receivingDate;

  if (dateString) {
    // 배송일이 제공된 경우
    productionDate = new Date(dateString);
    // 화요일인 경우, 전 주 토요일로 설정
    if (productionDate.getDay() === 2) {
      productionDate.setDate(productionDate.getDate() - 4); // 화요일에서 4일 빼면 전 주 토요일
    }

    receivingDate = new Date(dateString);
    receivingDate.setDate(receivingDate.getDate() + 1); // 수령일은 배송일의 다음날
  } else {
    console.log('// 배송일이 없을 경우 (구독 안함)')
    // 배송일이 없을 경우 (구독 안함)
    
    const today = new Date();
    // 생산 예정일 계산
    productionDate = calculateProductionDate(today);

    // 출고 예정일은 생산 예정일의 다음 화요일
    shipmentDate = new Date(productionDate);
    shipmentDate.setDate(shipmentDate.getDate() + 4); // 화요일

    // 수령 예정일은 생산 예정일의 다음 수요일
    receivingDate = calculateReceivingDate(productionDate);
  }

  // planWeeklyPaymentCycle이 있는 경우, 해당 주기만큼 미룬 날짜 계산
  if (planWeeklyPaymentCycle > 0) {
    productionDate = addWeeks(productionDate, planWeeklyPaymentCycle);
    receivingDate = addWeeks(receivingDate, planWeeklyPaymentCycle);
  }

  return {
    productionDate: dateString ? formatDate(productionDate) : null,
    shipmentDate: dateString ? shipmentDate ? formatDate(shipmentDate) : undefined : null,
    receivingDate: dateString ? formatDate(receivingDate) : null,
  };
};