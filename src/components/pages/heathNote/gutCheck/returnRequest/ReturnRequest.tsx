"use client";
import * as styles from "./ReturnRequest.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import RequestForm from "@/components/pages/heathNote/gutCheck/returnRequest/requestForm/RequestForm";
import DefaultText from "@/components/common/defaultText/DefaultText";
import CompletedBox from "@/components/common/completedBox/CompletedBox";
import { useCompletedMode } from "@/hooks/useCompletedMode";

interface ReturnRequestProps {
  diagnosisId: number;
}

const ReturnRequest = ({ diagnosisId }: ReturnRequestProps) => {
  const router = useRouter();
  const { completedMode, toggleCompletedMode } = useCompletedMode();
  const [confirm, setConfirm] = useState<boolean>(false);
  console.log("diagnosisId", diagnosisId); // 데이터 바인딩 후 제거 예정

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
          <RequestForm confirm={confirm} setConfirm={setConfirm} />
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
          onPrimaryClick={!completedMode ? toggleCompletedMode : router.back}
          isPrimaryDisabled={!confirm}
          position={!completedMode ? "sticky" : "fixed"}
        />
      </section>
    </>
  );
};

export default ReturnRequest;
