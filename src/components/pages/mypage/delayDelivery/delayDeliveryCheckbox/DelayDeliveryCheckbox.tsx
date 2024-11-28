'use client';
import * as styles from "./DelayDeliveryCheckbox.css";
import { useState } from "react";
import AlertModal from "@/components/common/alertModal/AlertModal";
import RadiusSubmitButton from "@/components/common/radiusSubmitButton/RadiusSubmitButton";
import { getProductionDates } from "@/utils/getProductionDates";
import { pointColor } from "@/styles/common.css";
import { PlanKey, subscribePlanInfo } from "@/constants";
import { SubscribeByIdDto, SubscribeSkipType } from "@/types/subscription";
import { DelayListProps } from "../DelayDelivery";
import {useMutation} from "@tanstack/react-query";
import {skipSubscribe} from "@/api/subscribe";
import {useGetSubscribe} from "@/api/queries/useGetSubscribe";

interface DelayDeliveryCheckboxProps {
  selectedDelay: DelayListProps | null;
  setSelectedDelay: (selectedDelay: DelayListProps | null) => void;
  subscribeData: SubscribeByIdDto;
}

const DelayDeliveryCheckbox = ({ subscribeData, selectedDelay, setSelectedDelay }: DelayDeliveryCheckboxProps) => {
  const [finalConfirm, setFinalConfirm] = useState({
    isOpenModal: false,
    checkedInfo: false,
  });
  const [succeedModal, setSucceedModal] = useState<boolean>(false);
  const oneWeekAfterProductionDates = getProductionDates(subscribeData.nextDeliveryDate, 1);
  const onceAfterProductionDates = getProductionDates(subscribeData.nextDeliveryDate, subscribePlanInfo[subscribeData.plan as PlanKey].weeklyPaymentCycle);
  const delayList: DelayListProps[] = [
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

  const { refetch } = useGetSubscribe(subscribeData.id);
  const { mutate } = useMutation({
    mutationFn: ({ skipType }: { skipType: SubscribeSkipType }) => skipSubscribe(subscribeData.id, skipType),
    onSuccess: async (data) => {
      console.log('success', data)
      await setSucceedModal(true);
      await setSelectedDelay(null);
      await setFinalConfirm({
        isOpenModal: false,
        checkedInfo: false,
      });
      await refetch();
    },
    // onError: (error: Error) => {
    //   console.error(error);
    //   if(error.response) {
    //     alert(error.response.data.errors[0].defaultMessage);
    //   }
    // },
  });
  const handleSkipSubscribe = () => {
    if(selectedDelay !== null) {
      mutate({ skipType: selectedDelay.value })
    }
  }

  return (
    <>
    <article className={styles.delayCheckContainer}>
      {delayList.map(item => (
        <button
          key={item.value}
          onClick={() => setSelectedDelay(item)}
          className={styles.delayCheckButton({ active: selectedDelay?.value === item.value })}
        >
          <p className={styles.cycleTitle({ active: selectedDelay?.value === item.value })}>{item.name} 미루기</p>
          <p className={styles.delayDate}>생산 예정일<br/>{item.productionDate}</p>
          <p className={styles.delayDate}>수령 예정일<br/>{item.receivingDate}</p>
        </button>
      ))}
    </article>
    <RadiusSubmitButton
      title={!finalConfirm.checkedInfo ? '변경 하기' : '최종 저장'}
      onClick={() => 
        !finalConfirm.checkedInfo 
        ? setFinalConfirm({...finalConfirm, isOpenModal: true}) 
        : handleSkipSubscribe()
      }
      disabled={selectedDelay === null}
    />
    <AlertModal
      isOpen={finalConfirm.isOpenModal}
      onClose={() => setFinalConfirm({...finalConfirm, isOpenModal: false})}
      onConfirm={() => setFinalConfirm({isOpenModal: false, checkedInfo: true})}
      message={
        <div className={styles.delayInfoModal}>
          <b>{selectedDelay?.name} 미루기</b>를 선택하셨습니다.<br/>
          구독 일정을 {selectedDelay?.value === 'WEEK' ? '7일' : '1회'} 미뤄<br/>
          <span className={pointColor}>{selectedDelay?.receivingDate}</span><br/>
          수령 예정입니다.<br/>
          이대로 변경하시겠습니까?
        </div>
      }
    />
    <AlertModal
      isAutoClose
      isOpen={succeedModal}
      onClose={() => setSucceedModal(false)}
      message='배송이 성공적으로 미뤄졌습니다!'
    />
    </>
  );
};

export default DelayDeliveryCheckbox;