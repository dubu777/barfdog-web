'use client';
import * as styles from './PackageBenefit.css';
import { useState } from "react";
import Text from "@/components/common/text/Text";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import RadiusSubmitButton from "@/components/common/radiusSubmitButton/RadiusSubmitButton";
import BenefitInfoList from "@/components/pages/mypage/packageBenefit/benefitInfoList/BenefitInfoList";
import { BenefitDto } from "@/types/subscription";

interface BenefitStatusLength {
  diagnosticDevice: number;
  topperRandom: number;
}

export interface BenefitsData {
  available: BenefitStatusLength;
  requested: BenefitStatusLength;
  used: BenefitStatusLength;
  total: BenefitStatusLength;
}

export type BenefitName = 'DIAGNOSTIC_DEVICE' | 'TOPPER_RANDOM';

const PackageBenefit = ({ benefitsResponseData }: { benefitsResponseData: BenefitDto[] }) => {
  const [selectedBenefits, setSelectedBenefits] = useState<number[]>([]);

  const findBenefitItem = (benefitName: BenefitName) => benefitsResponseData.find(benefit => benefit.benefitStatus === 'AVAILABLE' && benefit.benefitName === benefitName) || null;
  const diagnosticDevice: BenefitDto | null = findBenefitItem('DIAGNOSTIC_DEVICE');
  const topperRandom: BenefitDto | null = findBenefitItem('TOPPER_RANDOM');

  const handleSelectBenefit = (benefitId: number) => {
    if (selectedBenefits.includes(benefitId)) {
      setSelectedBenefits(selectedBenefits.filter(id => id !== benefitId));
    } else {
      setSelectedBenefits([...selectedBenefits, benefitId])
    }
  }

  return (
    <section className={styles.benefitsContainer}>
      {!diagnosticDevice && !topperRandom ?
      <div className={styles.noBenefits}>
        <Text type='description' size='md' color='grey' weight='normal'>
          선택 가능한 혜택이 없습니다.
        </Text>
      </div>
        :<>
          <div className={styles.benefitsTitle}>
            <Text type='title' size='md' weight='normal'>이 패키지에 포함된 혜택을 선택해주세요</Text>
            <Text type='description' size='sm' color='red'>혜택 선택 시 다음 출고 시 포함되어 발송됩니다.</Text>
          </div>
          <BenefitInfoList
            benefitsResponseData={benefitsResponseData}
          />
          <div className={styles.benefitsControls}>
            <DefaultCheckbox
              id={diagnosticDevice.benefitName}
              name={diagnosticDevice.benefitName}
              value={selectedBenefits.includes(diagnosticDevice.benefitId)}
              label='진단기기 체험'
              labelPosition='bottom'
              onChange={() => handleSelectBenefit(diagnosticDevice.benefitId)}
            />
            <DefaultCheckbox
              id={topperRandom.benefitName}
              name={topperRandom.benefitName}
              value={selectedBenefits.includes(topperRandom.benefitId)}
              label={`토퍼 발송\n (랜덤)`}
              labelPosition='bottom'
              onChange={() => handleSelectBenefit(topperRandom.benefitId)}
            />
          </div>
          <RadiusSubmitButton
            title='신청하기'
            onClick={() => console.log('submit')}
            disabled={selectedBenefits.length === 0}
          />
        </>
      }
    </section>
  );
};

export default PackageBenefit;