import Text from "@/components/ui/text/Text";
import { DeliveryAddress } from "@/types";
import { commonWrapper } from "@/styles/common.css";
import UnCheckedIcon from "/public/images/option/unchecked_radio.svg";
import CheckedIcon from "/public/images/option/checked_selection.svg";
import DeliveryContent from "@/components/domain/delivery/deliveryContent/DeliveryContent";
import Divider from "@/components/ui/divider/Divider";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Card from "@/components/ui/card/Card";

interface BundleDeliveryCardProps {
  delivery: DeliveryAddress;
  isSelected: boolean;
  onToggle: (value: number) => void;
}

export default function BundleDeliveryCard({
  delivery,
  isSelected,
  onToggle,
}: BundleDeliveryCardProps) {
  const handleClick = () => {
    onToggle(delivery.id);
  };
  return (
    <Card
      padding={12}
      border={isSelected ? "red" : "gray200"}
      onClick={handleClick}
      hoverShadow
    >
      <div
        className={commonWrapper({ gap: 8, direction: "col", align: "start" })}
      >
        <div className={commonWrapper({ gap: 8, justify: "start" })}>
          <SvgIcon src={isSelected ? CheckedIcon : UnCheckedIcon} />
          <Text type="headline2">{delivery.petName}</Text>
        </div>
        <Divider thickness={1} color="gray200" />
        <DeliveryContent deliveryDto={delivery} />
      </div>
    </Card>
  );
}
