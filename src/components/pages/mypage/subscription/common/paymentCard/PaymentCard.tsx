import * as styles from "./PaymentCard.css";
import CardImage from "/public/images/mypage/card-small.svg";
import CardChipImage from "/public/images/mypage/card-chip.svg";
import Text from "@/components/common/text/Text";
import { PAYMENT_LABEL } from "@/constants";
import { CARD_COLORS } from "@/constants/mypage/subscription";
import { PaymentMethod } from "@/types";

const getCardColor = (paymentCardName: string): string => {
  const foundKey = Object.keys(CARD_COLORS).find((key) =>
    paymentCardName.includes(key)
  );
  return foundKey ? CARD_COLORS[foundKey] : CARD_COLORS.default;
};

interface PaymentCardProps {
  cardSize?: "sm" | "lg";
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardName?: string;
}

export default function PaymentCard({
  paymentMethod,
  cardNumber,
  cardName,
  cardSize = "lg",
}: PaymentCardProps) {
  const paymentCardNumber =
    paymentMethod !== "NAVER_PAY" && cardNumber
      ? `${cardNumber?.slice(0, 6)}`
      : "-";
  const paymentCardName =
    paymentMethod === "CREDIT_CARD"
      ? cardName
      : cardName
      ? `${PAYMENT_LABEL[paymentMethod]} ${cardName}`
      : `${PAYMENT_LABEL[paymentMethod]}`;
  const cardColor = getCardColor(paymentCardName as string);
  const cardFontColor =
    cardColor === CARD_COLORS["네이버페이"] ||
    cardColor === CARD_COLORS["카카오페이"]
      ? "gray900"
      : "gray0";
  return cardSize === "lg" ? (
    <div className={styles.card} style={{ background: cardColor }}>
      <div className={styles.cardInfo}>
        <Text type="headline1" color={cardFontColor}>
          {paymentCardName}
        </Text>
        <CardChipImage className={styles.cardChip} />
      </div>
      <div className={styles.cardBottom}>
        <Text type="label2" color="gray0">
          {paymentCardNumber}
        </Text>
      </div>
    </div>
  ) : (
    <div className={styles.smallCardBox}>
      <CardImage style={{ color: cardColor }} />
      <div className={styles.smallCardInfo}>
        <Text type="headline2">{paymentCardName}</Text>
        <Text type="body2">{paymentCardNumber}</Text>
      </div>
    </div>
  );
};