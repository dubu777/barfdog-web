import * as styles from './CartPriceInfo.css';
import Text from "@/components/common/text/Text";
import { DefaultObjectType } from "@/types/common";
import { useCartStore } from "@/store/useCartStore";

const CartPriceInfo = () => {
  const { calculatedPrices } = useCartStore();
  const { productTotalPrice, discount, deliveryFee, totalOrderPrice, diffDeliveryFee }  = calculatedPrices;
  const infoList: DefaultObjectType[] = [
    {
      id: '상품 금액',
      name: '상품 금액',
      value: productTotalPrice,
      visible: true,
    },
    {
      id: '할인',
      name: '할인',
      value: discount,
      visible: true,
    },
    {
      id: '배송비',
      name: '배송비',
      value: deliveryFee,
      visible: true,
    },
    {
      id: '무료배송',
      name: '',
      value: <Text type='description' size='sm' color='red'>{diffDeliveryFee.toLocaleString()}원 추가 시 <b>무료배송</b></Text>,
      visible: productTotalPrice !== 0 && diffDeliveryFee !== 0,
    },
    {
      id: '총 주문 금액',
      name: <b>총 주문 금액</b>,
      value: <Text type='title' size='titleLg' color='red'>{productTotalPrice === 0 ? 0 : totalOrderPrice.toLocaleString()}원</Text>,
      visible: true,
    }
  ]
  return (
    <article className={styles.cartPriceInfoContainer}>
      <ul className={styles.priceInfoList}>
        {infoList.map((info, index) => (
          info.visible &&
          <li key={`${info.id}${index}`} className={styles.priceInfo}>
            <Text type='description' size='md' color='black' weight='normal'>
              {info.name}
            </Text>
            {typeof info.value === 'number' ?
              <Text type='description' size='md' color='black' weight='normal'>
                {info.value.toLocaleString()}원
              </Text>
              : info.value
            }
          </li>
        ))}
      </ul>
      <Text type='description' size='sm' color='grey' align='right'>
        쿠폰/적립금은 주문서에서 사용 가능합니다.
      </Text>
    </article>
  );
};

export default CartPriceInfo;