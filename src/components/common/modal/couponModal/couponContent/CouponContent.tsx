import * as styles from "@/components/common/modal/couponModal/couponCard/CouponCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
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
			<DefaultText
				type="title1"
				color={!usable ? "gray400" : isSelected ? "red" : "gray900"}
			>
				{discountText}
			</DefaultText>
			<div
				className={styles.couponCardWrapper}
				style={{ marginBottom: "12px" }}
			>
				<DefaultText type="label1" color={!usable ? "gray400" : "gray700"}>
					{name}
				</DefaultText>
				{discountType === "FIXED_RATE" && (
					<DefaultText type="body3" color={!usable ? "gray400" : "gray600"}>
						(최대 {formatNumberWithCommas(coupon.availableMaxDiscount)}원
						할인)
					</DefaultText>
				)}
			</div>
			<div className={styles.couponCardWrapper}>
				<DefaultText
					type="caption"
					color={reasons.includes("minPrice") ? "red" : "gray600"}
				>
					{formatNumberWithCommas(availableMinPrice)}원 이상 구매시
				</DefaultText>
				<DefaultText type="caption" color="gray500">
					{formatDateToKorean(expiredDate)}까지 |{" "}
					<DefaultText
						type="caption"
						color={reasons.includes("orderType") ? "red" : "gray500"}
					>
						{couponTargetText}
					</DefaultText>
				</DefaultText>
			</div>
		</div>
	)
}