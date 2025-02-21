import * as styles from './SearchAddress.css';
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import AddressModal from "@/components/common/addressModal/AddressModal";
import { AddressDto } from "@/types/subscription";
import { Control, Controller } from "react-hook-form";
import { Address } from 'react-daum-postcode';
import InputField from "@/components/common/inputField/InputField";

interface SearchAddressProps {
  addressValues: AddressDto;
  openAddressModal: boolean;
  setOpenAddressModal: (openAddressModal: boolean) => void;
  handleSelectAddressData: (data: Address) => void;
  control: Control<AddressDto | any>;
  isInAddressObject?: boolean;
  flexDirection?: 'column';
  className?: string;
  size?: 'sm' | 'md';
}

const SearchAddress = ({addressValues, openAddressModal, setOpenAddressModal, handleSelectAddressData, control, isInAddressObject, flexDirection, className, size = 'md' }: SearchAddressProps) => {
  return (
    <div className={`${styles.searchAddressContainer({ flexDirection })} ${className || ''}`}>
      <DefaultButton
        type='gray'
        size='lg'
        borderRadius='sm'
        onClick={() => setOpenAddressModal(true)}
        className={styles.searchAddressInput}
      >
        주소 검색
      </DefaultButton>
      {openAddressModal &&
        <AddressModal
          isOpen={openAddressModal}
          onSelectAddressData={handleSelectAddressData}
          onClose={() => setOpenAddressModal(false)}
        />
      }
      <Controller
        name={isInAddressObject ? 'address.zipcode': 'zipcode'}
        control={control}
        render={({ field }) =>
          <InputField
            {...field}
            id='zipcode'
            name='zipcode'
            disabled
            value={
              !addressValues.zipcode && !addressValues.street
                ? '(우편번호) 주소'
                : `(${addressValues.zipcode ? addressValues.zipcode : field.value}) ${addressValues.street}`
            }
            placeholder='(우편번호) 주소'
            className={styles.searchAddressInput}
          />
        }
      />
      <Controller
        name={isInAddressObject ? 'address.detailAddress': 'detailAddress'}
        control={control}
        render={({ field }) =>
          <InputField
            {...field}
            id='detailAddress'
            name='detailAddress'
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder='나머지 주소'
            className={styles.searchAddressInput}
          />
        }
      />
    </div>
  );
};

export default SearchAddress;