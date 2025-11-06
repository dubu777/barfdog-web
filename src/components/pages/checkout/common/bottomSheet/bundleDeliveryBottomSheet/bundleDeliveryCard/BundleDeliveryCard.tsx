import LabeledRadioButton from "@/components/ui/labeledRadioButton/LabeledRadioButton";
import * as styles from "./BundleDeliveryCard.css";
import Text from "@/components/ui/text/Text";
import { BundleDeliveryAddress } from "@/types";
import { commonWrapper } from "@/styles/common.css";

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
    <div className={styles.bundleBottomSheetCardBox({ isSelected })}>
      <LabeledRadioButton
        value={address.id}
        isChecked={isSelected}
        onToggle={onToggle}
        optionType="selection"
      >
        <div
          className={commonWrapper({
            direction: "col",
            gap: 4,
            align: "start",
          })}
        >
          <div className={styles.bundleDeliveryCardTitleWrapper}>
            <Text type="headline2">
              {address.deliveryName ?? address.recipientName}
            </Text>
          </div>
          <div
            className={commonWrapper({
              direction: "col",
              gap: 2,
              align: "start",
            })}
          >
            <div className={commonWrapper({ gap: 4, justify: "start" })}>
              <Text type="body3">
                {address.deliveryName ?? address.recipientName}
              </Text>
              <Text type="body3">•</Text>
              <Text type="body3">{address.phoneNumber}</Text>
            </div>
            <Text type="body3">
              {address.street} {address.detailAddress}
            </Text>
          </div>
        </div>
      </LabeledRadioButton>
    </div>
  );
}
