"use client";
import * as styles from "./CreateProbiome.css";
import { useState } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InputField from "@/components/common/inputField/InputField";

const CreateProbiome = () => {
  const [serialNumber, setSerialNumber] = useState<string>("");

  const handleCheckSerialNumber = () => {
    window.location.href = "/health-note/gut-check/survey";
  };

  return (
    <section className={styles.createProbiomeContainer}>
      <DefaultText type="title3">
        진단 키트 [안내서에] 있는
        <br />
        시리얼 번호를 입력해 주세요
      </DefaultText>
      <div>
        <InputField
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="시리얼 번호 입력"
          confirmButton
          confirmButtonDisabled={!serialNumber}
          confirmButtonText="인증"
          confirmButtonVariant="solid"
          onSubmit={handleCheckSerialNumber}
        />
      </div>
    </section>
  );
};

export default CreateProbiome;
