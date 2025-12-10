import Card from "@/components/ui/card/Card";
import DeliveryContent from "@/components/domain/delivery/deliveryContent/DeliveryContent";
import Divider from "@/components/ui/divider/Divider";
import Text from "@/components/ui/text/Text";
import { DeliveryAddress } from "@/types";

interface DeliveryInfoProps {
  deliveryDto: DeliveryAddress;
}

export default function DeliveryInfo({ deliveryDto }: DeliveryInfoProps) {
  return (
    <Card shadow="light" padding={12} gap={12} align="start">
      <Text type="headline2">배송 정보</Text>
      <Divider height={2} color="gray900" />
      <DeliveryContent deliveryDto={deliveryDto} />
    </Card>
  );
}
