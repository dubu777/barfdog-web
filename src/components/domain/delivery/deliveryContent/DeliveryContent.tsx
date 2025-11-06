import Chips from "@/components/ui/chips/Chips";
import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { ClientDeliveryDto } from "@/types";
import { deliveryContentContainer } from "./DeliveryContent.css";

interface DeliveryContentProps {
  deliveryDto: ClientDeliveryDto;
}

export default function DeliveryContent({ deliveryDto }: DeliveryContentProps) {
  return (
    <div className={deliveryContentContainer}>
      <div className={commonWrapper({ justify: "start", gap: 8 })}>
        <Text type="headline2">
          {deliveryDto.deliveryName ?? deliveryDto.recipientName}
        </Text>
        {deliveryDto.default && (
          <Chips variant="outlined" color="gray700" size="sm" borderRadius="lg">
            기본 배송지
          </Chips>
        )}
      </div>
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 2,
        })}
      >
        <div className={commonWrapper({ justify: "start", gap: 4 })}>
          <Text type="body3">{deliveryDto.recipientName}</Text>
          <Text type="body3">•</Text>
          <Text type="body3">{deliveryDto.phoneNumber}</Text>
        </div>
        <Text type="body3">
          {deliveryDto.street} {deliveryDto.detailAddress}
        </Text>
      </div>
    </div>
  );
}
