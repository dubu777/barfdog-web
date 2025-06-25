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
import SurveyStep12 from "./surveyStep12";
import SurveyStep13 from "./SurveyStep13";
import SurveyStep14 from "./SurveyStep14";
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
    <SurveyStep1
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
      isResurvey={isResurvey}
    />,
    <SurveyStep2
      handleChange={handleChange}
      dogName={dogName}
      isResurvey={isResurvey}
    />,
    <SurveyStep3
      handleKeyDown={handleKeyDown}
      handleBlur={handleBlur}
      dogName={dogName}
    />,
    <SurveyStep4 handleChange={handleChange} dogName={dogName} />,
    <SurveyStep5 handleChange={handleChange} dogName={dogName} />,
    <SurveyStep6 handleChange={handleChange} dogName={dogName} />,
    <SurveyStep7 handleChange={handleChange} dogName={dogName} />,
    <SurveyStep8 handleChange={handleChange} dogName={dogName} />,
    <SurveyStep9 handleChange={handleChange} dogName={dogName} />,
    <SurveyStep10
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
    <SurveyStep11 handleChange={handleChange} dogName={dogName} />,
    <SurveyStep12
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
    <SurveyStep13
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
    <SurveyStep14
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      dogName={dogName}
    />,
  ];
};
