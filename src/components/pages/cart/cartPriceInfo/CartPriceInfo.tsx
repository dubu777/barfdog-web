import { commonWrapper } from '@/styles/common.css';
import { fontColors, textStyles } from '@/components/ui/text/Text.css';
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import { useCartStore } from "@/store/useCartStore";
import LabelValueItem from '@/components/ui/labelValueItem/LabelValueItem';

export default function CartPriceInfo() {
  const { calculatedPrices } = useCartStore();
  const { productTotalPrice, discount, deliveryFee, totalOrderPrice }  = calculatedPrices;
  
  const infoList = [
    {
      label: '총 금액',
      value: `${productTotalPrice.toLocaleString()}원`,
      valueType: 'headline2',
    },
    {
      label: '할인',
      value: `${discount.toLocaleString()}원`,
    },
    {
      label: '배송비',
      valueColor: deliveryFee === 0 ? 'red' : 'gray900',
      value: deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`,
    },
  ]

  return (
    <article className={commonWrapper({
      direction: 'col',
      align: 'start',
      gap: 16,
      padding: 20,
      paddingTop: 28,
      paddingBottom: 28,
    })}>
      <Text type='title4'>결제 예상 금액</Text>
      {infoList.map(info => (
        <LabelValueItem
          key={info.label}
          label={info.label}
          value={info.value}
          labelType='label2'
          labelColor='gray700'
          valueType={info.valueType as keyof typeof textStyles ?? 'body2'}
          valueColor={info.valueColor as keyof typeof fontColors ?? 'gray900'}
          justify='between'
        />
      ))}
      <Divider thickness={2} color='gray200' />
      <div className={commonWrapper({ justify: 'between' })}>
        <Text type='headline2'>결제 금액</Text>
        <Text type='title2' color='red'>
          {totalOrderPrice.toLocaleString()}원
        </Text>
      </div>
      <InfoBox 
        text='쿠폰•적립금은 결제 화면에서 사용할 수 있어요!' 
        color='gray' 
        fullWidth 
      />
    </article>
  );
};