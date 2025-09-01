import * as styles from "@/components/common/modal/couponModal/couponCard/CouponCard.css";
import Text from "@/components/common/text/Text";
import { formatDateToKorean, formatNumberWithCommas, getCouponTargetText } from "@/utils";
import { Coupon, DiscountType } from "@/types";

interface CouponContentProps {
	coupon: Coupon;
	usable: boolean;
	name: string;
	discountType: DiscountType;
	availableMinPrice: number;
	expiredDate: string;
	reasons: string[];
	discountDegree: number;
	discountBasedOnCoupon: number;
	isSelected?: boolean;
}

export default function CouponContent({
	usable,
	name,
	discountType,
	coupon,
	availableMinPrice,
	expiredDate,
	reasons,
	discountDegree,
	discountBasedOnCoupon,
	isSelected = false,
}: CouponContentProps) {
	const discountText =
		discountType === "FIXED_RATE"
			? `${formatNumberWithCommas(discountBasedOnCoupon)}원 (${discountDegree}%)`
			: `${formatNumberWithCommas(discountBasedOnCoupon)}원`;
	const couponTargetText = getCouponTargetText(coupon.couponTarget);

	return (
		<div className={styles.couponCardWrapper} style={{ gap: "4px" }}>
			<Text
				type="title1"
				color={!usable ? "gray400" : isSelected ? "red" : "gray900"}
			>
				{discountText}
			</Text>
			<div
				className={styles.couponCardWrapper}
				style={{ marginBottom: "12px" }}
			>
				<Text type="label1" color={!usable ? "gray400" : "gray700"}>
					{name}
				</Text>
				{discountType === "FIXED_RATE" && (
					<Text type="body3" color={!usable ? "gray400" : "gray600"}>
						(최대 {formatNumberWithCommas(coupon.availableMaxDiscount)}원
						할인)
					</Text>
				)}
			</div>
			<div className={styles.couponCardWrapper}>
				<Text
					type="caption"
					color={reasons.includes("minPrice") ? "red" : "gray600"}
				>
					{formatNumberWithCommas(availableMinPrice)}원 이상 구매시
				</Text>
				<Text type="caption" color="gray500">
					{formatDateToKorean(expiredDate)}까지 |{" "}
					<Text
						type="caption"
						color={reasons.includes("orderType") ? "red" : "gray500"}
					>
						{couponTargetText}
					</Text>
				</Text>
			</div>
		</div>
	)
}