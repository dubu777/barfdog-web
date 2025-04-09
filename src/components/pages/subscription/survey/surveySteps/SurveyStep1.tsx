import { SURVEY_FORM_INFO } from "@/constants";
import SurveyTextField from "../surveyTextField/SurveyTextField";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, FieldErrors } from "react-hook-form";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import { searchAddressButtonWrapper } from "@/components/pages/order/common/modal/deliveryModal/addressForm/AddressForm.css";

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
  const handleCheckDuplicated = () => {};
  return (
    <>
      <div className={searchAddressButtonWrapper}>
        <Controller
          name="step1.name"
          control={control}
          render={({ field }) => (
            <InputField
              id={SURVEY_FORM_INFO.name.id}
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
        <Button
          type="primary"
          variant="solid"
          buttonColor="gray800"
          size="lg"
          onClick={handleCheckDuplicated}
        >
          확인
        </Button>
      </div>
      <DefaultText type="caption">중복 체크</DefaultText>
    </>
  );
}
