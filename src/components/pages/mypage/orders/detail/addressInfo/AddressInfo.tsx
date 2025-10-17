import { commonWrapper } from "@/styles/common.css";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import CardWrapper from "../../card/common/CardWrapper";
import { formatPhoneNumber } from "@/utils";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";

interface AddressInfoProps {
  userName: string;
  phoneNumber: string;
  detailAddress: string;
  street: string;
}

export default function AddressInfo({
  userName,
  phoneNumber,
  detailAddress,
  street,
}: AddressInfoProps) {
  const { data: addressList } = useGetAddressList();
  const address = addressList?.find((address) => address.street === street && address.detailAddress === detailAddress);
  
  return (
    <CardWrapper>
      <div className={commonWrapper({ gap: 8, justify: 'start', align: 'start' })}>
      <Text type="headline2">{address?.deliveryName}</Text>
      {address?.default && (
        <Chips variant="outlined" borderRadius="lg" color="gray700">
          기본배송지
        </Chips>
      )}
    </div>
    <div className={commonWrapper({ direction: 'col', gap: 2, justify: 'start', align: 'start' })}>
      <Text type="body3" color="gray800" className={commonWrapper({ gap: 4, justify: 'start', align: 'center' })}>
        <span>{userName}</span>
        <span>•</span>
        <span>{formatPhoneNumber(phoneNumber)}</span>
      </Text>
      <Text type="body3" color="gray800">
        {address?.street ?? street} {address?.detailAddress ?? detailAddress}
      </Text>
    </div>
    </CardWrapper>
  );
}