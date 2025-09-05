import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import Card from "@/components/common/card/Card";
import Chips from "@/components/common/chips/Chips";
import TitleText from "@/components/pages/mypage/common/card/typography/TitleText";
import SubtitleText from "@/components/pages/mypage/common/card/typography/SubtitleText";
import DescriptionText from "@/components/pages/mypage/common/card/typography/DescriptionText";
import MetaText from "@/components/pages/mypage/common/card/typography/MetaText";
import { COUPON_TARGET, DISCOUNT_UNIT } from "@/constants";
import { PromotionItem as PromotionItemType } from "@/types/mypage/promotion";

interface PromotionItemProps {
	promotion: PromotionItemType;
}

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
					<TitleText color={isActive ? 'red' : 'gray900'}>
						{promotionCouponInfo.discountDegree.toLocaleString()}
						{DISCOUNT_UNIT[promotionCouponInfo.discountType]}
					</TitleText>
					<div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
						<SubtitleText text={promotionInfo.name} />
						<DescriptionText text={`(최대 ${promotionCouponInfo.availableMaxDiscount.toLocaleString()}원 할인)`} color={isActive ? 'gray900' : 'gray700'} />
					</div>
				</div>
				<div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
					<MetaText
						color={isActive ? 'gray700' : 'gray500'}
						textList={[
							`${promotionCouponInfo.availableMinPrice.toLocaleString()}원 이상 구매시`,
						]}
					/>
					<MetaText
						type='caption'
						color={isActive ? 'gray700' : 'gray500'}
						textList={[
							`${format(promotionCouponInfo.createdDate, 'yyyy.MM.dd')} 등록`,
							`${COUPON_TARGET[promotionCouponInfo.couponTarget]} 사용 가능`
						]}
					/>
					<MetaText
						type='caption'
						color={isActive ? 'gray700' : 'gray500'}
						textList={[
							'프로모션 코드',
							promotionCouponInfo.code,
						]}
					/>
				</div>
			</div>
		</Card>
	);
}