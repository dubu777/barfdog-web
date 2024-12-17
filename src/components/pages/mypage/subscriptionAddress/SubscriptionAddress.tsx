'use client';
import * as styles from './SubscriptionAddress.css';
import AddressForm from "@/components/pages/mypage/subscriptionAddress/addressForm/AddressForm";
import DefaultAddress from "@/components/pages/mypage/subscriptionAddress/defaultAddress/DefaultAddress";
import { DefaultObjectType } from "@/types/common";
import { useGetSubscriptionAddress } from "@/api/subscription/queries/useGetSubscriptionAddress";

const changeTypeList: DefaultObjectType[] = [
  {
    name: '1회 변경',
    value: 'once',
    id: 'once',
  },
  {
    name: '영구 변경',
    value: 'permanent',
    id: 'permanent',
  },
]

interface SubscriptionAddressProps {
  subscribeId: string;
  changeType: string | undefined;
}

const SubscriptionAddress = ({ subscribeId, changeType }: SubscriptionAddressProps) => {
  const { data: addressData } = useGetSubscriptionAddress(subscribeId);
  return (
    <section className={styles.addressContainer}>
      {!changeType
        ? <DefaultAddress addressData={addressData} changeTypeList={changeTypeList} />
        : <AddressForm nextDeliveryDate={addressData.nextDeliveryDate} changeTypeList={changeTypeList} />
      }
    </section>
  );
};

export default SubscriptionAddress;