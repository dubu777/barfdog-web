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
import SurveyStep15 from "./SurveyStep15";
import SurveyStep16 from "./SurveyStep16";
import SurveyStep17 from "./SurveyStep17";
import {
  Control,
  FieldErrors,
} from "react-hook-form";
import {
  SurveyStepValues,
} from "@/utils/validation/surveyValidation";

interface Props {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
  handleNextStep: () => void;
  control: Control<SurveyStepValues>;
  errors: FieldErrors<SurveyStepValues>;
  petName: string;
}

export const getSurveySteps = ({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  control,
  errors,
  petName,
}: Props) => {
  return [
    <SurveyStep1
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      control={control}
      errors={errors}
    />,
    <SurveyStep2
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep3
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep4
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep5
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep6
      control={control}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      petName={petName}
      errors={errors}
    />,
    <SurveyStep7
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep8
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep9
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep10
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep11
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep12
      control={control}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
    <SurveyStep13
      control={control}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
    <SurveyStep14
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep15
      control={control}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
    <SurveyStep16
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep17
      control={control}
      handleChange={handleChange}
      petName={petName}
    />,
  ];
};
