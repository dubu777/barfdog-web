import * as styles from './PaymentCard.css';
import CardImage from "/public/images/mypage/card-small.svg";
import CardChipImage from "/public/images/mypage/card-chip.svg";
import Text from "@/components/common/text/Text";
import { CARD_COLORS, PAYMENT } from "@/constants";
import { PaymentMethod } from '@/types';

const getCardColor = (paymentCardName: string): string => {
	if (paymentCardName.includes("네이버페이")) return CARD_COLORS["네이버페이 머니"];
	if (paymentCardName.includes("카카오")) return CARD_COLORS["카카오페이 머니"];
	const foundKey = Object.keys(CARD_COLORS).find((key) => paymentCardName.includes(key));
	return foundKey ? CARD_COLORS[foundKey] : CARD_COLORS.default;
};

interface PaymentCardProps {
	cardSize?: 'sm' | 'lg';
	paymentMethod: PaymentMethod;
	cardNumber?: string;
	cardName?: string;
}

const PaymentCard = ({
	paymentMethod,
	cardNumber,
	cardName,
	cardSize = 'lg',
}: PaymentCardProps) => {
	const paymentCardNumber = paymentMethod !== 'NAVER_PAY' && cardNumber ? `신용 • ${cardNumber?.slice(0, 6)}` : '-';
	const paymentCardName =
		paymentMethod === 'CREDIT_CARD'
			? cardName
				: cardName
				? `${PAYMENT[paymentMethod]} ${cardName}`
				: `${PAYMENT[paymentMethod]} 머니`;
	const cardColor = getCardColor(paymentCardName as string);
	const cardFontColor = cardColor === CARD_COLORS["네이버페이 머니"] || cardColor === CARD_COLORS["카카오페이 머니"]
		? 'gray900'
		: 'gray0';
	return (
		cardSize === 'lg'
			? (
				<div className={styles.card} style={{ background: cardColor }}>
					<div className={styles.cardInfo}>
						<Text type='headline1' color={cardFontColor}>{paymentCardName}</Text>
						<CardChipImage className={styles.cardChip} />
					</div>
					<div className={styles.cardBottom}>
						<Text type='label2' color='gray0'>{paymentCardNumber}</Text>
						<Text type='body2' color='gray0'>일시불</Text>
					</div>
				</div>
			)
			: (
				<div className={styles.smallCardBox}>
					<CardImage style={{ color: cardColor }} />
					<div className={styles.smallCardInfo}>
						<Text type='headline2'>{paymentCardName}</Text>
						<Text type='body2'>{paymentCardNumber}</Text>
						<Text type='body2' color='gray500'>일시불</Text>
					</div>
				</div>
			)
	);
};

export default PaymentCard;