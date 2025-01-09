import * as styles from './SubscriptionCard.css';
import { inlineBlockSpan } from "@/styles/common.css";
import RightArrowIcon from "/public/images/icons/right-arrow-black.svg";
import Text from "@/components/common/text/Text";
import Badge from "@/components/common/badge/Badge";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { subscriptionPlanInfo, subscriptionStatus } from "@/constants";
import { formatDate } from "@/utils/dateUtils";
import { getProductionDates } from "@/utils/getProductionDates";
import { getNextPaymentPrice } from "@/utils/getNextPaymentPrice";
import { getPackagePeriod } from "@/utils/getPackagePeriod";
import { PlanKey, SubscriptionListData } from "@/types/subscription";
import { DefaultObjectType } from "@/types/common";

const SubscriptionCard = ({ subscriptionDetail }: { subscriptionDetail: SubscriptionListData }) => {
  const { subscribeDto } = subscriptionDetail;
  const isPackageData = !!subscribeDto.subscriptionMonth && subscribeDto.packagePrice !== -1;
  const productionDates = getProductionDates(subscribeDto.nextDeliveryDate);

  const subscribeInfoList: DefaultObjectType[] = [
    {
      id: '현재 패키지',
      name: '현재 패키지',
      value: `${subscribeDto.subscriptionMonth}개월`,
      visible: isPackageData,
    },
    {
      id: '현재 플랜',
      name: '현재 플랜',
      value: subscriptionPlanInfo[subscribeDto?.plan as PlanKey]?.label || '-',
      visible: true,
    },
    {
      id: '현재 레시피',
      name: '현재 레시피',
      value: subscriptionDetail.recipeNames,
      visible: true,
    },
    {
      id: '다음 결제일',
      name: '다음 결제일',
      value: subscribeDto.nextPaymentDate ? formatDate(subscribeDto.nextPaymentDate, 'onlyDate') : '-',
      visible: !isPackageData,
    },
    {
      id: '구독 금액',
      name: '구독 금액',
      value: `${getNextPaymentPrice({
        originPrice: subscribeDto.nextPaymentPrice,
        discountCoupon: subscribeDto.discountCoupon,
        discountGrade: subscribeDto.discountGrade,
        overDiscount: subscribeDto.overDiscount,
      })}원`,
      visible: subscribeDto.status === 'SUBSCRIBING' && !isPackageData,
    },
    {
      id: '패키지 금액',
      name: '패키지 금액',
      value: `${subscribeDto?.packagePrice?.toLocaleString()}원`,
      visible: isPackageData,
    },
    {
      id: '패키지 기간',
      name: '패키지 기간',
      value: `${getPackagePeriod(subscribeDto.startDate, subscribeDto.subscriptionMonth)} (${subscribeDto.shippingLeft}회 남음)`,
      visible: isPackageData,
    },
  ]
  return (
    <div className={styles.subscriptionCard}>
      <Text type='title' size='md' align='left' className={styles.subscriptionName}>
        {subscribeDto.dogName}(이)의 AI 추천 식단
        <Badge color={subscribeDto.status === 'SUBSCRIBING' ? 'redBorder' : undefined}>
          {subscriptionStatus[subscribeDto.status]}
        </Badge>
      </Text>
      {subscribeDto.status === 'SUBSCRIBING' &&
        <Text type='description' size='sm' color='black' className={styles.productionDates}>
          <span className={styles.productionDate}>생산 예정일: {productionDates.productionDate}</span>
          <span>수령 예정일: {productionDates.receivingDate}</span>
        </Text>
      }
      <div className={styles.subscriptionInfo}>
        {subscribeInfoList.map(info => (
          subscriptionDetail.recipeNames && info.visible &&
          <Text type='description' size='sm' color='black' key={info.id}>
            <span className={styles.infoName}>
              - {info.name}:
            </span>
            &nbsp;&nbsp;{info.value}
          </Text>
        ))}
      </div>
      <div className={styles.subscriptionControls}>
        {isPackageData &&
          <div>
            <DefaultButton
              type='blackBorder'
              size='sm'
              linkUrl={`/mypage/subscribe/benefits/${subscribeDto.subscribeId}`}
            >
              패키지 혜택
            </DefaultButton>
          </div>
        }
        <div>
          <DefaultButton
            type='blackBorder'
            size='sm'
          >
            변경 하기
            <span className={inlineBlockSpan}><RightArrowIcon /></span>
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;