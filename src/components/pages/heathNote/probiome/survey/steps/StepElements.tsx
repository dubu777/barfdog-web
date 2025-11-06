import { Path } from "react-hook-form";
import { useMemo } from "react";
import { ProbiomeStepValues } from "@/utils/validation/probiomeValidation";
import ProbiomeStep1 from "./Step1";
import ProbiomeStep2 from "./Step2";
import ProbiomeStep3 from "./Step3";
import ProbiomeStep4 from "./Step4";
import ProbiomeStep5 from "./Step5";
import ProbiomeStep6 from "./Step6";
import ProbiomeStep7 from "./Step7";
import ProbiomeStep8 from "./Step8";
import ProbiomeStep9 from "./Step9";
import ProbiomeStep10 from "./Step10";
import ProbiomeStep11 from "./Step11";
import ProbiomeStep12 from "./Step12";
import ProbiomeStep13 from "./Step13";
import ProbiomeStep14 from "./Step14";
import ProbiomeStep15 from "./Step15";
import ProbiomeStep16 from "./Step16";
import ProbiomeStep17 from "./Step17";

interface Props {
  handleChange: () => void;
  handleBlur: (fieldName: Path<ProbiomeStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<ProbiomeStepValues>
  ) => Promise<void>;
  handleNextStep: () => void;
  dogName: string;
}

export const useProbiomeStepElements = ({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  dogName,
}: Props) => {
  return useMemo(
    () => [
      <ProbiomeStep1
        key="step1"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep2
        key="step2"
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleKeyDown={handleKeyDown}
        dogName={dogName}
      />,
      <ProbiomeStep3
        key="step3"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep4
        key="step4"
        handleChange={handleChange}
        handleNextStep={handleNextStep}
        dogName={dogName}
      />,
      <ProbiomeStep5
        key="step5"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep6
        key="step6"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep7
        key="step7"
        handleChange={handleChange}
        handleNextStep={handleNextStep}
        dogName={dogName}
      />,
      <ProbiomeStep8
        key="step8"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep9
        key="step9"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep10
        key="step10"
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleKeyDown={handleKeyDown}
        dogName={dogName}
      />,
      <ProbiomeStep11
        key="step11"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep12
        key="step12"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep13
        key="step13"
        handleChange={handleChange}
        handleNextStep={handleNextStep}
        dogName={dogName}
      />,
      <ProbiomeStep14
        key="step14"
        handleChange={handleChange}
        handleNextStep={handleNextStep}
        dogName={dogName}
      />,
      <ProbiomeStep15
        key="step15"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep16
        key="step16"
        handleChange={handleChange}
        dogName={dogName}
      />,
      <ProbiomeStep17
        key="step17"
        handleBlur={handleBlur}
        handleKeyDown={handleKeyDown}
        dogName={dogName}
      />,
    ],
    [handleChange, handleBlur, handleKeyDown, handleNextStep, dogName]
  );
};
