'use client';
import * as styles from './DeliveryAddress.css';
import AddressForm from "@/components/pages/mypage/deliveryAddress/addressForm/AddressForm";
import DefaultAddress from "@/components/pages/mypage/deliveryAddress/defaultAddress/DefaultAddress";
import { DefaultObjectType } from "@/types/common";
import { useGetDeliveryAddress } from "@/api/subscription/queries/useGetDeliveryAddress";

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

interface DeliveryAddressProps {
  subscribeId: string;
  changeType: string | undefined;
}

const DeliveryAddress = ({ subscribeId, changeType }: DeliveryAddressProps) => {
  const { data: addressData } = useGetDeliveryAddress(subscribeId);
  return (
    <section className={styles.addressContainer}>
      {!changeType
        ? <DefaultAddress addressData={addressData} changeTypeList={changeTypeList} />
        : <AddressForm nextDeliveryDate={addressData.nextDeliveryDate} changeTypeList={changeTypeList} />
      }
    </section>
  );
};

export default DeliveryAddress;