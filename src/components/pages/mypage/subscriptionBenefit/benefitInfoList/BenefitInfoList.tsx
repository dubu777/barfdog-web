import * as styles from './BenefitInfoList.css';
import Text from "@/components/common/text/Text";
import { DefaultObjectType } from "@/types/common";
import { BenefitDto, BenefitStatus } from "@/types/subscription";
import { BenefitName, BenefitsData } from "@/components/pages/mypage/subscriptionBenefit/SubscriptionBenefit";

const BenefitInfoList = ({ subscriptionBenefits }: { subscriptionBenefits: BenefitDto[] }) => {
  const findBenefitByStatus = (status: BenefitStatus | null, benefitName: BenefitName, isTotal = false) => {
    return subscriptionBenefits.filter(
      benefit =>
        isTotal
          ? benefit.benefitName === benefitName
          : benefit.benefitStatus === status && benefit.benefitName === benefitName
    )
  };

  const benefitsData: BenefitsData = {
    available: {
      diagnosticDevice: findBenefitByStatus('AVAILABLE', 'DIAGNOSTIC_DEVICE').length,
      topperRandom: findBenefitByStatus('AVAILABLE', 'TOPPER_RANDOM').length,
    },
    requested: {
      diagnosticDevice: findBenefitByStatus('REQUESTED', 'DIAGNOSTIC_DEVICE').length,
      topperRandom: findBenefitByStatus('REQUESTED', 'TOPPER_RANDOM').length,
    },
    used: {
      diagnosticDevice: findBenefitByStatus('USED', 'DIAGNOSTIC_DEVICE').length,
      topperRandom: findBenefitByStatus('USED', 'TOPPER_RANDOM').length,
    },
    total: {
      diagnosticDevice: findBenefitByStatus(null, 'DIAGNOSTIC_DEVICE', true).length,
      topperRandom: findBenefitByStatus(null, 'TOPPER_RANDOM', true).length,
    }
  }

  const benefitContentList: DefaultObjectType[] = [
    {
      id: '남은 횟수',
      name: '남은 횟수',
      value: `
        진단기기 ( ${benefitsData.available.diagnosticDevice} / ${benefitsData.total.diagnosticDevice}회 ) \n
        토퍼 ( ${benefitsData.available.topperRandom} / ${benefitsData.total.topperRandom}회 )
      `,
    },
    {
      id: '신청 대기중',
      name: '신청 대기중',
      value: `
        진단기기: ${benefitsData.requested.diagnosticDevice} 회 \n
        토퍼: ${benefitsData.requested.topperRandom} 회
      `,
    },
    {
      id: '신청 완료',
      name: '신청 완료',
      value: `
        진단기기: ${benefitsData.used.diagnosticDevice} 회 \n
        토퍼: ${benefitsData.used.topperRandom} 회
      `,
    },
  ]

  return (
    <article className={styles.benefitsBox}>
      {benefitContentList.map((benefit) => (
        <div key={benefit.id} className={styles.benefitItem}>
          <Text type='description' size='md' color='black'>{benefit.name}</Text>
            <p className={styles.benefitItemInfo}>{benefit?.value}</p>
        </div>
      ))}
    </article>
  );
};

export default BenefitInfoList;