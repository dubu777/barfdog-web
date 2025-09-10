"use client";
import { commonWrapper } from "@/styles/common.css";
import { ChangeEvent, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import axios from "axios";
import InputField from "@/components/common/inputField/InputField";
import Text from "@/components/common/text/Text";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import MobileDatePicker from "@/components/common/datePicker/mobileDatePicker/MobileDatePicker";
import useDeviceState from "@/hooks/useDeviceState";
import { formatDate, formatPhoneNumber } from "@/utils";
import { useToastStore } from "@/store/useToastStore";
import { useFormHandler } from "@/hooks/useFormHandler";
import { UserInfo as UserInfoType, UserInfoFormValues } from "@/types/auth";
import {
  defaultUpdateUserInfoValues,
  updateUserInfoSchema,
} from "@/utils/validation/auth/auth";
import { useGetUserInfo } from "@/api/auth/queries/useGetUserInfo";
import { useUpdateUserInfo } from "@/api/auth/mutations/useUpdateUserInfo";
import { useGetAuthNumber } from "@/api/auth/mutations/useGetAuthNumber";

export default function UserInfo() {
  const { data: userInfo } = useGetUserInfo();

  const {
    handleSubmit,
    control,
    getValues,
    errors,
    setValue,
    setError,
    isValid,
    clearErrors,
    dirtyFields,
  } = useFormHandler<UserInfoFormValues>(
    updateUserInfoSchema,
    defaultUpdateUserInfoValues(userInfo as UserInfoType)
  );

  const [changedPhoneNumber, setChangedPhoneNumber] = useState<boolean>(false);
  const [authNumber, setAuthNumber] = useState<string>("");

  const { mutate } = useUpdateUserInfo();
  const { mutate: mutateAuthNumber } = useGetAuthNumber();

  const { addToast } = useToastStore();
  const { isMobileDevice } = useDeviceState();

  const phoneNumber = useWatch({ control, name: "phoneNumber" });
  const defaultPhoneNumber = useWatch({ control, name: "defaultPhoneNumber" });

  console.log(userInfo);
  // console.log('phoneNumber', phoneNumber)
  // console.log('defaultPhoneNumber', defaultPhoneNumber)

  // 연락처 변경 X
  const keepCurrentPhoneNumber =
    !changedPhoneNumber || phoneNumber === defaultPhoneNumber;
  // 연락처 변경 O -> 인증번호 확인 완료 확인을 위한 상태값
  const hasCheckedAuthNumber = useWatch({
    control,
    name: "hasCheckedAuthNumber",
  });
  // 최종 form 필수 요소 검증
  const isValidFormValues =
    (phoneNumber !== defaultPhoneNumber ? hasCheckedAuthNumber : true) &&
    isValid;

  // 연락처 input change
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 연락처 변경시 기존 연락처와 같을 경우 인증번호 입력 요소 제외
    if (value === defaultPhoneNumber) {
      setValue("authNumber", "");
      clearErrors("authNumber");
      setAuthNumber("");
    }
    // 연락처 변경시 입력창을 모두 지우게 될 경우 기존 연락처로 적용
    if (value === "") {
      setValue("phoneNumber", getValues("defaultPhoneNumber") as string);
      setChangedPhoneNumber(false);
    } else {
      setChangedPhoneNumber(true);
    }
  };

  // 연락처 변경 및 확인 로직
  const handlePhoneNumberConfirm = () => {
    // 연락처 변경 버튼 클릭시 인증번호, 인증번호 확인 상태 상태값 초기화 (다른번호로 재시도 할 경우 대비)
    setValue("hasCheckedAuthNumber", false);
    setValue("authNumber", "");
    clearErrors("authNumber");
    setAuthNumber("");

    const isPhoneNumberUnchangedOrNotVerified =
      !dirtyFields.phoneNumber ||
      (keepCurrentPhoneNumber && !getValues("hasCheckedAuthNumber"));

    if (isPhoneNumberUnchangedOrNotVerified) {
      // 연락처 변경 필드 초기화 및 입력 버튼 변경
      setValue("phoneNumber", "");
      setChangedPhoneNumber(true);
    } else {
      // 인증번호 발송을 위한 Mutation 적용 및 인증번호 필드 초기화
      setValue("authNumber", "");
      mutateAuthNumber(
        { phoneNumber: getValues("phoneNumber") as string },
        {
          onSuccess: (data) => {
            // 다이렉트센드 에서 받아오는 데이터 형태로 msg null 값이어야 성공
            setAuthNumber(data.authNumber as string);
            if (
              data.authNumber &&
              data.responseCode === 200 &&
              data.msg === null
            ) {
              setAuthNumber(data.authNumber);
              addToast("인증번호가 발송되었습니다!", "above-button");
              setError("authNumber", { message: "인증번호를 입력해주세요" });
            }
          },
          onError: (errorResponse) => {
            if (axios.isAxiosError(errorResponse)) {
              const error = errorResponse.response?.data;
              const errorMessage =
                error?.errors[0].defaultMessage || "연락처를 확인해주세요";
              setError("phoneNumber", { message: errorMessage });
            }
          },
        }
      );
    }
  };

  // 인증번호 확인 로직
  const handleCheckAuthNumber = (value: string) => {
    if (!authNumber || !value) return;

    // 인증번호 확인 검증은 발급받은 인증번호를 상태값에 저장 후 비교
    if (value === authNumber) {
      addToast("인증 되었습니다!", "above-button");

      // 인증번호 상태값 성공처리 및 인증번호 필드값 초기화
      setValue("hasCheckedAuthNumber", true);
      clearErrors?.("authNumber");
      setAuthNumber("");
      setChangedPhoneNumber(false);
    } else {
      setError("authNumber", { message: "인증번호를 확인해주세요" });
    }
  };

  const onSubmit = (data: UserInfoFormValues) => {
    // email 제외, birthday format(2000-01-01 -> 20000101)
    const body: UserInfoFormValues = {
      address: userInfo?.address ?? {
        zipcode: "",
        city: "",
        street: "",
        detailAddress: "",
      },
      gender: data.gender,
      name: data.name,
      password: "test",
      phoneNumber: data.phoneNumber,
      receiveEmail: userInfo?.receiveEmail ?? false,
      receiveSms: userInfo?.receiveSms ?? false,
      birthday: data.birthday.replace(/\./g, ""), // "." 제거
    };

    console.log("userInfo", userInfo);
    console.log("data", data);
    console.log("body", body);

    mutate(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
          addToast("회원 정보가 수정되었습니다!", "above-button");
          setValue("password", "");
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorData =
            error.response?.data?.errors[0]?.defaultMessage ||
            "회원 정보 수정에 실패했습니다.";
          if (errorData) {
            addToast(errorData, "above-button");
            setValue("password", "");
          }
        }
      },
    });
  };
  return (
    <section
      className={commonWrapper({
        direction: "col",
        gap: 20,
        padding: 20,
        align: "start",
      })}
    >
      <Text type="title4">회원 정보</Text>
      <form
        className={commonWrapper({
          direction: "col",
          gap: 20,
          align: "start",
        })}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              variants="box"
              placeholder="이름을 입력해주세요."
              label="이름"
              error={errors?.name?.message}
              isRequired
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              value={
                keepCurrentPhoneNumber
                  ? formatPhoneNumber(getValues("phoneNumber"))
                  : field.value
              }
              onSubmit={handlePhoneNumberConfirm}
              onChange={(e) => {
                field.onChange(e);
                handlePhoneNumberChange(e);
              }}
              onReset={() => setValue("phoneNumber", "")}
              confirmButton
              confirmButtonText={
                !keepCurrentPhoneNumber
                  ? authNumber && changedPhoneNumber
                    ? "재전송"
                    : "인증번호"
                  : "번호변경"
              }
              confirmButtonDisabled={!phoneNumber}
              clearButton
              placeholder="번호만 입력해주세요"
              label="휴대폰 번호"
              isRequired
              disabled={keepCurrentPhoneNumber}
              error={errors?.phoneNumber?.message}
            />
          )}
        />
        {authNumber && changedPhoneNumber && (
          <Controller
            name="authNumber"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                value={field.value as string}
                onSubmit={() => handleCheckAuthNumber(field.value as string)}
                error={errors?.authNumber?.message}
                confirmButton
                confirmButtonText="확인"
                confirmButtonDisabled={!field.value}
                placeholder="인증번호를 입력해주세요"
              />
            )}
          />
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField {...field} disabled label="이메일" isRequired />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div>
              <InputLabel label="성별정보" isRequired />
              <LabeledRadioButtonGroup
                optionType="radio"
                onChange={field.onChange}
                value={field.value as string}
                options={[
                  { label: "남자", value: "MALE" },
                  { label: "여자", value: "FEMALE" },
                  { label: "선택안함", value: "NONE" },
                ]}
              />
            </div>
          )}
        />
        <Controller
          name="birthday"
          control={control}
          render={({ field }) => (
            <>
              {isMobileDevice ? (
                <MobileDatePicker
                  value={formatDate(field.value, "onlyDateDot")}
                  onChange={(date) => field.onChange(date)}
                  label="생년월일"
                  isRequired
                />
              ) : (
                <CustomDatePicker
                  name="birthday"
                  value={formatDate(field.value, "onlyDateDot")}
                  onChange={(date) => {
                    console.log(date);
                    field.onChange(date);
                  }}
                />
              )}
            </>
          )}
        />
      </form>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="저장하기"
        onPrimaryClick={handleSubmit(onSubmit)}
        isPrimaryDisabled={!isValidFormValues}
      />
    </section>
  );
}
