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
  petName: string;
  isResurvey: boolean;
}

export const getSurveySteps = ({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  petName,
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
      petName={petName}
      isResurvey={isResurvey}
    />,
    <SurveyStep3
      handleKeyDown={handleKeyDown}
      handleBlur={handleBlur}
      petName={petName}
    />,
    <SurveyStep4 handleChange={handleChange} petName={petName} />,
    <SurveyStep5 handleChange={handleChange} petName={petName} />,
    <SurveyStep6 handleChange={handleChange} petName={petName} />,
    <SurveyStep7 handleChange={handleChange} petName={petName} />,
    <SurveyStep8 handleChange={handleChange} petName={petName} />,
    <SurveyStep9 handleChange={handleChange} petName={petName} />,
    <SurveyStep10
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
    <SurveyStep11 handleChange={handleChange} petName={petName} />,
    <SurveyStep12
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
    <SurveyStep13
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
    <SurveyStep14
      handleChange={handleChange}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
  ];
};
