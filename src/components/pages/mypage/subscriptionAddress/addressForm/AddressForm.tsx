'use client';
import * as styles from './AddressForm.css';
import { Fragment, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { pointColor } from "@/styles/common.css";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import Text from "@/components/common/text/Text";
import SearchAddress from "@/components/common/searchAddress/SearchAddress";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import AlertModal from "@/components/common/alertModal/AlertModal";
import { DefaultObjectType } from "@/types/common";
import { AddressDto } from "@/types/subscription";
import { Controller } from 'react-hook-form';
import { addressSchema, defaultAddressValues } from "@/utils/addressValidation";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Address } from 'react-daum-postcode';

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
  changeTypeList: DefaultObjectType[];
  nextDeliveryDate: string;
}

const AddressForm = ({ changeTypeList, nextDeliveryDate }: AddressFormProps) => {
  const searchParams = useSearchParams();
  const shippingChangeType = changeTypeList.find(type => type.value === searchParams.get('changeType'));

  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const { control, handleSubmit, reset, watch, setValue, isValid } = useFormHandler(addressSchema, defaultAddressValues);
  const addressValues = watch();

  const handleSelectAddressData = (addressData: Address) => {
    setValue('zipcode', addressData.zonecode);
    setValue('street', addressData.address);
  }
  const onSubmit = (data: AddressDto) => {
    console.log('data', data)
    reset();
  }
  return (
    <AnimatePresence>
      <motion.div
        key="slide"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={styles.addressForm}
      >
        <Text type='title' size='md' weight='normal' className={styles.addressFormTitle}>
          <b>{shippingChangeType?.name}</b>을 선택하셨습니다.<br/>
          <span className={pointColor}>{shippingChangeType?.name} 후 다시 기존 주소로 배송됩니다.</span>
        </Text>
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
            onClick={() => setOpenConfirmModal(true)}
          >
            변경하기
          </DefaultButton>
        </form>
        <AlertModal
          isOpen={openConfirmModal}
          onClose={() => setOpenConfirmModal(false)}
          onConfirm={handleSubmit(onSubmit)}
          message={
            <div className={styles.confirmModal}>
              <p><b>{shippingChangeType?.name}</b>을 선택하셨습니다.</p>
              <p>
                변경된 주소로<br/>
                <b>{shippingChangeType?.name}</b> 예정입니다.<br/>
                ({nextDeliveryDate} 건에 해당)<br/>
              </p>
              <p>이대로 변경하시겠습니까?</p>
            </div>
          }
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default AddressForm;