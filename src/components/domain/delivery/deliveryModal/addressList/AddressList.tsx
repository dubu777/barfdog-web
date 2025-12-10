import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/ui/button/Button";
import { DeliveryAddress } from "@/types";
import AddIcon from "/public/images/icons/add.svg";
import { useMemo } from "react";
import AddressCard from "./addressCard/AddressCard";

interface AddressListProps {
  addressData: DeliveryAddress[];
  goToAddAddress: () => void;
  goToEditAddress: (address: DeliveryAddress) => void;
  onSelectAddress: (deliveryDto: DeliveryAddress) => void;
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
      a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
    );
  }, [addressData]);

  return (
    <div
      className={commonWrapper({
        direction: "col",
        padding: 20,
        paddingBottom: 40,
        gap: 20,
        backgroundColors: "gray50",
      })}
    >
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
      <div
        className={commonWrapper({
          direction: "col",
          gap: 8,
        })}
      >
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
