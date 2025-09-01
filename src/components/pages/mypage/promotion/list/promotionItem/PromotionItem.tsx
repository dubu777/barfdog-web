import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Card from "@/components/common/card/Card";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import { DISCOUNT_UNIT } from "@/constants";
import { PROMOTION_COUPON_TYPE } from "@/constants/mypage/promotion";
import { PromotionItem as PromotionItemType } from "@/types/mypage/promotion";

interface PromotionItemProps {
	promotion: PromotionItemType;
}

interface PromotionInfo {
	isActive: boolean;
	leftText: string;
	rightText: string;
}

const PromotionInfo = ({
	isActive,
	leftText,
	rightText,
}: PromotionInfo) => (
	<Text
		type='caption'
		color={isActive ? 'gray700' : 'gray500'}
		className={commonWrapper({ align: 'center', justify: 'start', gap: 4 })}
	>
		{leftText}
		<div style={{ height: '10px' }}>
			<Divider thickness={1} direction='vertical' color='gray500' />
		</div>
		{rightText}
	</Text>
)

export default function PromotionItem({
	promotion
}: PromotionItemProps) {
	const promotionInfo = promotion.promotionInfo;
	const promotionCouponInfo = promotion.promotionCouponInfo;

	const promotionId = promotionInfo.promotionId;
	const isActive = promotionInfo.status === 'ACTIVE';
	return (
		<Card
			key={promotionId}
			borderRadius={8}
			padding={20}
			gap={4}
			align='start'
		>
			<Chips variant='solid' color={isActive ? 'blue50' : 'gray100'} borderRadius='lg'>
				프로모션 {isActive ? '진행중' : '종료'}
			</Chips>
			<div
				className={commonWrapper({ direction: 'col', gap: 16, align: 'start' })}
				style={{ opacity: isActive ? 1 : .5 }}
			>
				<div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
					<Text type='title1' color={isActive ? 'red' : 'gray900'}>
						{promotionCouponInfo.discountDegree.toLocaleString()}
						{DISCOUNT_UNIT[promotionCouponInfo.discountType]}
					</Text>
					<div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
						<Text type='label1'>{promotionInfo.name}</Text>
						<Text type='body3' color={isActive ? 'gray900' : 'gray700'}>
							(최대 {promotionCouponInfo.availableMaxDiscount.toLocaleString()}원 할인)
						</Text>
					</div>
				</div>
				<div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
					<Text type='caption' color={isActive ? 'gray700' : 'gray500'}>
						{promotionCouponInfo.availableMinPrice.toLocaleString()}원 이상 구매시
					</Text>
					<PromotionInfo
						isActive={isActive}
						leftText={`${format(promotionCouponInfo.createdDate, 'yyyy.MM.dd')} 등록`}
						rightText={`${PROMOTION_COUPON_TYPE[promotionCouponInfo.couponTarget]} 사용 가능`}
					/>
					<PromotionInfo
						isActive={isActive}
						leftText='프로모션 코드'
						rightText={promotionCouponInfo.code}
					/>
				</div>
			</div>
		</Card>
	);
}