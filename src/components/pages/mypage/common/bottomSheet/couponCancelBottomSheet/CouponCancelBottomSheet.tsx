import * as styles from "./CouponCancelBottomSheet.css";
import Text from "@/components/common/text/Text";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import Card from "@/components/common/card/Card";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import CouponContent from "@/components/common/modal/couponModal/couponContent/CouponContent";
import { Coupon, UsingCoupon } from "@/types";
import { useCouponStore } from "@/store/checkout/useCouponStore";
import {
  calculateCouponDiscount,
  formatNumberWithCommas,
  isCouponUsable,
} from "@/utils";

interface CouponCancelBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  usingCoupon: UsingCoupon;
  handleCancel: () => void;
  title: string;
  subTitle: string;
  confirmText: string;
  closeText: string;
  coupons?: Coupon[];
  orderPrice?: number;
}

const CouponCancelBottomSheet = ({
  isOpen,
  onClose,
  usingCoupon,
  handleCancel,
  title,
  subTitle,
  confirmText,
  closeText,
  coupons,
  orderPrice,
}: CouponCancelBottomSheetProps) => {
  const { maxAvailableCouponDiscount } = useCouponStore();
  const usingDiscountCoupon = `${formatNumberWithCommas(
    usingCoupon.discount
  )}원`;

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      fullHeight={!!coupons}
      closeOnBackgroundClick={false}
    >
      <div className={styles.couponCancelHeader}>
        <Text type="title4" preLine>
          {title}
        </Text>
        <Text type="label4" color="gray600" preLine>
          {subTitle}
        </Text>
      </div>
      <div className={styles.couponCancelBody}>
        <div>
          <Text type={coupons ? "title4" : "headline2"}>적용중 쿠폰</Text>
          <div className={styles.couponCardContainer}>
            <Card
              shadow="strong"
              padding={20}
              align="start"
              className={styles.usingCoupon}
            >
              <Text type="title1" color="red">
                {usingDiscountCoupon}
              </Text>
              <Text type="label1" color="gray700">
                {usingCoupon.couponName}
              </Text>
            </Card>
          </div>
        </div>
        {coupons && orderPrice && (
          <div>
            <Text type="title4">사용 가능 쿠폰</Text>
            <ul className={styles.couponCardContainer}>
              {coupons.map((coupon) => {
                const {
                  memberCouponId,
                  discountDegree,
                  discountType,
                  availableMinPrice,
                  expiredDate,
                  name,
                } = coupon;
                const { discountBasedOnCoupon } = calculateCouponDiscount(
                  orderPrice,
                  coupon,
                  maxAvailableCouponDiscount
                );
                const { usable, reasons } = isCouponUsable(
                  coupon,
                  orderPrice,
                  "SUBSCRIBE"
                );

                return (
                  usable && (
                    <Card key={memberCouponId} shadow="strong" padding={20}>
                      <CouponContent
                        coupon={coupon}
                        usable={usable}
                        name={name}
                        availableMinPrice={availableMinPrice}
                        discountDegree={discountDegree}
                        discountType={discountType}
                        discountBasedOnCoupon={discountBasedOnCoupon}
                        expiredDate={expiredDate}
                        reasons={reasons}
                      />
                    </Card>
                  )
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <ButtonDocked
        type="dual-button"
        primaryButtonSize="lg"
        secondaryButtonLabel={closeText}
        primaryButtonLabel={confirmText}
        onPrimaryClick={handleCancel}
        onSecondaryClick={onClose}
        position="sticky"
      />
    </BottomSheet>
  );
};

export default CouponCancelBottomSheet;
