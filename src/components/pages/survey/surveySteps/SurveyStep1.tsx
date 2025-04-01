import { SURVEY_FORM_INFO } from "@/constants";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import {
  SurveyStepValues,
} from "@/utils/validation/surveyValidation";
import { Control, Controller, FieldErrors } from "react-hook-form";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
  control: Control<SurveyStepValues>;
  errors: FieldErrors<SurveyStepValues>;
}

export default function SurveyStep1({
  handleChange,
  handleBlur,
  handleKeyDown,
  control,
  errors,
}: SurveyStepProps) {
  return (
    <>
      <Controller
        name="step1.name"
        control={control}
        render={({ field }) => (
          <SurveyTextField
            id={SURVEY_FORM_INFO.name.id}
            title={SURVEY_FORM_INFO.name.title}
            value={field.value}
            placeholder={SURVEY_FORM_INFO.name.placeholder}
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
      {errors && (
        <DefaultText type="caption">
          {errors.step6?.weight?.message}
        </DefaultText>
      )}
    </>
  );
}
