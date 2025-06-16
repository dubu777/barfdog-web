import * as styles from './CartPriceInfo.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { useCartStore } from "@/store/useCartStore";

const CartPriceInfo = () => {
  const { calculatedPrices } = useCartStore();
  const { productTotalPrice, discount, deliveryFee, totalOrderPrice }  = calculatedPrices;
  
  const infoList = [
    {
      label: '총 금액',
      value: <DefaultText type='headline2'>{productTotalPrice.toLocaleString()}원</DefaultText>,
    },
    {
      label: '할인',
      value: <DefaultText type='body2'>{discount.toLocaleString()}원</DefaultText>,
    },
    {
      label: '배송비',
      value: (
        <DefaultText type='body2' color={deliveryFee === 0 ? 'red' : 'gray900'}>
          {deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`}
        </DefaultText>
      ),
    },
  ]

  return (
    <article className={styles.cartPriceInfoContainer}>
      <DefaultText type='title4'>결제 예상 금액</DefaultText>
      {infoList.map(info => (
        <div key={info.label} className={styles.priceInfo}>
          <DefaultText type='label2' color='gray700'>{info.label}</DefaultText>
          {info.value}
        </div>
      ))}
      <Divider thickness={2} color='gray200' />
      <div className={styles.priceInfo}>
        <DefaultText type='headline2'>결제 금액</DefaultText>
        <DefaultText type='title2' color='red'>{totalOrderPrice.toLocaleString()}원</DefaultText>
      </div>
      <InfoBox text='쿠폰•적립금은 결제 화면에서 사용할 수 있어요!' color='gray' />
    </article>
  );
};

export default CartPriceInfo;