import { deliveryModalWrapper } from "../addressList/AddressList.css";
import InputField from "@/components/common/inputField/InputField";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useState } from "react";
import { AddressRequest, AddressResponse } from "@/types/delivery";
import FooterButton from "@/components/common/footerButton/FooterButton";
import SearchAddress from "@/components/common/searchAddress/SearchAddress";
import { useFormHandler } from "@/hooks/useFormHandler";
import {
  addressSchema,
  defaultAddressValues,
} from "@/utils/validation/addressValidation";
import { Controller } from "react-hook-form";
import * as styles from "./EditAddressForm.css";
import Button from "@/components/common/button/Button";
import { themeVars } from "@/styles/theme.css";
interface EditAddressFormProps {
  address: AddressResponse;
  defaultAddressId: number | null;
  setDefaultAddressId: (id: number | null) => void;
  onBack: () => void;
}

export default function EditAddressForm({
  address,
  defaultAddressId,
  setDefaultAddressId,
  onBack,
}: EditAddressFormProps) {
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(
    defaultAddressId === address.id
  );
  const { control, watch, errors, setValue, handleSubmit } =
    useFormHandler<AddressRequest>(
      addressSchema,
      defaultAddressValues(address)
    );

  console.log("address", address);

  const handleSelectAddressData = (data: any) => {
    // data.zonecode, data.sido, data.roadAddress 등 DaumPostcode에서 반환하는 값 활용
    setValue("zipcode", data.zonecode);
    setValue("city", data.sido);
    setValue("street", data.roadAddress);
  };

  const cityValue = watch("city");
  const streetValue = watch("street");
  const combinedAddress = `${cityValue} ${streetValue}`.trim();
  const combinedError = errors.city?.message || errors.street?.message;
  const disableColor = themeVars.colors.gray.gray200
  const { onToggle, isSelected } = useToggleOption<boolean>(
    isDefaultAddress,
    "checkbox",
    setIsDefaultAddress
  );
  const onSubmit = (data: AddressRequest) => {
    console.log("Validated address data:", data);
    // 여기에 저장 처리 로직 추가
  };

  return (
    <form
      className={deliveryModalWrapper}
      onSubmit={handleSubmit(onSubmit)}
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
            error={error?.message}
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
            error={error?.message}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <InputField
            {...field}
            label="연락처"
            isRequired
            placeholder="- 제외 숫자만 입력"
            error={error?.message}
          />
        )}
      />
      <div className={styles.searchAddressWrapper}>
      <div className={styles.searchAddressButtonWrapper}>
        <Controller
          name="city" // 내부 값은 city, street은 setValue를 통해 업데이트
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="주소"
              variants="fillBox"
              isRequired
              placeholder="주소검색을 통해 입력"
              value={combinedAddress}
              error={combinedError}
              readOnly
              isReadOnly={!!combinedAddress}
              disabled
            />
          )}
        />

        <Button type="primary" variant="solid" buttonColor="gray800" size="lg">
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
            isReadOnly={!!field.value}
            readOnly
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
            error={error?.message}
          />
        )}
      />

      <LabeledCheckbox
        value={true}
        onToggle={() => onToggle(true)}
        isChecked={isSelected(true)}
      >
        <DefaultText type="label2" color="gray700">
          기본 배송지로 설정
        </DefaultText>
      </LabeledCheckbox>

      <FooterButton onClick={() => {}} isDisabled>
        저장하기
      </FooterButton>
    </form>
  );
}
