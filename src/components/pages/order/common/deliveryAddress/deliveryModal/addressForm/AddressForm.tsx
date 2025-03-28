import InputField from "@/components/common/inputField/InputField";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useEffect, useState } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { AddressRequest, AddressResponse } from "@/types/delivery";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { useFormHandler } from "@/hooks/useFormHandler";
import {
  addressSchema,
  defaultAddressValues,
} from "@/utils/validation/addressValidation";
import { Controller } from "react-hook-form";
import * as styles from "./AddressForm.css";
import Button from "@/components/common/button/Button";
import AddressSearchModal from "@/components/common/addressSearchModal/AddressSearchModal";
import useModal from "@/hooks/useModal";
import { useUpdateAddress } from "@/api/address/mutations/useUpdateAddress";
import { useCreateAddress } from "@/api/address/mutations/useCreateAddress";

interface AddressFormProps {
  mode: "edit" | "add";
  address?: AddressResponse;
  onBack: () => void;
}

export default function AddressForm({
  mode,
  address,
  onBack,
}: AddressFormProps) {
  const { isOpen, onClose, onToggle: toggleAddressModal } = useModal();
  const [pendingDefault, setPendingDefault] = useState<boolean>(false);
  // mode에 따라 기존 데이터를 채우거나 빈 기본값 사용
  const initialValues =
    mode === "edit" && address
      ? defaultAddressValues(address)
      : defaultAddressValues();

  const { control, watch, errors, setValue, handleSubmit, isValid, trigger } =
    useFormHandler<AddressRequest>(addressSchema, initialValues, "onBlur");

  // 수정 모드일 경우 기존 배송지 id와 기본 배송지 id 비교, 추가 모드면 기본 배송지 선택 false
  const isDefaultAddress =
    mode === "edit" && address ? address.default : false;

  const { onToggle: onToggleDefault, isSelected: isDefaultSelected } =
    useToggleOption<boolean>(pendingDefault, "checkbox", setPendingDefault);

  // Mutation hooks
  const { mutate: updateAddress } = useUpdateAddress();
  const { mutate: createAddress } = useCreateAddress();

  // AddressSearchModal 선택 시 값 업데이트
  const handleSelectAddress = (data: any) => {
    setValue("zipcode", data.zonecode);
    setValue("city", data.sido);
    setValue("street", data.roadAddress);
    trigger(["zipcode", "city", "street"]);
  };

  // city와 street을 결합한 주소 문자열
  const cityValue = watch("city");
  const streetValue = watch("street");
  const combinedAddress = `${cityValue} ${streetValue}`.trim();
  const combinedError = errors.city?.message || errors.street?.message;

  // 폼 제출 처리: onFormSubmit 호출 시 서버 업데이트 후 기본배송지 적용 여부 처리
  const onFormSubmit = handleSubmit((data: AddressRequest) => {
    if (mode === "edit" && address) {
      updateAddress({
        deliveryId: address.id,
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

  const formValues = watch();
  useEffect(() => {
    console.log("Form values changed:", formValues);
  }, [formValues]);

  return (
    <>
      <form
        className={styles.deliveryAddressWithFooterWrapper}
        onSubmit={onFormSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        style={{ gap: "20px" }}
      >
        <Controller
          name="deliveryName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputField
              {...field}
              label="배송지명"
              isRequired
              placeholder="집, 회사 등"
              maxLength={20}
              error={error?.message}
              onChange={(e) => {
                field.onChange(e);
                if (error) {
                  trigger("deliveryName");
                }
              }}
            />
          )}
        />

        <Controller
          name="recipientName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputField
              {...field}
              label="받는 분"
              isRequired
              placeholder="받는 분 성함"
              maxLength={40}
              error={error?.message}
              onChange={(e) => {
                field.onChange(e);
                if (error) {
                  trigger("recipientName");
                }
              }}
            />
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputField
              {...field}
              type="tel"
              label="연락처"
              isRequired
              placeholder="- 제외 숫자만 입력"
              maxLength={11}
              inputMode="numeric"
              error={error?.message}
              onChange={(e) => {
                const input = e.target as HTMLInputElement;
                const onlyDigits = input.value.replace(/\D/g, "");
                field.onChange(onlyDigits);
                if (error) {
                  trigger("phoneNumber");
                }
              }}
            />
          )}
        />

        <div className={styles.searchAddressWrapper}>
          <div className={styles.searchAddressButtonWrapper}>
            <Controller
              name="city" // city와 street은 주소검색 결과로 업데이트됨
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="주소검색을 통해 입력"
                  variants="box"
                  isRequired
                  placeholder="주소"
                  value={combinedAddress}
                  error={combinedError}
                  readOnly
                  isReadOnly={!!combinedAddress}
                  disabled
                />
              )}
            />
            <Button
              type="primary"
              variant="solid"
              buttonColor="gray800"
              size="lg"
              onClick={toggleAddressModal}
            >
              주소검색
            </Button>
          </div>

          <Controller
            name="zipcode"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputField
                {...field}
                isRequired
                placeholder="우편번호"
                error={error?.message}
                readOnly
                isReadOnly={!!field.value}
                disabled
              />
            )}
          />

          <Controller
            name="detailAddress"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputField
                {...field}
                isRequired
                placeholder="상세주소 (최대 50자)"
                maxLength={50}
                error={error?.message}
              />
            )}
          />
        </div>

        <Controller
          name="request"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputField
              {...field}
              label="배송 요청사항"
              placeholder="공동번호, 수령장소 등 입력"
              maxLength={50}
              error={error?.message}
            />
          )}
        />
        {!isDefaultAddress && (
          <LabeledCheckbox
            value={true}
            onToggle={() => {
              onToggleDefault(true);
              setValue("isDefault", !pendingDefault);
            }}
            isChecked={isDefaultSelected(true)}
          >
            <DefaultText type="label2" color="gray700">
              기본 배송지로 설정
            </DefaultText>
          </LabeledCheckbox>
        )}

        <FooterButton onClick={onFormSubmit} isDisabled={!isValid}>
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
