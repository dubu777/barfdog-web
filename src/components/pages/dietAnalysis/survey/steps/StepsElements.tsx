import SurveyStep1 from "./SurveyStep1";
import SurveyStep2 from "./SurveyStep2";
import SurveyStep3 from "./SurveyStep3";
import SurveyStep4 from "./SurveyStep4";
import SurveyStep5 from "./SurveyStep5";
import SurveyStep6 from "./SurveyStep6";
import SurveyStep7 from "./SurveyStep7";
import SurveyStep8 from "./SurveyStep8";
import SurveyStep9 from "./SurveyStep9";
import SurveyStep10 from "./SurveyStep10";
import SurveyStep11 from "./SurveyStep11";
import SurveyStep12 from "./SurveyStep12";
import SurveyStep13 from "./SurveyStep13";
import { Path } from "react-hook-form";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";

interface Props {
  handleChange: () => void;
  handleBlur: (fieldName: Path<SurveyStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<SurveyStepValues>
  ) => Promise<void>;
  handleNextStep: () => void;
  dogName: string;
  isResurvey: boolean;
}

export const getSurveySteps = ({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  dogName,
  isResurvey,
}: Props) => {
  return [
    <SurveyStep1 key="step1" handleChange={handleChange} dogName={dogName} />,
    <SurveyStep2
      key="step2"
      handleChange={handleChange}
      dogName={dogName}
      isResurvey={isResurvey}
    />,
    <SurveyStep3
      key="step3"
      handleKeyDown={handleKeyDown}
      handleBlur={handleBlur}
      dogName={dogName}
    />,
    <SurveyStep4 key="step4" handleChange={handleChange} dogName={dogName} />,
    <SurveyStep5 key="step5" handleChange={handleChange} dogName={dogName} />,
    <SurveyStep6 key="step6" handleChange={handleChange} dogName={dogName} />,
    <SurveyStep7 key="step7" handleChange={handleChange} dogName={dogName} />,
    <SurveyStep8 key="step8" handleChange={handleChange} dogName={dogName} />,
    <SurveyStep9
      key="step9"
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
    <SurveyStep10 key="step10" handleChange={handleChange} dogName={dogName} />,
    <SurveyStep11 key="step11" handleChange={handleChange} dogName={dogName} />,
    <SurveyStep12
      key="step12"
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
    <SurveyStep13
      key="step13"
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
  ];
};
