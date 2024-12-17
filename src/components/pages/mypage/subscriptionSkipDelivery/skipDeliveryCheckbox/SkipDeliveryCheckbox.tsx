'use client';
import * as styles from "./SkipDeliveryCheckbox.css";
import { useState } from "react";
import AlertModal from "@/components/common/alertModal/AlertModal";
import RadiusSubmitButton from "@/components/common/radiusSubmitButton/RadiusSubmitButton";
import { getProductionDates } from "@/utils/getProductionDates";
import { pointColor } from "@/styles/common.css";
import { subscriptionPlanInfo } from "@/constants";
import { PlanKey, SubscriptionDetailDto } from "@/types";
import { SkipListProps } from "../SubscriptionSkipDelivery";
import { useSkipSubscription } from "@/api/subscription/mutations/useSkipSubscription";
import { useToastStore } from "@/store/useToastStore";

interface SkipDeliveryCheckboxProps {
  selectedSkip: SkipListProps | null;
  setSelectedSkip: (selectedSkip: SkipListProps | null) => void;
  subscriptionDetail: SubscriptionDetailDto;
}

const SkipDeliveryCheckbox = ({ subscriptionDetail, selectedSkip, setSelectedSkip }: SkipDeliveryCheckboxProps) => {
  const [finalConfirm, setFinalConfirm] = useState({
    isOpenModal: false,
    checkedInfo: false,
  });
  const oneWeekAfterProductionDates = getProductionDates(subscriptionDetail.nextDeliveryDate, 1);
  const onceAfterProductionDates = getProductionDates(subscriptionDetail.nextDeliveryDate, subscriptionPlanInfo[subscriptionDetail.plan as PlanKey].weeklyPaymentCycle);
  const skipList: SkipListProps[] = [
    {
      value: 'WEEK',
      name: '1주',
      productionDate: oneWeekAfterProductionDates.productionDate ?? '-',
      receivingDate: oneWeekAfterProductionDates.receivingDate ?? '-',
    },
    {
      value: 'ONCE',
      name: '1회',
      productionDate: onceAfterProductionDates.productionDate ?? '-',
      receivingDate: onceAfterProductionDates.receivingDate ?? '-',
    },
  ]
  const { addToast } = useToastStore();
  const { mutate } = useSkipSubscription(subscriptionDetail.id);
  const handleSkipSubscription = () => {
    if(selectedSkip !== null) {
      mutate(
        { skipType: selectedSkip.value },
        {
          onSuccess: () => {
            addToast('배송이 성공적으로 미뤄졌습니다!', 'success')

            setSelectedSkip(null);
            setFinalConfirm({
              isOpenModal: false,
              checkedInfo: false,
            });
          }
        }
      )
    }
  }
  return (
    <>
    <article className={styles.skipCheckContainer}>
      {skipList.map(item => (
        <button
          key={item.value}
          onClick={() => setSelectedSkip(item)}
          className={styles.skipCheckButton({ active: selectedSkip?.value === item.value })}
        >
          <p className={styles.cycleTitle({ active: selectedSkip?.value === item.value })}>{item.name} 미루기</p>
          <p className={styles.skipDate}>생산 예정일<br/>{item.productionDate}</p>
          <p className={styles.skipDate}>수령 예정일<br/>{item.receivingDate}</p>
        </button>
      ))}
    </article>
    <RadiusSubmitButton
      title={!finalConfirm.checkedInfo ? '변경 하기' : '최종 저장'}
      onClick={() => 
        !finalConfirm.checkedInfo 
        ? setFinalConfirm({...finalConfirm, isOpenModal: true}) 
        : handleSkipSubscription()
      }
      disabled={selectedSkip === null}
    />
    <AlertModal
      isOpen={finalConfirm.isOpenModal}
      onClose={() => setFinalConfirm({...finalConfirm, isOpenModal: false})}
      onConfirm={() => setFinalConfirm({isOpenModal: false, checkedInfo: true})}
      message={
        <div className={styles.skipInfoModal}>
          <b>{selectedSkip?.name} 미루기</b>를 선택하셨습니다.<br/>
          구독 일정을 {selectedSkip?.value === 'WEEK' ? '7일' : '1회'} 미뤄<br/>
          <span className={pointColor}>{selectedSkip?.receivingDate}</span><br/>
          수령 예정입니다.<br/>
          이대로 변경하시겠습니까?
        </div>
      }
    />
    </>
  );
};

export default SkipDeliveryCheckbox;