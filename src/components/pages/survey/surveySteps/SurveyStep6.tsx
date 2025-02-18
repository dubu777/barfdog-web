import { SURVEY_FORM_INFO } from "@/constants";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, FieldErrors } from "react-hook-form";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface SurveyStep2Props {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
  control: Control<SurveyStepValues>;
  petName: string;
  errors: FieldErrors<SurveyStepValues>;
}

export default function SurveyStep6({
  handleChange,
  handleBlur,
  handleKeyDown,
  control,
  petName,
  errors,
}: SurveyStep2Props) {

  return (
    <>
      <Controller
        name="step6.weight"
        control={control}
        render={({ field }) => (
          <SurveyTextField
            id={SURVEY_FORM_INFO.weight.id}
            title={SURVEY_FORM_INFO.weight.title}
            value={field.value}
            placeholder={SURVEY_FORM_INFO.weight.placeholder}
            petName={petName}
            onChange={(value) => {
              field.onChange(value);
              handleChange();
            }}
            onBlur={() => {
              field.onBlur();
              handleBlur(field.name);
            }}
            onKeyDown={(e) => handleKeyDown(e, field.name)}
            unit="kg"
          />
        )}
      />
      {errors && (
        <DefaultText type="body2">
          {errors.step6?.weight?.message}
        </DefaultText>
      )}
    </>
  );
}
