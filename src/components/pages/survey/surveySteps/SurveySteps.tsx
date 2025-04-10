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

interface Props {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
  handleNextStep: () => void;
  petName: string;
}

export const getSurveySteps = ({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  petName,
}: Props) => {
  return [
    <SurveyStep1
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
    />,
    <SurveyStep2
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep3
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep4
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep5
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep6
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      petName={petName}
    />,
    <SurveyStep7
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep8
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep9
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep10
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep11
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep12
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
    <SurveyStep13
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
    <SurveyStep14
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep15
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleKeyDown={handleKeyDown}
      handleNextStep={handleNextStep}
      petName={petName}
    />,
    <SurveyStep16
      handleChange={handleChange}
      petName={petName}
    />,
    <SurveyStep17
      handleChange={handleChange}
      petName={petName}
    />,
  ];
};
