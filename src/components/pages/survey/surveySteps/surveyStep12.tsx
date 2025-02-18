import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, useWatch } from "react-hook-form";

interface SurveyStep2Props {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
  handleNextStep: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep12({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  control,
  petName,
}: SurveyStep2Props) {
  // useWatch를 이용하여 'step12.supplement'의 값을 구독합니다.
  const supplementValue = useWatch({ control, name: "step12.supplement" });
  // ETC가 포함되어 있으면 추가 입력 필드를 보여줍니다.
  const showEtcField =
    Array.isArray(supplementValue) && supplementValue.includes("ETC");

  return (
    <>
      <Controller
        name="step12.supplement"
        control={control}
        render={({ field }) => (
          <SurveyButtonList
            options={SURVEY_FORM_INFO.supplement.options}
            title={SURVEY_FORM_INFO.supplement.title}
            selectedValue={field.value}
            petName={petName}
            layoutType="grid"
            isMultiSelect
            handleNextStep={handleNextStep}
            onChange={(value) => {
              field.onChange(value);
              handleChange();
            }}
          />
        )}
      />
      {showEtcField && (
        <Controller
          name="step12.supplementEtc"
          control={control}
          render={({ field }) => (
            <SurveyTextField
              id={SURVEY_FORM_INFO.supplementEtc.id}
              value={field.value}
              placeholder={SURVEY_FORM_INFO.supplementEtc.placeholder}
              onChange={(value) => {
                field.onChange(value);
                handleChange();
              }}
              onBlur={() => {
                field.onBlur();
                handleBlur(field.name);
              }}
              onKeyDown={(e) => handleKeyDown(e, field.name)}
            />
          )}
        />
      )}
    </>
  );
}
