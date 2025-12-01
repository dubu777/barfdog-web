import { commonWrapper } from "@/styles/common.css";
import InputField from "@/components/ui/inputField/InputField";
import LabeledCheckbox from "@/components/ui/labeledCheckBox/LabeledCheckBox";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useCallback, useEffect, useMemo, useState } from "react";
import Text from "@/components/ui/text/Text";
import { DeliveryAddress } from "@/types/delivery";
import FooterButton from "@/components/ui/footerButton/FooterButton";
import {
  AddressFormValues,
  addressSchema,
  defaultAddressValues,
} from "@/utils/validation/addressValidation";
import Button from "@/components/ui/button/Button";
import AddressSearchModal from "@/components/domain/address/addressSearchModal/AddressSearchModal";
import useModal from "@/hooks/useModal";
import { useUpdateAddress } from "@/api/address/mutations/useUpdateAddress";
import { useCreateAddress } from "@/api/address/mutations/useCreateAddress";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useEnterFocus } from "@/hooks/common/useEnterFocus";
import { yupResolver } from "@hookform/resolvers/yup";

interface AddressFormProps {
  mode: "edit" | "add";
  address?: DeliveryAddress;
  onBack: () => void;
}

export default function AddressForm({
  mode,
  address,
  onBack,
}: AddressFormProps) {
  const { isOpen, onClose, onToggle: toggleAddressModal } = useModal();

  // mode에 따라 기존 데이터를 채우거나 빈 기본값 사용
  const initialValues = useMemo(
    () =>
      mode === "edit" && address
        ? defaultAddressValues(address)
        : defaultAddressValues(),
    [mode, address]
  );

  const form = useForm<AddressFormValues>({
    resolver: yupResolver(addressSchema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    control,
    formState: { isValid, errors, isDirty },
    setValue,
    handleSubmit,
    trigger,
    register,
    setFocus,
    getFieldState,
  } = form;

  const { bind } = useEnterFocus<AddressFormValues>({
    fieldNames: [
      "deliveryName",
      "recipientName",
      "phoneNumber",
      "detailAddress",
      "request",
    ],
    setFocus,
    getFieldState,
    trigger,
  });

  // 수정 모드일 경우 기존 배송지 id와 기본 배송지 id 비교, 추가 모드면 기본 배송지 선택 false
  const isDefaultAddress =
    mode === "edit" && address ? address.isDefault : false;

  // Mutation hooks
  const { mutate: updateAddress } = useUpdateAddress();
  const { mutate: createAddress } = useCreateAddress();

  // AddressSearchModal 선택 시 값 업데이트
  const handleSelectAddress = useCallback(
    (data: any) => {
      setValue("zipcode", data.zonecode, { shouldValidate: true });
      setValue("city", data.sido, { shouldValidate: true });
      setValue("street", data.roadAddress, { shouldValidate: true });
    },
    [setValue]
  );

  // city와 street을 결합한 주소 문자열
  const [cityValue, streetValue] = useWatch({
    control,
    name: ["city", "street"],
  });
  const combinedAddress = `${cityValue} ${streetValue}`.trim();
  const combinedError = errors.city?.message || errors.street?.message;

  // 폼 제출 처리: onFormSubmit 호출 시 서버 업데이트 후 기본배송지 적용 여부 처리
  const onSubmit = handleSubmit((data: AddressFormValues) => {
    if (mode === "edit" && address) {
      updateAddress({
        addressId: address.id,
        body: data,
      });
      onBack();
    } else if (mode === "add") {
      createAddress(data, {
        onSuccess: () => {
          onBack();
        },
      });
    }
  });

  return (
    <>
      <form
        className={commonWrapper({
          direction: "col",
          align: "center",
          padding: 20,
          gap: 20,
        })}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <InputField
          {...register("deliveryName")}
          label="배송지명"
          isRequired
          placeholder="집, 회사 등"
          maxLength={20}
          error={errors?.deliveryName?.message}
          onKeyUp={bind("deliveryName")}
        />

        <InputField
          {...register("recipientName")}
          label="받는 분"
          isRequired
          placeholder="받는 분 성함"
          maxLength={40}
          error={errors.recipientName?.message}
          onKeyUp={bind("recipientName")}
        />

        <InputField
          {...register("phoneNumber", {
            onChange: (e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setValue("phoneNumber", onlyDigits);
            },
          })}
          type="tel"
          label="연락처"
          isRequired
          placeholder="- 제외 숫자만 입력"
          maxLength={11}
          inputMode="numeric"
          error={errors.phoneNumber?.message}
          onKeyUp={bind("phoneNumber")}
        />

        <div
          className={commonWrapper({
            direction: "col",
            gap: 8,
          })}
        >
          <div
            className={commonWrapper({
              align: "end",
              gap: 8,
            })}
          >
            <InputField
              label="주소검색을 통해 입력"
              variants="box"
              isRequired
              placeholder="주소"
              value={combinedAddress}
              error={combinedError}
              readOnly
              disabled
            />
            <Button
              intent="secondary"
              variant="solid"
              size="lg"
              onClick={toggleAddressModal}
            >
              주소검색
            </Button>
          </div>

          <InputField
            {...register("zipcode")}
            isRequired
            placeholder="우편번호"
            error={errors.zipcode?.message}
            readOnly
            disabled
          />

          <InputField
            {...register("detailAddress")}
            isRequired
            placeholder="상세주소 (최대 50자)"
            maxLength={50}
            error={errors.detailAddress?.message}
            onKeyUp={bind("detailAddress")}
          />
        </div>

        <InputField
          {...register("request")}
          label="배송 요청사항"
          placeholder="공동현관 비밀번호, 수령 장소 등"
          maxLength={50}
          error={errors.request?.message}
          onKeyUp={bind("request")}
        />

        {!isDefaultAddress && (
          <Controller
            name="isDefault"
            control={control}
            render={({ field }) => (
              <LabeledCheckbox
                value={true}
                onToggle={() => field.onChange(!field.value)}
                isChecked={!!field.value}
              >
                <Text type="label2" color="gray700">
                  기본 배송지로 설정
                </Text>
              </LabeledCheckbox>
            )}
          />
        )}

        <FooterButton onClick={onSubmit} isDisabled={!isDirty || !isValid}>
          저장하기
        </FooterButton>
      </form>
      <AddressSearchModal
        isVisible={isOpen}
        onClose={onClose}
        onSelectAddress={handleSelectAddress}
      />
    </>
  );
}
