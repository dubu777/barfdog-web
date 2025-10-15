import Card from "@/components/common/card/Card";
import DeliveryContent from "@/components/common/deliveryContent/DeliveryContent";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import { ClientDeliveryDto } from "@/types";

interface DeliveryInfoProps {
  deliveryDto: ClientDeliveryDto;
}

export default function DeliveryInfo({ deliveryDto }: DeliveryInfoProps) {
  return (
    <Card shadow="light" padding={12} gap={12} align="start">
      <Text type="headline2">배송 정보</Text>
      <Divider thickness={2} color="gray900" />
      <DeliveryContent deliveryDto={deliveryDto} />
    </Card>
  );
}
