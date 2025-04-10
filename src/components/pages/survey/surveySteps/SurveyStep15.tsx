
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

export default function SurveyStep15({
  handleChange,
  handleBlur,
  handleKeyDown,
  handleNextStep,
  control,
  petName,
}: SurveyStepProps) {
  const cautionValue = useWatch({ control, name: "step15.caution" });
  const showEtcField = Array.isArray(cautionValue) && cautionValue.includes("ETC");

  return (
    <>
      <Controller
        name="step15.caution"
        control={control}
        render={({ field }) => (
          <SurveyButtonList
            options={SURVEY_FORM_INFO.caution.options}
            title={SURVEY_FORM_INFO.caution.title}
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
          name="step15.cautionEtc"
          control={control}
          render={({ field }) => (
            <SurveyTextField
              id={SURVEY_FORM_INFO.cautionEtc.id}
              value={field.value}
              placeholder={SURVEY_FORM_INFO.cautionEtc.placeholder}
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