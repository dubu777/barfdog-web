import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Divider from "@/components/ui/divider/Divider";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import { PaymentMethod } from "@/types";
import { PAYMENT_LABEL } from "@/constants";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";

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
}: {
  label: string;
  value: string;
}) => {
  return (
    <div
      className={commonWrapper({ direction: "col", gap: 6, align: "start" })}
    >
      <Text type="label4" color="gray700">
        {label}
      </Text>
      <Card
        padding={8}
        backgroundColor="gray50"
        shadow="none"
        align="start"
        border="gray100"
      >
        <Text type="body3" color="gray900">
          {value}
        </Text>
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
        className={commonWrapper({ direction: "col", paddingY: 16 })}
      >
        <div
          className={commonWrapper({
            direction: "col",
            paddingX: 12,
            gap: 6,
          })}
        >
          <LabelValueItem
            label="취소 요청일자"
            value={format(requestDate, "yyyy.MM.dd HH:mm")}
            labelType="label4"
            labelColor="gray700"
            valueType="body3"
            valueColor="gray900"
            justify="between"
          />
          <LabelValueItem
            label="취소 처리일자"
            value={format(confirmDate, "yyyy.MM.dd HH:mm")}
            labelType="label4"
            labelColor="gray700"
            valueType="body3"
            valueColor="gray900"
            justify="between"
          />
        </div>
        <Divider height={1} color="gray100" />
        <div
          className={commonWrapper({
            direction: "col",
            paddingX: 12,
            gap: 16,
          })}
        >
          <div
            className={commonWrapper({
              direction: "col",
              gap: 12,
              align: "start",
            })}
          >
            <RefundReasonBox label="환불 사유" value={reason} />
            <RefundReasonBox label="환불 상세 사유" value={detailReason} />
          </div>
          <Divider height={1} color="gray300" />
          <div className={commonWrapper({ direction: "col", gap: 6 })}>
            <LabelValueItem
              label="총 환불 금액"
              value={`${paymentPrice.toLocaleString()}원`}
              labelType="headline2"
              labelColor="gray700"
              valueType="headline2"
              valueColor="red"
              justify="between"
            />
            <LabelValueItem
              label="환불 수단"
              value={PAYMENT_LABEL[paymentMethod]}
              labelType="label4"
              labelColor="gray700"
              valueType="body3"
              valueColor="gray900"
              justify="between"
            />
          </div>
        </div>
      </CardWrapper>
    </InfoWrapper>
  );
}
