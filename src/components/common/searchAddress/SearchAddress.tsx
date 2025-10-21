import * as styles from "./SearchAddress.css";
import AddressModal from "@/components/common/addressModal/AddressModal";
import { AddressDto } from "@/types/subscription";
import { Control, Controller } from "react-hook-form";
import { Address } from "react-daum-postcode";
import InputField from "@/components/common/inputField/InputField";
import Button from "../button/Button";

interface SearchAddressProps {
  addressValues: AddressDto;
  openAddressModal: boolean;
  setOpenAddressModal: (openAddressModal: boolean) => void;
  handleSelectAddressData: (data: Address) => void;
  control: Control<AddressDto | any>;
  isInAddressObject?: boolean;
  flexDirection?: "column";
}

const SearchAddress = ({
  addressValues,
  openAddressModal,
  setOpenAddressModal,
  handleSelectAddressData,
  control,
  isInAddressObject,
  flexDirection,
}: SearchAddressProps) => {
  return (
    <div className={`${styles.searchAddressContainer({ flexDirection })}`}>
      <Button
        intent="secondary"
        variant="solid"
        onClick={() => setOpenAddressModal(true)}
      >
        주소검색
      </Button>
      {openAddressModal && (
        <AddressModal
          isOpen={openAddressModal}
          onSelectAddressData={handleSelectAddressData}
          onClose={() => setOpenAddressModal(false)}
        />
      )}
      <Controller
        name={isInAddressObject ? "address.zipcode" : "zipcode"}
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            id="zipcode"
            name="zipcode"
            disabled
            value={
              !addressValues.zipcode && !addressValues.street
                ? "(우편번호) 주소"
                : `(${
                    addressValues.zipcode ? addressValues.zipcode : field.value
                  }) ${addressValues.street}`
            }
            placeholder="(우편번호) 주소"
            className={styles.searchAddressInput}
          />
        )}
      />
      <Controller
        name={isInAddressObject ? "address.detailAddress" : "detailAddress"}
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            id="detailAddress"
            name="detailAddress"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder="나머지 주소"
            className={styles.searchAddressInput}
          />
        )}
      />
    </div>
  );
};

export default SearchAddress;
