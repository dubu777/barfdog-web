import * as styles from './AddressForm.css';
import { Fragment, useState } from "react";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import SearchAddress from "@/components/common/searchAddress/SearchAddress";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Address } from "react-daum-postcode";
import { AddressDto } from "@/types";

interface FormFieldListProps {
  id: "deliveryName" | "recipientName" | "phoneNumber" | "request" | "zipcode" | "street" | "detailAddress" | 'address';
  label?: string;
  placeholder?: string;
  type?: "number" | "text" | "button" | undefined;
}

const formFieldList: FormFieldListProps[] = [
  {
    id: 'deliveryName',
    label: '배송지 명칭',
    placeholder: '예) 댕댕이네',
    type: 'text',
  },
  {
    id: 'recipientName',
    label: '이름',
    placeholder: '받는 분 이름',
    type: 'text',
  },
  {
    id: 'phoneNumber',
    label: '연락처',
    placeholder: '',
    type: 'number',
  },
  {
    id: 'address',
  },
  {
    id: 'request',
    label: '배송 기사님 요청사항',
    placeholder: '직접 입력',
    type: 'text',
  },
];

interface AddressFormProps {
  control: Control<AddressDto>;
  watch: UseFormWatch<AddressDto>
  setValue: UseFormSetValue<AddressDto>;
  isValid: boolean;
  onSubmit: () => void;
  confirmText: string;
}

const AddressForm = ({ control, watch, setValue, isValid, onSubmit, confirmText }: AddressFormProps) => {
  const addressValues = watch();
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
  const handleSelectAddressData = (addressData: Address) => {
    setValue('zipcode', addressData.zonecode);
    setValue('street', addressData.address);
  }

  return (
    <form>
      {formFieldList.map(input => (
        <Fragment key={input.id}>
          {input.id !== 'address' ?
            <Controller
              name={input.id}
              control={control}
              render={({ field }) =>
                <DefaultTextField
                  {...field}
                  type={input.type}
                  id={input.id}
                  name={input.id}
                  value={field.value ?? ''}
                  onChange={(value) => field.onChange(value)}
                  label={input.label}
                  placeholder={input.placeholder}
                  className={styles.addressInput}
                />
              }
            />
            :
            <div className={styles.addressInput}>
              <h3 className={styles.addressLabel}>받는 곳 주소</h3>
              <SearchAddress
                addressValues={addressValues}
                control={control}
                openAddressModal={openAddressModal}
                setOpenAddressModal={setOpenAddressModal}
                handleSelectAddressData={handleSelectAddressData}
              />
            </div>
          }
        </Fragment>
      ))}
      <DefaultButton
        type='gray'
        isActive={isValid}
        isDisabled={!isValid}
        onClick={onSubmit}
      >
        {confirmText}
      </DefaultButton>
    </form>
  );
};

export default AddressForm;