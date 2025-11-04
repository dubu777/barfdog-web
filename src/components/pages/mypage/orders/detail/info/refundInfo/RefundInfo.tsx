import { refundReasonBox } from "./RefundInfo.css";
import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Divider from "@/components/ui/divider/Divider";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import InfoItem from "@/components/pages/mypage/common/card/typography/InfoItem";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
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
    <InfoWrapper title="환불 정보" titleType="title4" padding={false}>
      <CardWrapper
        padding={false} 
        gap={16}
        className={commonWrapper({ direction: 'col', padding: '16/0' })}
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
    </InfoWrapper>
  );
}