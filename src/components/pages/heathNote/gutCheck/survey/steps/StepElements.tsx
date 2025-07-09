import { Path } from "react-hook-form";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import GutCheckStep1 from "./Step1";
import GutCheckStep2 from "./Step2";
import GutCheckStep3 from "./Step3";
import GutCheckStep4 from "./Step4";
import GutCheckStep5 from "./Step5";
import GutCheckStep6 from "./Step6";
import GutCheckStep7 from "./Step7";
import GutCheckStep8 from "./Step8";
import GutCheckStep9 from "./Step9";
import GutCheckStep10 from "./Step10";
import GutCheckStep11 from "./Step11";
import GutCheckStep12 from "./Step12";
import GutCheckStep13 from "./Step13";
import GutCheckStep14 from "./Step14";
import GutCheckStep15 from "./Step15";
import GutCheckStep16 from "./Step16";
import GutCheckStep17 from "./Step17";

interface Props {
  handleChange: () => void;
  handleBlur: (fieldName: Path<GutCheckStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<GutCheckStepValues>
  ) => Promise<void>;
  handleNextStep: () => void;
  dogName: string;
}

export const buildGutCheckStepElements = ({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  dogName,
}: Props) => {
  return [
    <GutCheckStep1 key="step1" handleChange={handleChange} dogName={dogName} />,
    <GutCheckStep2
      key="step2"
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      dogName={dogName}
    />,
    <GutCheckStep3 key="step3" handleChange={handleChange} dogName={dogName} />,
    <GutCheckStep4 key="step4" handleChange={handleChange} dogName={dogName} />,
    <GutCheckStep5 key="step5" handleChange={handleChange} dogName={dogName} />,
    <GutCheckStep6 key="step6" handleChange={handleChange} dogName={dogName} />,
    <GutCheckStep7
      key="step7"
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
    <GutCheckStep8 key="step8" handleChange={handleChange} dogName={dogName} />,
    <GutCheckStep9 key="step9" handleChange={handleChange} dogName={dogName} />,
    <GutCheckStep10
      key="step10"
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      dogName={dogName}
    />,
    <GutCheckStep11
      key="step11"
      handleChange={handleChange}
      dogName={dogName}
    />,
    <GutCheckStep12
      key="step12"
      handleChange={handleChange}
      dogName={dogName}
    />,
    <GutCheckStep13
      key="step13"
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
    <GutCheckStep14
      key="step14"
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
    <GutCheckStep15
      key="step15"
      handleChange={handleChange}
      dogName={dogName}
    />,
    <GutCheckStep16
      key="step16"
      handleChange={handleChange}
      dogName={dogName}
    />,
    <GutCheckStep17
      key="step17"
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      dogName={dogName}
    />,
  ];
};
