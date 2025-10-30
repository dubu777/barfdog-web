import Button from "@/components/ui/button/Button";
import * as styles from "./AddressList.css";
import { ClientDeliveryDto } from "@/types";
import AddIcon from "/public/images/icons/add.svg";
import { useMemo } from "react";
import AddressCard from "./addressCard/AddressCard";
import { AddressResponse } from "@/types/delivery";

interface AddressListProps {
  addressData: AddressResponse[];
  goToAddAddress: () => void;
  goToEditAddress: (address: AddressResponse) => void;
  onSelectAddress: (deliveryDto: ClientDeliveryDto) => void;
  showSelectButton?: boolean;
}

export default function AddressList({
  addressData,
  goToAddAddress,
  goToEditAddress,
  onSelectAddress,
  showSelectButton = true,
}: AddressListProps) {
  const sortedAddresses = useMemo(() => {
    return [...addressData].sort((a, b) =>
      a.default === b.default ? 0 : a.default ? -1 : 1
    );
  }, [addressData]);

  return (
    <div className={styles.deliveryModalWrapper}>
      <Button
        intent="assistive"
        variant="outline"
        size="lg"
        fullWidth
        icon={AddIcon}
        onClick={goToAddAddress}
      >
        배송지 추가하기
      </Button>
      <div className={styles.addressCardWrapper}>
        {sortedAddresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onSelectAddress={onSelectAddress}
            goToEditAddress={goToEditAddress}
            showSelectButton={showSelectButton}
          />
        ))}
      </div>
    </div>
  );
}
