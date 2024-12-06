'use client';
import { useState } from "react";
import * as styles from "./DelayDelivery.css";
import Text from "@/components/common/text/Text";
import CalendarComponent from "@/components/common/calendar/Calendar";
import DelayDeliveryCheckbox from "@/components/pages/mypage/delayDelivery/delayDeliveryCheckbox/DelayDeliveryCheckbox";
import { getProductionDates } from "@/utils/getProductionDates";
import { useGetSubscriptionById } from "@/api/subscription/queries/useGetSubscriptionById";
import { SubscribeSkipType } from "@/types/subscription";

export interface DelayListProps {
  value: SubscribeSkipType;
  name: string;
  productionDate: string;
  receivingDate: string;
}

const DelayDelivery = ({ subscribeId }: { subscribeId: string | number }) => {
  const { data: subscribeData } = useGetSubscriptionById(Number(subscribeId));

  const [selectedDelay, setSelectedDelay] = useState<DelayListProps | null>(null);
  const defaultProductionDates = getProductionDates(subscribeData.nextDeliveryDate);
  const calendarValue = 
    !selectedDelay
      ? [new Date(defaultProductionDates.productionDate ?? ''), new Date(defaultProductionDates.receivingDate ?? '')]
      : [new Date(selectedDelay?.productionDate), new Date(selectedDelay?.receivingDate)];
  const activeCalendarStartDate = 
    !selectedDelay 
      ? new Date(defaultProductionDates.productionDate ?? '') 
      : new Date(selectedDelay?.productionDate);

  return (
    <section className={styles.delayDeliveryContainer}>
      <div className={styles.dogName}>
        <Text type='title' size='lg' weight='normal'>
          {subscribeData.dogName}(이)의 현재 생산·배송 일정
        </Text>
      </div>
      <Text type='description' size='md' color='black' weight='normal' className={styles.defaultProduction}>
        생산 예정일: {defaultProductionDates?.productionDate} <br/>
        수령 예정일: {defaultProductionDates?.receivingDate}
      </Text>
      <DelayDeliveryCheckbox
        subscribeData={subscribeData}
        selectedDelay={selectedDelay}
        setSelectedDelay={setSelectedDelay}
      />
      <CalendarComponent
        activeStartDate={activeCalendarStartDate}
        value={calendarValue}
      />
    </section>
  );
};

export default DelayDelivery;