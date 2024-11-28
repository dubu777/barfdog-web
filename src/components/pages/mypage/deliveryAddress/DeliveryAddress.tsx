import * as styles from './DeliveryAddress.css';
import AddressForm from "@/components/pages/mypage/deliveryAddress/addressForm/AddressForm";
import DefaultAddress from "@/components/pages/mypage/deliveryAddress/defaultAddress/DefaultAddress";
import { SubscribeAddressData } from "@/types/subscription";
import { DefaultObjectType } from "@/types/common";

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

interface DeliveryAddress {
  addressData: SubscribeAddressData;
  changeType: string | undefined;
}

const DeliveryAddress = ({ addressData, changeType }: DeliveryAddress) => {
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