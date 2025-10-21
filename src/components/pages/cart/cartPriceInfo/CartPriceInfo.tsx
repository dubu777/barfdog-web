import * as styles from './CartPriceInfo.css';
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { useCartStore } from "@/store/useCartStore";

export default function CartPriceInfo() {
  const { calculatedPrices } = useCartStore();
  const { productTotalPrice, discount, deliveryFee, totalOrderPrice }  = calculatedPrices;
  
  const infoList = [
    {
      label: '총 금액',
      value: <Text type='headline2'>{productTotalPrice.toLocaleString()}원</Text>,
    },
    {
      label: '할인',
      value: <Text type='body2'>{discount.toLocaleString()}원</Text>,
    },
    {
      label: '배송비',
      value: (
        <Text type='body2' color={deliveryFee === 0 ? 'red' : 'gray900'}>
          {deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`}
        </Text>
      ),
    },
  ]

  return (
    <article className={styles.cartPriceInfoContainer}>
      <Text type='title4'>결제 예상 금액</Text>
      {infoList.map(info => (
        <div key={info.label} className={styles.priceInfo}>
          <Text type='label2' color='gray700'>{info.label}</Text>
          {info.value}
        </div>
      ))}
      <Divider thickness={2} color='gray200' />
      <div className={styles.priceInfo}>
        <Text type='headline2'>결제 금액</Text>
        <Text type='title2' color='red'>{totalOrderPrice.toLocaleString()}원</Text>
      </div>
      <InfoBox text='쿠폰•적립금은 결제 화면에서 사용할 수 있어요!' color='gray' />
    </article>
  );
};