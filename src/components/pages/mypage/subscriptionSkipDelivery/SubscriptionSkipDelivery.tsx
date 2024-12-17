'use client';
import { useState } from "react";
import * as styles from "./SubscriptionSkipDelivery.css";
import Text from "@/components/common/text/Text";
import CalendarComponent from "@/components/common/calendar/Calendar";
import SkipDeliveryCheckbox from "@/components/pages/mypage/subscriptionSkipDelivery/skipDeliveryCheckbox/SkipDeliveryCheckbox";
import { getProductionDates } from "@/utils/getProductionDates";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { SubscriptionSkipType } from "@/types/subscription";

export interface SkipListProps {
  value: SubscriptionSkipType;
  name: string;
  productionDate: string;
  receivingDate: string;
}

const SubscriptionSkipDelivery = ({ subscribeId }: { subscribeId: string }) => {
  const { data: subscriptionDetail } = useGetSubscriptionDetail(subscribeId, { staleTime: 0 });

  console.log(subscriptionDetail);
  const [selectedSkip, setSelectedSkip] = useState<SkipListProps | null>(null);
  const defaultProductionDates = getProductionDates(subscriptionDetail.nextDeliveryDate);

  const calendarValue = 
    !selectedSkip
      ? [new Date(defaultProductionDates.productionDate ?? ''), new Date(defaultProductionDates.receivingDate ?? '')]
      : [new Date(selectedSkip?.productionDate), new Date(selectedSkip?.receivingDate)];
  const activeCalendarStartDate = 
    !selectedSkip
      ? new Date(defaultProductionDates.productionDate ?? '') 
      : new Date(selectedSkip?.productionDate);

  return (
    <section className={styles.skipDeliveryContainer}>
      <div className={styles.dogName}>
        <Text type='title' size='lg' weight='normal'>
          {subscriptionDetail.dogName}(이)의 현재 생산·배송 일정
        </Text>
      </div>
      <Text type='description' size='md' color='black' weight='normal' className={styles.defaultProduction}>
        생산 예정일: {defaultProductionDates?.productionDate} <br/>
        수령 예정일: {defaultProductionDates?.receivingDate}
      </Text>
      <SkipDeliveryCheckbox
        subscriptionDetail={subscriptionDetail}
        selectedSkip={selectedSkip}
        setSelectedSkip={setSelectedSkip}
      />
      <CalendarComponent
        activeStartDate={activeCalendarStartDate}
        value={calendarValue}
      />
    </section>
  );
};

export default SubscriptionSkipDelivery;