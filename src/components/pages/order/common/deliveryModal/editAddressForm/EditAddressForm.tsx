import { deliveryModalWrapper } from "../addressList/AddressList.css";
import InputField from "@/components/common/inputField/InputField";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useState } from "react";
import { AddressResponse } from "@/types/delivery";
import FooterButton from "@/components/common/footerButton/FooterButton";

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
  console.log("address", address);

  const { onToggle, isSelected } = useToggleOption<boolean>(
    isDefaultAddress,
    "checkbox",
    setIsDefaultAddress
  );

  return (
    <div className={deliveryModalWrapper} style={{ gap: "20px" }}>
      <InputField label="배송지명" isRequired placeholder="집, 회사 등" />
      <InputField label="받는 분" isRequired placeholder="받는 분 성함" />
      <InputField label="연락처" isRequired placeholder="- 제외 숫자만 입력" />
      <InputField label="주소" isRequired placeholder="우편번호 찾기" />
      <InputField />
      <InputField placeholder="상세주소 (최대 50자)" />
      <InputField label="배송 요청사항" placeholder="공동번호, 수령장소 등 입력" />
      <LabeledCheckbox
        value={true}
        onToggle={() => onToggle(true)}
        isChecked={isSelected(true)}
      >
        <DefaultText type="label2" color="gray700">
          기본 배송지로 설정
        </DefaultText>
      </LabeledCheckbox>
      <FooterButton onClick={() => {}} isDisabled>저장하기</FooterButton>
    </div>
  );
}
