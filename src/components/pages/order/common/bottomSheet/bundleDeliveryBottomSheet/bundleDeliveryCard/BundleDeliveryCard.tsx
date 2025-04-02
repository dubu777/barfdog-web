import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import * as styles from "./BundleDeliveryCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { BundleDeliveryAddress } from "@/types";
import {
  colStartWrapper,
  rowStartWrapper,
} from "@/components/pages/order/common/deliveryAddress/DeliveryAddress.css";

interface BundleDeliveryCardProps {
  address: BundleDeliveryAddress;
  isSelected: boolean;
  onToggle: (value: number) => void;
}

export default function BundleDeliveryCard({
  address,
  isSelected,
  onToggle,
}: BundleDeliveryCardProps) {

  return (
    <div className={styles.bundleBottomSheetCardBox({isSelected})}>
      <LabeledRadioButton
        value={address.id}
        isChecked={isSelected}
        onToggle={onToggle}
        optionType="selection"
      >
        <div className={colStartWrapper({ gap: 4 })}>
          <div className={styles.bundleDeliveryCardTitleWrapper}>
            <DefaultText type="headline2">
              {address.deliveryName ?? address.recipientName}
            </DefaultText>
          </div>
          <div className={colStartWrapper({ gap: 2 })}>
            <div className={rowStartWrapper({ gap: 4 })}>
              <DefaultText type="body3">
                {address.deliveryName ?? address.recipientName}
              </DefaultText>
              <DefaultText type="body3">•</DefaultText>
              <DefaultText type="body3">{address.phoneNumber}</DefaultText>
            </div>
            <DefaultText type="body3">
              {address.street} {address.detailAddress}
            </DefaultText>
          </div>
        </div>
      </LabeledRadioButton>
    </div>
  );
}
