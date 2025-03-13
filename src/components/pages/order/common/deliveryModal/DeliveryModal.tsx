import * as styles from "./DeliveryModal.css";
import { useMemo, useState } from "react";
import CloseIcon from "/public/images/icons/close.svg";
import BackIcon from "/public/images/icons/chevron-left.svg";

import DefaultModalBackground from "../../../../common/defaultModalBackground/DefaultModalBackground";
import { DeliveryDto } from "@/types";
import DefaultText from "@/components/common/defaultText/DefaultText";

import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import NewHeader from "@/components/layout/newHeader/NewHeader";
import AddressList from "./addressList/AddressList";
import AddAddressForm from "./addAddressForm/AddAddressForm";
import EditAddressForm from "./editAddressForm/EditAddressForm";
import { AddressResponse } from "@/types/delivery";

interface DeliveryModalProps {
  addressData: AddressResponse[]
  defaultAddressId: number | null;
  isVisible: boolean;
  onClose: () => void;
  setDeliveryDto: (delivery: DeliveryDto) => void;
  setBackupDeliveryDto: (delivery: DeliveryDto) => void;
  setDefaultAddressId: (id: number | null) => void;
}

type ViewMode = "list" | "add" | "edit";

export default function DeliveryModal({
  addressData,
  defaultAddressId,
  isVisible,
  onClose,
  setDeliveryDto,
  setBackupDeliveryDto,
  setDefaultAddressId,
}: DeliveryModalProps) {

  console.log('addressData',addressData);
  
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedAddress, setSelectedAddress] =
    useState<AddressResponse | null>(null);

  // 배송지 추가 모드로 전환
  const goToAddAddress = () => setViewMode("add");
  // 배송지 수정 모드로 전환
  const goToEditAddress = (address: AddressResponse) => {
    setViewMode("edit");
    setSelectedAddress(address);
  };
  // 배송지 목록으로 돌아가기
  const goToList = () => {
    setViewMode("list");
    setSelectedAddress(null);
  };

  // 배송지 선택 - 묶음 배송시 배송지 정보 null로 초기화
  const handleSelectAddress = (deliveryDto: DeliveryDto) => {
    setDeliveryDto(deliveryDto);
    setBackupDeliveryDto(deliveryDto);
    onClose();
  };

  // 배송지 삭제
  const handleDeleteAddress = () => {};

  // 배송지 모달 헤더 생성
  const getHeaderProps = (mode: ViewMode) => {
    switch (mode) {
      case "list":
        return {
          centerElement: (
            <DefaultText type="title4" style={{ lineHeight: 0 }}>
              배송지 변경
            </DefaultText>
          ),
          rightElement: (
            <SvgIcon
              src={CloseIcon}
              size={24}
              color="gray900"
              onClick={onClose}
            />
          ),
        };
      case "add":
        return {
          leftElement: (
            <SvgIcon
              src={BackIcon}
              size={24}
              color="gray900"
              onClick={goToList}
            />
          ),
          centerElement: (
            <DefaultText type="title4" style={{ lineHeight: 0 }}>
              배송지 추가
            </DefaultText>
          ),
        };
      case "edit":
        return {
          leftElement: (
            <SvgIcon
              src={BackIcon}
              size={24}
              color="gray900"
              onClick={goToList}
            />
          ),
          centerElement: (
            <DefaultText type="title4" style={{ lineHeight: 0 }}>
              배송지 수정
            </DefaultText>
          ),
        };
      default:
        return {};
    }
  };

  const headerProps = useMemo(() => getHeaderProps(viewMode), [viewMode]);

  return (
    <DefaultModalBackground isVisible={isVisible} onClose={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <NewHeader {...headerProps} />
        {viewMode === "list" && (
          <AddressList
            addressData={addressData}
            goToAddAddress={goToAddAddress}
            goToEditAddress={goToEditAddress}
            onSelectAddress={handleSelectAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        )}
        {viewMode === "add" && <AddAddressForm onBack={goToList} setDefaultAddressId={setDefaultAddressId}/>}
        {viewMode === "edit" && selectedAddress && (
          <EditAddressForm
            address={selectedAddress}
            defaultAddressId={defaultAddressId}
            onBack={goToList}
            setDefaultAddressId={setDefaultAddressId}
          />
        )}
      </div>
    </DefaultModalBackground>
  );
}
