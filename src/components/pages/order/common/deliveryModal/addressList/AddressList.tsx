import Button from "@/components/common/button/Button";
import * as styles from "./AddressList.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { DeliveryDto } from "@/types";
import AddIcon from "/public/images/icons/add.svg";
import { useMemo, useState } from "react";
import AddressCard from "./addressCard/AddressCard";
import { AddressResponse } from "@/types/delivery";

interface AddressListProps {
  addressData: AddressResponse[];
  goToAddAddress: () => void;
  goToEditAddress: (address: AddressResponse) => void;
  onSelectAddress: (deliveryDto: DeliveryDto) => void;
  onDeleteAddress: (addressId: number) => void;
}

export default function AddressList({
  addressData,
  goToAddAddress,
  goToEditAddress,
  onSelectAddress,
  onDeleteAddress,
}: AddressListProps) {
  const sortedAddresses = useMemo(() => {
    return [...addressData].sort((a, b) =>
      a.default === b.default ? 0 : a.default ? -1 : 1
    );
  }, [addressData]);

  return (
    <div className={styles.deliveryModalWrapper}>
      <Button
        type="assistive"
        variant="outline"
        size="lg"
        fullWidth
        iconSrc={AddIcon}
        onClick={goToAddAddress}
      >
        배송지 추가하기
      </Button>
      <div className={styles.addressCardWrapper}>
        {sortedAddresses.map((address) => (
          <AddressCard
            address={address}
            onSelectAddress={onSelectAddress}
            goToEditAddress={goToEditAddress}
            onDeleteAddress={onDeleteAddress}
          />
        ))}
      </div>
    </div>
  );
}
