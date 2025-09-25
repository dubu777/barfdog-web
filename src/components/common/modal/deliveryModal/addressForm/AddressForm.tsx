import InputField from "@/components/common/inputField/InputField";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useCallback, useEffect, useMemo, useState } from "react";
import Text from "@/components/common/text/Text";
import { AddressRequest, AddressResponse } from "@/types/delivery";
import FooterButton from "@/components/common/footerButton/FooterButton";
import { useFormHandler } from "@/hooks/useFormHandler";
import {
  addressSchema,
  defaultAddressValues,
} from "@/utils/validation/addressValidation";
import * as styles from "./AddressForm.css";
import Button from "@/components/common/button/Button";
import AddressSearchModal from "@/components/common/addressSearchModal/AddressSearchModal";
import useModal from "@/hooks/useModal";
import { useUpdateAddress } from "@/api/address/mutations/useUpdateAddress";
import { useCreateAddress } from "@/api/address/mutations/useCreateAddress";
import { useWatch } from "react-hook-form";

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
  const initialValues = useMemo(
    () =>
      mode === "edit" && address
        ? defaultAddressValues(address)
        : defaultAddressValues(),
    [mode, address]
  );

  const {
    control,
    watch,
    errors,
    setValue,
    handleSubmit,
    isValid,
    trigger,
    register,
  } = useFormHandler<AddressRequest>(addressSchema, initialValues, "all");
  console.log("watch", watch());

  // 수정 모드일 경우 기존 배송지 id와 기본 배송지 id 비교, 추가 모드면 기본 배송지 선택 false
  const isDefaultAddress = mode === "edit" && address ? address.default : false;

  const { onToggle: onToggleDefault, isSelected: isDefaultSelected } =
    useToggleOption<boolean>(pendingDefault, "checkbox", setPendingDefault);

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
  const onSubmit = handleSubmit((data: AddressRequest) => {
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
        onSubmit={onSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        style={{ gap: "20px" }}
      >
        <InputField
          label="배송지명"
          isRequired
          placeholder="집, 회사 등"
          maxLength={20}
          error={errors?.deliveryName?.message}
          {...register("deliveryName")}
        />

        <InputField
          label="받는 분"
          isRequired
          placeholder="받는 분 성함"
          maxLength={40}
          error={errors.recipientName?.message}
          {...register("recipientName")}
        />

        <InputField
          type="tel"
          label="연락처"
          isRequired
          placeholder="- 제외 숫자만 입력"
          maxLength={11}
          inputMode="numeric"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber", {
            onChange: (e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setValue("phoneNumber", onlyDigits);
            },
          })}
        />

        <div className={styles.searchAddressWrapper}>
          <div className={styles.searchAddressButtonWrapper}>
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
              type="primary"
              variant="solid"
              buttonColor="gray800"
              size="lg"
              onClick={toggleAddressModal}
            >
              주소검색
            </Button>
          </div>

          <InputField
            isRequired
            placeholder="우편번호"
            error={errors.zipcode?.message}
            {...register("zipcode")}
            readOnly
            disabled
          />

          <InputField
            isRequired
            placeholder="상세주소 (최대 50자)"
            maxLength={50}
            error={errors.detailAddress?.message}
            {...register("detailAddress")}
          />
        </div>

        <InputField
          label="배송 요청사항"
          placeholder="공동현관 비밀번호, 수령 장소 등"
          maxLength={50}
          error={errors.request?.message}
          {...register("request")}
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
            <Text type="label2" color="gray700">
              기본 배송지로 설정
            </Text>
          </LabeledCheckbox>
        )}

        <FooterButton onClick={onSubmit} isDisabled={!isValid}>
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
