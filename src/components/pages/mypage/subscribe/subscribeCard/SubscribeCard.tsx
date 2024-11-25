import * as styles from './SubscribeCard.css';
import { inlineBlockSpan } from "@/styles/common.css";
import RightArrowIcon from "/public/images/icons/right-arrow-black.svg";
import Text from "@/components/common/text/Text";
import Badge from "@/components/common/badge/Badge";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { subscribePlanInfo, subscribeStatus } from "@/constants";
import { formatDate } from "@/utils/dateUtils";
import { getProductionDates } from "@/utils/getProductionDates";
import { getNextPaymentPrice } from "@/utils/getNextPaymentPrice";
import { getPackagePeriod } from "@/utils/getPackagePeriod";
import { ManageSubscribeData } from "@/types/subscription";
import { DefaultObjectType } from "@/types/common";

const SubscribeCard = ({ subscribeData }: { subscribeData: ManageSubscribeData }) => {
  const { subscribeDto: data } = subscribeData;
  const isPackageData = !!data.subscriptionMonth && data.packagePrice !== -1;
  const productionDates = getProductionDates(subscribeData.nextDeliveryDate);
  console.log(data)

  const subscribeInfoList: DefaultObjectType[] = [
    {
      name: '현재 패키지',
      value: `${data.subscriptionMonth}개월`,
      visible: isPackageData,
    },
    {
      name: '현재 플랜',
      value: subscribePlanInfo[data?.plan]?.label || '-',
      visible: true,
    },
    {
      name: '현재 레시피',
      value: subscribeData.recipeNames,
      visible: true,
    },
    {
      name: '다음 결제일',
      value: data.nextPaymentDate ? formatDate(data.nextPaymentDate, 'onlyDate') : '-',
      visible: !isPackageData,
    },
    {
      name: '구독 금액',
      value: `${getNextPaymentPrice({
        originPrice: data.nextPaymentPrice,
        discountCoupon: data.discountCoupon,
        discountGrade: data.discountGrade,
        overDiscount: data.overDiscount,
      })}원`,
      visible: data.status === 'SUBSCRIBING' && !isPackageData,
    },
    {
      name: '패키지 금액',
      value: `${data?.packagePrice?.toLocaleString()}원`,
      visible: isPackageData,
    },
    {
      name: '패키지 기간',
      value: `${getPackagePeriod(data.startDate, data.subscriptionMonth)} (${data.shippingLeft}회 남음)`,
      visible: isPackageData,
    },
  ]
  return (
    <div className={styles.subscribeCard}>
      <Text type='title' size='md' align='left' className={styles.subscribeName}>
        {data.dogName}(이)의 AI 추천 식단
        <Badge color={data.status === 'SUBSCRIBING' && 'red'}>
          {subscribeStatus[data.status]}
        </Badge>
      </Text>
      {data.status === 'SUBSCRIBING' &&
        <Text type='description' size='sm' color='black' className={styles.productionDates}>
          <span className={styles.productionDate}>생산 예정일: {productionDates.productionDate}</span>
          <span>수령 예정일: {productionDates.receivingDate}</span>
        </Text>
      }
      <div className={styles.subscribeInfo}>
        {subscribeInfoList.map(info => (
          subscribeData.recipeNames && info.visible &&
          <Text type='description' size='sm' color='black' key={info.name}>
            <span className={styles.infoName}>
              - {info.name}:
            </span>
            &nbsp;&nbsp;{info.value}
          </Text>
        ))}
      </div>
      <div className={styles.subscribeControls}>
        {isPackageData &&
          <div className={styles.packageButton}>
            <DefaultButton
              type='blackBorder'
              size='sm'
              linkUrl={`/mypage/subscribe/packageBenefit/${data.subscribeId}`}
            >
              패키지 혜택
            </DefaultButton>
          </div>
        }
        <div className={styles.packageButton}>
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

export default SubscribeCard;