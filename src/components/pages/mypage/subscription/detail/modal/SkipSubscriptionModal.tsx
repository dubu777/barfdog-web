import { commonWrapper } from "@/styles/common.css";
import { skipSubscriptionCard } from "./SubscriptionModal.css";
import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import DeliveryImage from "public/images/mypage/delivery.svg";
import Card from "@/components/ui/card/Card";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import Text from "@/components/ui/text/Text";
import InfoText from "@/components/ui/typography/infoText/InfoText";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import LabeledRadioButton from "@/components/ui/labeledRadioButton/LabeledRadioButton";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import { PlanKey } from "@/types";
import { SkipType } from "@/types/mypage/subscription";
import { subscriptionPlanInfo } from "@/constants";
import { SKIP_SUBSCRIPTION_TYPE } from "@/constants/mypage/subscription";
import { calcChangedSubscribeDeliveryDate } from "@/utils/mypage/subscription/subscriptionSkip";
import LabelValueItem from "@/components/ui/labelValueItem/LabelValueItem";

interface SkipSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextDeliveryDate: string;
  plan: PlanKey;
  openSkipSubscriptionConfirmModal: () => void;
}

export default function SkipSubscriptionModal({ 
  isOpen, 
  onClose,
  nextDeliveryDate,
  plan,
  openSkipSubscriptionConfirmModal,
}: SkipSubscriptionModalProps) {
  const weeklyPaymentCycle = subscriptionPlanInfo[plan].weeklyPaymentCycle;
  const infoList = [
    '주문 마감 시간: 목요일 오후 11시 59분',
    '주문 후 제작: 금~일요일에 조리하여 발송',
    '배송일자 지정은 불가능합니다',
    '화요일이 휴일인 경우 수요일에 발송됩니다',
  ]
  const [skipType, setSkipType] = useState<SkipType>('WEEK');
  const skipTypeList = Object.entries(SKIP_SUBSCRIPTION_TYPE).map(([key, value]) => ({
    label: value.title,
    description: value.description,
    value: key,
  }));
  
  return (
    <FullModalWrapper 
      isVisible={isOpen} 
      handleGoBack={onClose}
      headerTitle="구독 건너뛰기"
    >
      <div className={commonWrapper({ 
        minHeight: 'fullWithHeader', 
        backgroundColors: 'gray0',
        direction: 'col', 
        justify: 'start', gap: 20 
      })}>
        <div className={commonWrapper({
          backgroundColors: 'gray50',
          direction: 'col',
          justify: 'start',
          padding: '40/20',
          gap: 20,
        })}>
          <div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
            <Text type="title2">구독을 잠시 쉬고 싶으신가요?</Text>
            <Text type="body2" color='gray600'>건너뛰기 주기를 선택해 주세요</Text>
          </div>
          <Card
            borderRadius={8}
            padding='16/12'
            direction='col'
            gap={8}
            align='start'
            shadow='none'
            className={skipSubscriptionCard}
          >
            <LabelValueItem
              label="기존 발송 예정일"
              value={format(new Date(nextDeliveryDate), 'yyyy-MM-dd (EEE)', { locale: ko })}
              labelType='body2'
              labelColor='gray700'
              valueType="label1"
              valueColor='gray900'
              justify='between'
              labelWidth='auto'
            />
            <LabelValueItem
              label="변경 발송 예정일"
              value={
                format(
                  new Date(
                    calcChangedSubscribeDeliveryDate(
                      nextDeliveryDate, 
                      skipType, 
                      weeklyPaymentCycle
                    )
                  ), 
                  'yyyy-MM-dd (EEE)', 
                  { locale: ko }
                )
              }
              labelType='body2'
              labelColor='gray700'
              valueType="label1"
              valueColor='red'
              justify='between'
              labelWidth='auto'
            />
          </Card>
          <div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
            {skipTypeList.map((item) => (
              <Card 
                key={item.value} 
                borderRadius={8}
                padding='16/12'
                align='start'
              >
                <LabeledRadioButton 
                  value={item.value as SkipType} 
                  isChecked={skipType === item.value} 
                  onToggle={setSkipType}
                  >
                    <div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
                      <Text type="label1">{item.label} 건너뛰기</Text>
                      <Text type="caption2" color='gray700'>{item.description}</Text>
                    </div>
                </LabeledRadioButton>
              </Card>
            ))}
          </div>
        </div>
        <div className={commonWrapper({
          direction: 'col',
          padding: '40/20',
          gap: 16,
        })}>
          <div className={commonWrapper({ direction: 'col' })}>
            <Text type="title4">신선함을 위한 배송시스템</Text>
            <span>
              <Text type="body2">주문 전 </Text>
              <Text type="body2" underLine>반드시 배송 일정</Text>
              <Text type="body2">을 확인하세요!</Text>
            </span>
          </div>
          <SvgIcon src={DeliveryImage} width={355} height={279} />
          <Card
            backgroundColor='gray50'
            borderRadius={8}
            padding={12}
            direction='col'
            gap={8}
            align='start'
            shadow='none'
            className={skipSubscriptionCard}
          >
            <span>
              <Text type='headline4'>주문 후 배송 완료까지 </Text>
              <Text type='headline4' underLine>최대 7~14일 정도 소요</Text>
              <Text type='headline4'>될 수 있으니 여유를 두고 주문해주세요</Text>
            </span>
            <div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
              {infoList.map((info) => (
                <InfoText key={info} text={info} />
              ))}
            </div>
          </Card>
        </div>
      </div>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="건너뛰기 적용하기"
        onPrimaryClick={openSkipSubscriptionConfirmModal}
        position='sticky'
      />
    </FullModalWrapper>
  );
}