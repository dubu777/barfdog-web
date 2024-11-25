import * as styles from './BenefitInfoList.css';
import Text from "@/components/common/text/Text";
import { DefaultObjectType } from "@/types/common";
import { BenefitDto } from "@/types/subscription";
import { BenefitName, BenefitsData } from "@/components/pages/mypage/packageBenefit/PackageBenefit";

type BenefitStatus = 'AVAILABLE' | 'REQUESTED' | 'USED';

const BenefitInfoList = ({ benefitsResponseData }: { benefitsResponseData: BenefitDto[] }) => {
  const findBenefitByStatus = (status: BenefitStatus | null, benefitName: BenefitName, isTotal = false) => {
    return benefitsResponseData.filter(
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
      name: '남은 횟수',
      value: {
        diagnosticDevice: `( ${benefitsData.available.diagnosticDevice} / ${benefitsData.total.diagnosticDevice}회 )`,
        topperRandom: `( ${benefitsData.available.topperRandom} / ${benefitsData.total.topperRandom}회 )`,
      },
    },
    {
      name: '신청 대기중',
      value: {
        diagnosticDevice: `${benefitsData.requested.diagnosticDevice} 회`,
        topperRandom: `${benefitsData.requested.topperRandom} 회`,
      },
    },
    {
      name: '신청 완료',
      value: {
        diagnosticDevice: `${benefitsData.used.diagnosticDevice} 회`,
        topperRandom: `${benefitsData.used.topperRandom} 회`,
      },
    },
  ]

  return (
    <article className={styles.benefitsBox}>
      {benefitContentList.map((benefit, index) => (
        <div key={benefit.name}>
          <Text type='description' size='md' color='black'>{benefit.name}</Text>
          <ul className={styles.benefitItemInfo}>
            <Text type='description' size='sm' color='black'>
              진단기기{index !== 0 && ':'} {benefit.value.diagnosticDevice}
            </Text>
            <Text type='description' size='sm' color='black'>
              토퍼{index !== 0 && ':'} {benefit.value.topperRandom}
            </Text>
          </ul>
        </div>
      ))}
    </article>
  );
};

export default BenefitInfoList;