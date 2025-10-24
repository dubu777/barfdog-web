"use client";
import { commonWrapper } from "@/styles/common.css";
import { Controller, useWatch } from "react-hook-form";
import { format } from "date-fns";
import InputField from "@/components/common/inputField/InputField";
import Text from "@/components/common/text/Text";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import MobileDatePicker from "@/components/common/datePicker/mobileDatePicker/MobileDatePicker";
import Divider from "@/components/common/divider/Divider";
import AuthPhoneNumber from "./authPhoneNumber/AuthPhoneNumber";
import Notification from "./notification/Notification";
import useDeviceState from "@/hooks/useDeviceState";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";
import { updateUserInfoSchema, defaultUpdateUserInfoValues } from "@/utils/validation/accountValidation";
import { UserInfo as UserInfoType, UpdateUserInfo } from "@/types/mypage/account";
import { useGetUserInfo } from "@/api/mypage/account/queries/useGetUserInfo";
import { useUpdateUserInfo } from "@/api/mypage/account/mutations/useUpdateUserInfo";

export default function UserInfo() {
  const { data: userInfo } = useGetUserInfo();

  const {
    handleSubmit,
    control,
    errors,
    setValue,
    setError,
    isValid,
    clearErrors,
    dirtyFields,
  } = useFormHandler<UpdateUserInfo>(
    updateUserInfoSchema,
    defaultUpdateUserInfoValues(userInfo as UserInfoType)
  );

  const { mutate } = useUpdateUserInfo();
  const { handleError, handleSuccess } = useApiResponseHandler();

  const { isMobileDevice } = useDeviceState();

  const phoneNumber = useWatch({ control, name: "phoneNumber" });
  const defaultPhoneNumber = useWatch({ control, name: "defaultPhoneNumber" });
  const authToken = useWatch({ control, name: "authToken" });

  const receiveEmail = useWatch({ control, name: "receiveEmail" });
  const receiveSms = useWatch({ control, name: "receiveSms" });

  // 연락처 변경 이후 [인증번호 확인 완료] 여부 확인을 위한 상태값
  const hasCheckedAuthNumber = useWatch({
    control,
    name: "hasCheckedAuthNumber",
  });

  // 최종 form 필수 요소 검증
  const isValidFormValues =
    (phoneNumber !== defaultPhoneNumber ? hasCheckedAuthNumber : true) &&
    isValid;

  const onSubmit = (data: UpdateUserInfo) => {
    const body: UpdateUserInfo = {
      authCode: data.authCode,
      authToken: data.authToken,
      gender: data.gender,
      name: data.name,
      phoneNumber: data.phoneNumber,
      receiveEmail: data?.receiveEmail ?? false,
      receiveSms: data?.receiveSms ?? false,
      birthday: format(new Date(data.birthday), "yyyy-MM-dd"),
    };

    mutate(body, {
      onSuccess: () => {
        handleSuccess("회원 정보가 수정됐습니다", "above-button");
      },
      onError: (error) => {
        handleError(error, "회원 정보 수정에 실패했습니다.", undefined, "above-button");
      },
    });
  };
  return (
    <>
      <Divider thickness={2} color='gray50' />
      <section
        className={commonWrapper({
          direction: "col",
          gap: 20,
          padding: 20,
          align: "start",
          justify: "start",
          minHeight: 'fullWithHeader',
          backgroundColors: 'gray0',
        })}
      >
        <Text type="title4">회원 정보</Text>
        <div
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
                value={field.value}
                onChange={(e) => field.onChange(e)}
                variants="box"
                placeholder="이름을 입력해주세요."
                label="이름"
                error={errors?.name?.message}
                isRequired
              />
            )}
          />
          <AuthPhoneNumber
            authToken={authToken}
            phoneNumber={phoneNumber}
            defaultPhoneNumber={defaultPhoneNumber ?? ""}
            hasCheckedAuthNumber={hasCheckedAuthNumber ?? false}
            control={control}
            errors={errors}
            dirtyFields={dirtyFields as Partial<UpdateUserInfo>}
            setError={setError}
            setValue={setValue}
            clearErrors={clearErrors}
          />
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
              <div className={commonWrapper({ direction: 'col', align: 'start', gap: 8, })}>
                <InputLabel label="성별정보" isRequired />
                <LabeledRadioButtonGroup
                  optionType="radio"
                  onChange={field.onChange}
                  value={field.value}
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
              <div className={commonWrapper({ direction: 'col', align: 'start', gap: 8, })}>
                <InputLabel label="생년월일" isRequired />
                {isMobileDevice ? (
                  <MobileDatePicker
                    value={format(new Date(field.value), "yyyy.MM.dd")}
                    onChange={(date) => field.onChange(date)}
                    isDisabled
                  />
                ) : (
                  <CustomDatePicker
                    name="birthday"
                    value={format(new Date(field.value), "yyyy.MM.dd")}
                    isDisabled
                    onChange={(date) => field.onChange(date)}
                    marginBottom={false}
                  />
                )}
              </div>
            )}
          />
          <Notification
            control={control}
            receiveEmail={receiveEmail ?? false}
            receiveSms={receiveSms ?? false}
            setValue={setValue}
            isMobileDevice={isMobileDevice}
          />
        </div>
      </section>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="저장하기"
        onPrimaryClick={handleSubmit(onSubmit)}
        isPrimaryDisabled={!isValidFormValues}
        position={isMobileDevice ? 'sticky' : 'fixed'}
      />
    </>
  );
}
