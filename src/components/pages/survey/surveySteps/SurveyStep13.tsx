
import { SURVEY_FORM_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";
import { useEffect, useState } from "react";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, useWatch } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, fieldName: string) => Promise<void>;
  handleNextStep: () => void;
  control: Control<SurveyStepValues>;
  petName: string;
}

export default function SurveyStep13({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  control,
  petName,
}: SurveyStepProps) {
  // useWatch로 'step13.inedibleFood'를 구독하여 ETC 선택 여부를 판단합니다.
  const inedibleFoodValue = useWatch({ control, name: "step13.inedibleFood" });
  const showEtcField = Array.isArray(inedibleFoodValue) && inedibleFoodValue.includes("ETC");

  return (
    <>
      <Controller
        name="step13.inedibleFood"
        control={control}
        render={({ field }) => (
          <SurveyButtonList
            options={SURVEY_FORM_INFO.inedibleFood.options}
            title={SURVEY_FORM_INFO.inedibleFood.title}
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
          name="step13.inedibleFoodEtc"
          control={control}
          render={({ field }) => (
            <SurveyTextField
              id={SURVEY_FORM_INFO.inedibleFoodEtc.id}
              value={field.value}
              placeholder={SURVEY_FORM_INFO.inedibleFoodEtc.placeholder}
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
