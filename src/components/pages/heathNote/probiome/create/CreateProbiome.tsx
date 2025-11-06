"use client";
import { commonWrapper } from "@/styles/common.css";
import { useCallback, useState } from "react";
import Text from "@/components/ui/text/Text";
import InputField from "@/components/ui/inputField/InputField";
import { useCheckProbiomeKit } from "@/api/healthNote/probiome/queries/useCheckProbiomeKit";
import ProbiomePreInfo from "./ProbiomePreInfo";
import { PROBIOME_ERROR_MESSAGES } from "@/constants/healthNote/probiome";

interface CreateProbiomeProps {
  petId: number;
}

export default function CreateProbiome({ petId }: CreateProbiomeProps) {
  const [serialNo, setSerialNo] = useState<string>("");
  const [kitId, setKitId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [isKitVerified, setIsKitVerified] = useState<boolean>(false);
  const { refetch: checkKit } = useCheckProbiomeKit(serialNo, {
    enabled: false,
  });

  const handleCheckSerialNumber = useCallback(async () => {
    const { data: kitInfo } = await checkKit();
    const isSuccess = kitInfo?.errorCode === null;

    if (isSuccess && kitInfo?.data) {
      setIsKitVerified(true);
      setError("");
      setKitId(kitInfo.data?.id);
    } else {
      const errorMessage =
        PROBIOME_ERROR_MESSAGES[
          kitInfo?.errorCode as keyof typeof PROBIOME_ERROR_MESSAGES
        ] ?? PROBIOME_ERROR_MESSAGES.DEFAULT;
      setError(errorMessage);
      setIsKitVerified(false);
    }
  }, [checkKit]);

  return (
    <section className={commonWrapper({
      padding: '40/20',
      direction: 'col',
      gap: 20,
      align: 'start',
    })}>
      {!isKitVerified ? (
        <>
          <Text type="title3">
            진단 키트 [안내서에] 있는
            <br />
            시리얼 번호를 입력해 주세요
          </Text>
          <div className={commonWrapper({})}>
            <InputField
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              placeholder="시리얼 번호 입력"
              confirmButton
              confirmButtonDisabled={!serialNo}
              confirmButtonText="인증"
              confirmButtonVariant="solid"
              onSubmit={handleCheckSerialNumber}
              error={error}
            />
          </div>
        </>
      ) : (
        petId &&
        kitId && (
          <ProbiomePreInfo serialNo={serialNo} petId={petId} kitId={kitId} />
        )
      )}
    </section>
  );
}
