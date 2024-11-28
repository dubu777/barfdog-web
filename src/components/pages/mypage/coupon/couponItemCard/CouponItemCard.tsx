import * as styles from "./CouponItemCard.css";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { formatDate } from "@/utils/dateUtils";
import { CouponData } from "@/types/coupon";

const CouponItemCard = ({ coupon }: { coupon: CouponData }) => {
  const won = coupon.discountType === 'FLAT_RATE';
  const percent = coupon.discountType === 'FIXED_RATE';

  const subscribeTarget = coupon.couponTarget === 'SUBSCRIBE';
  const generalTarget = coupon.couponTarget === 'GENERAL';
  const allTarget = coupon.couponTarget === 'ALL';

  const couponTargetName = generalTarget ? '일반 상품 한정' : subscribeTarget ? '구독 상품 한정' : '전상품 사용 가능';
  return (
    <li className={styles.couponItem}>
      <Text type='description' size='sm' color='black' className={styles.couponName}>
        {coupon.name}
      </Text>
      <Text type='title' size='titleXl' color='red' className={styles.discount}>
        { won ? `${coupon.discountDegree.toLocaleString()}원 `
          : percent && `${coupon.discountDegree}% `
        }할인
      </Text>

      <Text type='description' size='xs' color='grey' className={styles.minPrice}>
        {coupon.availableMinPrice.toLocaleString()}원 이상 주문 시
      </Text>
      <Text type='description' size='xs' color='grey' className={styles.couponType}>
        {couponTargetName}
      </Text>
      <Text type='description' size='xs' color='red'>
        {formatDate(coupon.expiredDate, 'fullDateTimeKR').slice(0, -3)} 까지
      </Text>
      <div className={styles.couponControls({ allTarget: allTarget })}>
        {(allTarget || subscribeTarget) &&
        <DefaultButton linkUrl='/survey' type='black' size='sm' borderRadius='sm' >
          구독에 바로 사용
        </DefaultButton>
        }
        {(allTarget || generalTarget) &&
        <DefaultButton linkUrl='/store?itemType=ALL' type='blackBorder' size='sm' borderRadius='sm'>
          스토어에 바로 사용
        </DefaultButton>
        }
      </div>
    </li>
  );
};

export default CouponItemCard;