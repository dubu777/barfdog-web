import * as styles from './SearchAddress.css';
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import AddressModal from "@/components/common/addressModal/AddressModal";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import { AddressDto } from "@/types/subscription";
import { Control, Controller } from "react-hook-form";

interface SearchAddressProps {
  addressValues: AddressDto;
  openAddressModal: boolean;
  setOpenAddressModal: () => void;
  handleSelectAddressData: () => void;
  control: Control<T, any>;
}
const SearchAddress = ({ addressValues, openAddressModal, setOpenAddressModal, handleSelectAddressData, control }: SearchAddressProps) => {
  return (
    <>
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
        name='zipcode'
        control={control}
        render={({ field }) =>
          <DefaultTextField
            {...field}
            type='text'
            id='zipcode'
            name='zipcode'
            isDisabled
            value={field.value && `(${field.value}) ${addressValues.street}`}
            placeholder='(우편번호) 주소'
            className={styles.searchAddressInput}
          />
        }
      />
      <Controller
        name='detailAddress'
        control={control}
        render={({ field }) =>
          <DefaultTextField
            {...field}
            type='text'
            id='detailAddress'
            name='detailAddress'
            value={field.value}
            onChange={(value) => field.onChange(value)}
            placeholder='나머지 주소'
            className={styles.searchAddressInput}
          />
        }
      />
    </>
  );
};

export default SearchAddress;