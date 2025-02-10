import * as styles from './RefundExchangeGuide.css';
import Text from "@/components/common/text/Text";
import { DefaultObjectType } from "@/types";

const refundExchangeGuide: DefaultObjectType[] = [
  {
    id: '판매사 지정 택배사',
    name: '판매사 지정 택배사',
    value: 'CJ 대한통운',
  },
  {
    id: '반품 배송비',
    name: '반품 배송비',
    value: '편도 3,000원 (최소 배송비 무료인 경우 6,000원 부과)',
  },
  {
    id: '반품/교환 사유에 따른 \n요청 가능 기간',
    name: '반품/교환 사유에 따른 \n요청 가능 기간',
    value: `
      신선식품, 맞춤제작식품: 불가 / 일반상품: 7일\n
      단, 주문이 생산되기 전 컷오프(다음 주문의 배송 전 금요일 24시) 전 까지 고객님이 직접 취소 가능.\n
      (바프독은 항상 목요일 주문마감, 금~일요일에 생산되어 화요일 일괄 배송 됩니다)
    `,
  },
  {
    id: '반품/교환 불가능 사유',
    name: '반품/교환 불가능 사유',
    value: `
      - 반품요청기간이 지난 경우\n
      - 구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우\n
      - 구매자의 책임 있는 사유로 포장이 훼손되어 상품 가치가 현저히 상실된 경우\n
      - 구매자의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우\n
      - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우\n
      - 고객의 요청 사항에 맞춰 제작에 들어가는 맞춤 제작 식품의 경우\n
      - 고객의 부주의 혹은 잘못된 보관 방법으로 인한 상품 변질된 경우
    `,
  },
  {
    id: '판매자 정보',
    name: '판매자 정보',
    value: `
      상호명 : 주식회사 프레쉬아워\n
      대표자 : 임경호\n
      사업자등록번호 : 351-87-02455\n
      통신판매업번호 : 2022-충북충주-0578\n
      사업장 소재지 : 충청북도 충주시 번영대로 214 1층 프레쉬아워 (우 : 27352)\n
      고객센터 : 043-855-4995
    `,
  },
]
const RefundExchangeGuide = () => {
  return (
    <div className={styles.refundExchangeGuideContainer}>
      <div className={styles.guideTitle}>
        바프독 반품/교환 안내
      </div>
      <ul className={styles.guideContent}>
        {refundExchangeGuide.map(guide => (
          <li key={guide.id} className={styles.guideItem}>
            <Text type='description' size='md' weight='bold' color='black' align='left'>
              {guide.name}
            </Text>
            <Text type='description' size='md' weight='normal' color='grey' align='left' lineHeight='inherit'>
              {guide.value}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RefundExchangeGuide;