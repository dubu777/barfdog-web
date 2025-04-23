import { surveyFormInfo, surveyTitles } from "@/constants";
import * as styles from "./SurveySteps.css";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import SearchableSelector from "../searchableSelector/SearchableSelector";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep4({
  handleChange,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();
  const dogTypeOptions = surveyFormInfo.dogBasicInfo.dogType.options;

  return (
    <>
      <SurveyTitle petName={petName} config={surveyTitles.step4} />
      
      <Controller
        name="step4.dogType" // surveyStepsSchema에 있는 필드 이름
        control={control}
        render={({ field }) => {
          return (
            <SearchableSelector
              label="견종 검색"
              placeholder="견종을 검색해 보세요"
              options={dogTypeOptions}
              selectedValue={field.value || ""}
              onChange={(value) => {
                field.onChange(value);
                handleChange();
              }}
            />
          );
        }}
      />
    </>
  );
}
