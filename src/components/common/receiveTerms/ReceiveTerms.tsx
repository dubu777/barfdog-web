"use client";
import * as styles from "./ReceiveTerms.css";
import { useEffect } from "react";
import TestText from "@/components/common/testText/TestText";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import {
  Control,
  Controller,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { UpdateUserInfo } from "@/types/mypage/account";
import { SignupStepValues } from "@/types";

type FormValues<T extends boolean> = T extends true
  ? SignupStepValues
  : UpdateUserInfo;

interface ReceiveTermsProps<T extends boolean> {
  isSignUp?: T;
  control: Control<FormValues<T>>;
  setValue: UseFormSetValue<FormValues<T>>;
  watch: UseFormWatch<FormValues<T>>;
  isReceiveAllChecked: boolean;
  setIsReceiveAllChecked: (isReceiveAllChecked: boolean) => void;
}

const ReceiveTerms = <T extends boolean>({
  isSignUp,
  control,
  watch,
  setValue,
  isReceiveAllChecked,
  setIsReceiveAllChecked,
}: ReceiveTermsProps<T>) => {
  const receiveSms = isSignUp
    ? watch("agreement.receiveSms" as Path<FormValues<T>>)
    : watch("receiveSms" as Path<FormValues<T>>);
  const receiveEmail = isSignUp
    ? watch("agreement.receiveEmail" as Path<FormValues<T>>)
    : watch("receiveEmail" as Path<FormValues<T>>);

  const receiveChecked = Object.values({
    receiveSms: receiveSms,
    receiveEmail: receiveEmail,
  }).every((value) => value === true);

  useEffect(() => {
    setIsReceiveAllChecked(receiveChecked);
  }, [receiveChecked, setIsReceiveAllChecked]);

  const handleAllReceiveChange = (checked: boolean) => {
    setIsReceiveAllChecked(checked);
    if (isSignUp) {
      const currentAgreement = watch(
        "agreement" as Path<FormValues<T>>
      ) as FormValues<T>;
      setValue(
        "agreement" as Path<FormValues<T>>,
        {
          ...currentAgreement,
          receiveSms: checked,
          receiveEmail: checked,
        } as PathValue<FormValues<T>, Path<FormValues<T>>>
      );
    } else {
      setValue(
        "receiveSms" as Path<FormValues<T>>,
        checked as PathValue<FormValues<T>, Path<FormValues<T>>>
      );
      setValue(
        "receiveEmail" as Path<FormValues<T>>,
        checked as PathValue<FormValues<T>, Path<FormValues<T>>>
      );
    }
  };

  return (
    <div className={styles.receiveList}>
      <DefaultCheckbox
        id="receiveAll"
        name="receiveAll"
        label="무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)"
        labelPosition="right"
        value={isReceiveAllChecked}
        onChange={(value) => handleAllReceiveChange(value as boolean)}
      />
      <div className={styles.receiveAgreement}>
        <Controller
          name={
            isSignUp
              ? ("agreement.receiveSms" as Path<FormValues<T>>)
              : ("receiveSms" as Path<FormValues<T>>)
          }
          control={control}
          render={({ field }) => (
            <DefaultCheckbox
              {...field}
              id={isSignUp ? "agreement.receiveSms" : "receiveSms"}
              label="SMS"
              name={isSignUp ? "agreement.receiveSms" : "receiveSms"}
              value={!!field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name={
            isSignUp
              ? ("agreement.receiveEmail" as Path<FormValues<T>>)
              : ("receiveEmail" as Path<FormValues<T>>)
          }
          control={control}
          render={({ field }) => (
            <DefaultCheckbox
              {...field}
              id={isSignUp ? "agreement.receiveEmail" : "receiveEmail"}
              name={isSignUp ? "agreement.receiveSms" : "receiveSms"}
              label="이메일"
              value={!!field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div className={styles.receiveAgreementInfo}>
        <TestText type="description" size="sm" color="red">
          ㄴ 모두 동의 시 적립금 1,000원 적립 (첫 구매확정 후 적용)
        </TestText>
      </div>
    </div>
  );
};

export default ReceiveTerms;
