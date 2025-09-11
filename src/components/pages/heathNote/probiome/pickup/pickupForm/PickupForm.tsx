import * as styles from "./PickupForm.css";
import { useEffect, useMemo } from "react";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import Card from "@/components/common/card/Card";
import LabeledRadioButton from "@/components/common/labeledRadioButton/LabeledRadioButton";
import AddressContent from "@/components/common/addressContent/AddressContent";
import DeliveryModal from "@/components/common/modal/deliveryModal/DeliveryModal";
import useModal from "@/hooks/useModal";
import { ClientDeliveryDto, UploadedFile } from "@/types";
import { useGetAddressList } from "@/api/address/queries/useGetAddressList";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import MultiFileUploader from "@/components/common/multiFileUploader/MultiFileUploader";
import { PICKUP_NOTICE_LIST } from "@/constants/healthNote/probiome";
import InfoList from "@/components/common/typography/infoList/InfoList";
import Spinner from "@/components/common/spinner/Spinner";

interface PickupFormProps {
  uploadedFiles: UploadedFile[];
  uploadFile: (file: File) => Promise<void>;
  removeFile: (fileId: number) => Promise<void>;
  isConfirmed: boolean;
  setIsConfirmed: (isConfirmed: boolean) => void;
}

export default function PickupForm({
  uploadedFiles,
  uploadFile,
  removeFile,
  isConfirmed,
  setIsConfirmed,
}: PickupFormProps) {
  const { data: addressData, isLoading } = useGetAddressList();
  const { deliveryDto, setDeliveryDto, setBackupDeliveryDto } =
    useDeliveryStore();

  const rawDefaultAddress = useMemo(
    () => addressData?.find((a) => a.default === true),
    [addressData]
  );

  const defaultAddress = useMemo(() => {
    if (!rawDefaultAddress) return null;
    const { id, ...rest } = rawDefaultAddress;
    return { ...rest, deliveryId: id }; // ClientDeliveryDto 형태로 변환
  }, [rawDefaultAddress]);

  const hasDefaultAddress = deliveryDto.deliveryId !== 0;

  // 3) 기본 주소 세팅: 데이터가 도착했을 때 1회만
  useEffect(() => {
    if (defaultAddress && deliveryDto.deliveryId === 0) {
      setDeliveryDto(defaultAddress);
      setBackupDeliveryDto?.(defaultAddress); // 필요 시
    }
  }, [
    defaultAddress,
    deliveryDto.deliveryId,
    setDeliveryDto,
    setBackupDeliveryDto,
  ]);

  const {
    isOpen: isOpenDeliveryModal,
    onToggle: onToggleDeliveryModal,
    onClose: onCloseDeliveryModal,
  } = useModal();

  if (!addressData || isLoading) {
    return <Spinner fullscreen />;
  }

  return (
    <>
      <div>
        <div className={styles.requestFormBox({ gap: 16 })}>
          <AddressContent
            isDefault={deliveryDto.default}
            addressData={
              hasDefaultAddress ? (deliveryDto as ClientDeliveryDto) : null
            }
            handleEditAddress={
              hasDefaultAddress ? onToggleDeliveryModal : undefined
            }
            onToggleDeliveryModal={onToggleDeliveryModal}
          />
        </div>
        <Divider thickness={8} color="gray50" />
        <div className={styles.requestFormBox({ gap: 8 })}>
          <Text type="title4">반려견 대변 사진</Text>
          <Text type="label4" color="gray700">
            사진을 업로드하면 분석 정확도가 올라가요
          </Text>
          <MultiFileUploader
            files={uploadedFiles}
            onUpload={uploadFile}
            onRemove={removeFile}
            maxFiles={1}
            title="반려견 대변 사진"
          />
        </div>
        <Divider thickness={8} color="gray50" />
        <div className={styles.requestFormBox({ gap: 20 })}>
          <Text type="title4">아래의 사항을 꼭 확인해 주세요</Text>
          <Card
            shadow="none"
            backgroundColor="gray50"
            padding={16}
            align="start"
          >
            <InfoList items={PICKUP_NOTICE_LIST} />
          </Card>
          <LabeledRadioButton
            value={isConfirmed}
            isChecked={isConfirmed}
            optionType="selection"
            onToggle={() => setIsConfirmed(!isConfirmed)}
          >
            <Text type="label2" color="gray800">
              회수 안내사항을 확인했습니다
            </Text>
          </LabeledRadioButton>
        </div>
      </div>
      {isOpenDeliveryModal && (
        <DeliveryModal
          addressData={addressData}
          isVisible={isOpenDeliveryModal}
          onClose={onCloseDeliveryModal}
          setDeliveryDto={setDeliveryDto}
          setBackupDeliveryDto={setBackupDeliveryDto}
        />
      )}
    </>
  );
}
