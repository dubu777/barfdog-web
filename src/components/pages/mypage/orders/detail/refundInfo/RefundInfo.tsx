import { refundReasonBox } from "./RefundInfo.css";
import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import Card from "@/components/common/card/Card";
import InfoItem from "../../card/common/InfoItem";
import CardWrapper from "../../card/common/CardWrapper";
import { PaymentMethod } from "@/types";
import { PAYMENT_LABEL } from "@/constants";

interface RefundInfoProps {
  requestDate: string;
  confirmDate: string;
  reason: string;
  detailReason: string;
  paymentMethod: PaymentMethod;
  paymentPrice: number;
}

const RefundReasonBox = ({ 
  label, 
  value,
}: { label: string, value: string }) => {
  return (
    <div className={commonWrapper({ direction: 'col', gap: 6, align: 'start' })}>
      <Text type="label4" color="gray700">{label}</Text>
      <Card 
        padding={8} 
        backgroundColor='gray50' 
        shadow='none'
        align='start' 
        className={refundReasonBox}
      >
        <Text type="body3" color="gray900">{value}</Text>
      </Card>
    </div>
  );
};

export default function RefundInfo({
  requestDate,
  confirmDate,
  reason,
  detailReason,
  paymentMethod,
  paymentPrice,
}: RefundInfoProps) {
  return (
    <CardWrapper 
      padding={false} 
      gap={16}
      className={commonWrapper({ padding: '16/0' })}
    >
      <div className={commonWrapper({
        direction: 'col',
        padding: '0/12',
        gap: 6,
      })}>
        <InfoItem
          label="취소 요청일자"
          value={format(requestDate, 'yyyy.MM.dd HH:mm')}
        />
        <InfoItem
          label="취소 처리일자"
          value={format(confirmDate, 'yyyy.MM.dd HH:mm')}
        />
      </div>
      <Divider thickness={1} color="gray100" />
      <div className={commonWrapper({
        direction: 'col',
        padding: '0/12',
        gap: 16,
      })}>
        <div className={commonWrapper({ direction: 'col', gap: 12, align: 'start' })}>
          <RefundReasonBox label="환불 사유" value={reason} />
          <RefundReasonBox label="환불 상세 사유" value={detailReason} />
        </div>
        <Divider thickness={1} color="gray300" />
        <div className={commonWrapper({ direction: 'col', gap: 6 })}>
          <InfoItem
            label="총 환불 금액"
            value={`${paymentPrice.toLocaleString()}원`}
            labelType="headline2"
            valueType="headline2"
            valueColor="red"
          />
          <InfoItem
            label="환불 수단"
            value={PAYMENT_LABEL[paymentMethod]}
          />
        </div>
      </div>
    </CardWrapper>
  );
}