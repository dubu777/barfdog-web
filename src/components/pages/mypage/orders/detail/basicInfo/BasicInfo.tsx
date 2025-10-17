import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import { ORDER_TYPE_LABEL } from "@/constants/mypage/orders";
import { OrderType } from "@/types/mypage/orders";

interface BasicInfoProps {
  type: OrderType;
  orderDate?: string;
  paymentDate?: string;
  isPackage?: boolean;
  merchantUid: string;
}

export default function BasicInfo({
  orderDate,
  paymentDate,
  type,
  isPackage = false,
  merchantUid,
}: BasicInfoProps) {
  return (
    <Card
      direction="col"
      gap={4}
      padding={12}
      borderRadius={12}
      align='start'
    >
      <Text type="caption2" color="gray700" className={commonWrapper({ gap: 4, justify: 'start' })}>
        <span>
          {format(new Date(orderDate ?? paymentDate ?? ''), 'yyyy.MM.dd HH:mm')}
        </span>
        <span>
          {ORDER_TYPE_LABEL[type]}
        </span>
      </Text>
      {type === 'GENERAL' && isPackage && 
        <div className={commonWrapper({ gap: 6, justify: 'start' })}>
          <Text type="label4">묶음 배송</Text>
          <Text type="body3" color="gray700">정기구독 배송 시 함께 배송됩니다</Text>
        </div>
      }
      <div className={commonWrapper({ gap: 6, justify: 'start' })}>
        <Text type="label4">주문번호</Text>
        <Text type="body3" color="gray700">{merchantUid}</Text>
      </div>
    </Card>
  );
}