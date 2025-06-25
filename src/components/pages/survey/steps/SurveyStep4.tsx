import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../../../common/survey/surveyTitle/SurveyTitle";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import SearchableSelector from "@/components/common/searchableSelector/SearchableSelector";

interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
}

export default function SurveyStep4({
  handleChange,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();
  const dogTypeOptions = DIET_ANALYSIS_FORM_INFO.dogBasicInfo.dogType.options;

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step4} />

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
