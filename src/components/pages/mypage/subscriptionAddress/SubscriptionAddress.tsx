'use client';
import * as styles from './SubscriptionAddress.css';
import SubscriptionAddressForm from "@/components/pages/mypage/subscriptionAddress/subscriptionAddressForm/SubscriptionAddressForm";
import DefaultAddress from "@/components/pages/mypage/subscriptionAddress/defaultAddress/DefaultAddress";
import { DefaultObjectType } from "@/types/common";
import { useGetSubscriptionAddress } from "@/api/subscription/queries/useGetSubscriptionAddress";

const changeTypeList: DefaultObjectType[] = [
  {
    name: '1회 변경',
    value: 'onetime',
    id: 'onetime',
  },
  {
    name: '영구 변경',
    value: 'permanent',
    id: 'permanent',
  },
]

interface SubscriptionAddressProps {
  subscribeId: number;
  changeType: string | undefined;
}

const SubscriptionAddress = ({ subscribeId, changeType }: SubscriptionAddressProps) => {
  const { data: addressData } = useGetSubscriptionAddress(subscribeId);

  return (
    <section className={styles.addressContainer}>
      {!changeType
        ? <DefaultAddress 
            addressData={addressData} 
            changeTypeList={changeTypeList}
          />
        : <SubscriptionAddressForm
            subscribeId={subscribeId}
            nextDeliveryDate={addressData.nextDeliveryDate}
            changeTypeList={changeTypeList}
          />
      }
    </section>
  );
};

export default SubscriptionAddress;