type DeliveryDates = {
  productionDate: string;
  shipmentDate: string;
  receivingDate: string;
};

const formatDate = (date: Date): string =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

export const calculateDeliveryDates = (nextDeliveryDate?: string): DeliveryDates => {
  let productionDate: Date;
  let shipmentDate: Date | null = null;
  let receivingDate: Date;

  if (nextDeliveryDate) {
    // 다음 배송일이 있을 경우
    const deliveryDate = new Date(nextDeliveryDate);

    // 생산 예정일: 다음 배송일의 전 주 토요일
    productionDate = new Date(deliveryDate);
    productionDate.setDate(deliveryDate.getDate() - (deliveryDate.getDay() === 2 ? 4 : 0));


    // 수령 예정일: 다음 배송일의 다음 날
    receivingDate = new Date(deliveryDate);
    receivingDate.setDate(deliveryDate.getDate() + 1);
  } else {
    // 다음 배송일이 없을 경우
    const today = new Date();
    const dayOfWeek = today.getDay();

    // 생산 예정일: 현재 주 또는 다음 주의 토요일
    // (1) 월 ~ 목 : 그 주의 토요일
    productionDate = new Date(today);
    productionDate.setDate(today.getDate() + (dayOfWeek <= 4 ? 6 - dayOfWeek : 13 - dayOfWeek));
  }

  // 출고 예정일: 생산 예정일의 다음 화요일
  if (!shipmentDate) {
    shipmentDate = new Date(productionDate);
    shipmentDate.setDate(productionDate.getDate() + 4);
  }

  // 수령 예정일: 생산 예정일의 다음 수요일
  receivingDate = new Date(productionDate);
  receivingDate.setDate(productionDate.getDate() + 5);

  return {
    productionDate: formatDate(productionDate),
    shipmentDate: formatDate(shipmentDate),
    receivingDate: formatDate(receivingDate),
  };
};
