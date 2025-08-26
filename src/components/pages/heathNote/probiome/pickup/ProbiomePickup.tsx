"use client";
import * as styles from "./ProbiomePickup.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DefaultText from "@/components/common/defaultText/DefaultText";
import CompletedBox from "@/components/common/completedBox/CompletedBox";
import { useCompletedMode } from "@/hooks/useCompletedMode";
import { useMultiFileUpload } from "@/hooks/useMultiFileUpload";
import PickupForm from "@/components/pages/heathNote/probiome/pickup/pickupForm/PickupForm";
import { useCreateProbiomePickup } from "@/api/healthNote/probiome/queries/useCreateProbiomePickup";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { useToastStore } from "@/store/useToastStore";
import { useCancelUploadOnLeave } from "@/hooks/useCancelUploadOnLeave";

interface ProbiomePickupProps {
  diagnosisId: number;
  petId: number;
}

export default function ProbiomePickup({
  diagnosisId,
  petId,
}: ProbiomePickupProps) {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { completedMode, toggleCompletedMode } = useCompletedMode();
  const { deliveryDto } = useDeliveryStore();
  const [isNoticeConfirmed, setIsNoticeConfirmed] = useState<boolean>(false);
  const { mutate: createPickup } = useCreateProbiomePickup();

  const {
    uploadedFiles,
    uploadFile,
    removeFile,
    cancelUpload,
    fileChangeInfo,
    hasPendingUploads,
  } = useMultiFileUpload({
    fileKey: "uploadDiagnosisFile",
    uploadApiUrl: "/api/v2/health-book/probiome-diagnoses/files",
    deleteApiUrl: "/api/v2/health-book/probiome-diagnoses/files",
    cancelApiUrl: `/api/v2/health-book/probiome-diagnoses/${diagnosisId}/kit-pickup/cancel`,
    getExtraFormData: () => ({
      uploadDiagnosisInfo: {
        petId: petId,
        diagnosisId: diagnosisId,
      },
    }),
  });

  console.log(fileChangeInfo);

  useCancelUploadOnLeave({
    hasPendingUploads,
    cancelUpload,
    submitted: completedMode,
  });

  const handlePickupSubmit = () => {
    if (!deliveryDto?.deliveryId) {
      addToast("배송지를 입력해주세요", "above-button");
      return;
    }
    if (!isNoticeConfirmed) {
      addToast("회수 신청 안내를 확인해주세요", "above-button");
      return;
    }

    const body = {
      petId: petId,
      deliveryAddressId: deliveryDto?.deliveryId,
      fileChangeInfo: fileChangeInfo,
    };

    createPickup(
      { diagnosisId, body },
      {
        onSuccess: () => {
          toggleCompletedMode();
        },
        onError: () => {
          addToast("회수 신청에 실패했어요", "above-button");
        },
      }
    );
  };

  const isFormValid = Boolean(deliveryDto?.deliveryId && isNoticeConfirmed);

  return (
    <>
      <Header
        centerTitle={!completedMode ? "회수 신청" : " "}
        showBackButton={!completedMode}
        showCloseButton={completedMode}
        onClose={() => router.back()}
      />
      <section className={styles.returnRequestContainer}>
        {!completedMode ? (
          <PickupForm
            uploadedFiles={uploadedFiles}
            uploadFile={uploadFile}
            removeFile={removeFile}
            isConfirmed={isNoticeConfirmed}
            setIsConfirmed={setIsNoticeConfirmed}
          />
        ) : (
          <div className={styles.completedContainer}>
            <CompletedBox>
              <DefaultText type="title1">회수 신청이 완료됐어요</DefaultText>
              <DefaultText type="body2" color="gray600" align="center">
                4-6주 후에 신청하신 메일로
                <br />
                결과를 보내드려요
              </DefaultText>
            </CompletedBox>
          </div>
        )}
        <ButtonDocked
          type="full-button"
          primaryButtonLabel={!completedMode ? "회수 신청" : "확인"}
          onPrimaryClick={
            !completedMode ? handlePickupSubmit : () => router.back()
          }
          isPrimaryDisabled={!completedMode ? !isFormValid : false}
          position={!completedMode ? "sticky" : "fixed"}
        />
      </section>
    </>
  );
}
