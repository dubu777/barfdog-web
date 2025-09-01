import * as styles from './RefundExchangeGuide.css';
import { commonWrapper } from '@/styles/common.css';
import ItemDetailLayout from '../../../layout/ItemDetailLayout';
import Text from "@/components/common/text/Text";
import InfoBox from '@/components/common/infoBox/InfoBox';
import Divider from '@/components/common/divider/Divider';
import InfoText from '@/components/common/infoText/InfoText';

export default function RefundExchangeGuide() {
  const defaultInfo = [
    {
      label: '지정 택배사',
      value: 'CJ 대한통운'
    },
    {
      label: '반품 배송비',
      value: (
        <div className={commonWrapper({ direction: 'col', align: 'start', gap: 2 })}>
          <Text type='label2' color='gray800'>편도 3,000원</Text>
          <Text type='caption2'>(최소 배송비 무료인 경우 6,000원 부과)</Text>
        </div>
      )
    },
  ]

  const periodInfo = [
    {
      label: '신선 식품',
      value: '반품 및 교환 불가',
    },
    {
      label: '맞춤 제작 식품',
      value: '반품 및 교환 불가',
    },
    {
      label: '일반 상품',
      value: '7일',
    },
    {
      value: (
        <InfoBox
          align='start'
          text={(
            <>
            단, 주문이 생산되기 전 컷오프
            <Text type='label3' color='red'>
              (다음 주문의 배송 전 금요일 24시) 전 까지 고객님이 직접 취소 가능
            </Text>
            <br/><br/>
            바프독은 항상 목요일 주문마감, 금~일요일에 생산되어 화요일 일괄 배송 됩니다
            </>
          )}
        />
      ),
    },
  ]

  const reasonOfImpossibilityInfo = [
    '반품 요청 기간이 지난 경우',
    '구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우',
    '구매자의 책임 있는 사유로 포장이 훼손되어 상품 가치가 현저히 상실된 경우',
    '구매자의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우',
    '시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우',
    '고객의 요청 사항에 맞춰 제작에 들어가는 맞춤 제작 식품의 경우',
    '고객의 부주의 혹은 잘못된 보관 방법으로 인한 상품 변질된 경우',
  ]

  const sellerInfo = [
    {
      label: '상호명',
      value: '주식회사 프레쉬아워',
    },
    {
      label: '대표자',
      value: '임경호',
    },
    {
      label: '사업자등록번호',
      value: '351-87-02455',
    },
    {
      label: '통신판매업번호',
      value: '2022-충북충주-0578',
    },
    {
      label: '신선 식품',
      value: `충청청북도 충주시 번영대로 214 1층 프레쉬아워\n(우: 27352)`,
    },
    {
      label: '고객센터',
      value: '043-855-4995',
    },
  ]
  return (
    <div className={styles.infoContainer}>
      <ItemDetailLayout
        title='반품/교환 안내'
        hasTitlePadding={false}
      >
        <div className={styles.infoSection}>
          {defaultInfo.map((info, index) => (
            <div key={index} className={styles.infoSectionItem}>
              <Text className={styles.infoSectionLabel} type='body3' color='gray700'>{info.label}</Text>
              <Text type='label2' color='gray800'>{info.value}</Text>
            </div>
          ))}
        </div>
      </ItemDetailLayout>
      <Divider thickness={2} color='gray200' />
      <ItemDetailLayout
        title='반품/교환 요청 가능 기간'
        hasTitlePadding={false}
      >
        <div className={styles.infoSection}>
        {periodInfo.map((info, index) => (
          <div key={index} className={styles.infoSectionItem}>
            {info.label && 
              <Text className={styles.infoSectionLabel} type='body3' color='gray700'>{info.label}</Text>
            }
            {typeof info.value === 'string'
              ? <Text type='label2' color='gray800'>{info.value}</Text>
              : info.value
            }
          </div>
        ))}
      </div>
      </ItemDetailLayout>
      <Divider thickness={2} color='gray200' />
      <ItemDetailLayout
        title='반품/교환 불가능 사유'
        hasTitlePadding={false}
      >
        <div className={styles.infoSection}>
          {reasonOfImpossibilityInfo.map((reason, index) => (
            <div key={index} className={styles.infoSectionItem}>
              <InfoText type='label2' color='gray800' text={reason} />
            </div>
          ))}
        </div>
      </ItemDetailLayout>
      <Divider thickness={2} color='gray200' /> 
      <ItemDetailLayout
        title='판매자 정보'
        hasTitlePadding={false}
      >
        <div className={styles.infoSection}>
          {sellerInfo.map((info, index) => (
            <div key={index} className={styles.infoSectionItem}>
              <Text className={styles.infoSectionLabel} type='body3' color='gray700'>{info.label}</Text>
              <Text type='label2' color='gray800'>{info.value}</Text>
            </div>
          ))}
        </div>
      </ItemDetailLayout>
    </div>
  );
};