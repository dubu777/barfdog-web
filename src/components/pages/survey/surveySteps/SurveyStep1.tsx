import { SURVEY_FORM_INFO } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, FieldErrors } from "react-hook-form";
import * as styles from "./SurveySteps.css";

import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import SurveyButton from "../surveyButton/SurveyButton";
import ImageButton from "../imageButton/ImageButton";
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
  const handleDuplicateCheck = () => {
    // 중복 체크 로직을 여기에 작성하세요.
    console.log("중복 체크");
  };
  return (
    <div className={styles.surveyStepContainer}>
      {/* 성별 선택 버튼 */}
      <Controller
        name="step1.gender"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption(
            field.value,
            "radio",
            (value) => {
              field.onChange(value);
              handleChange();
            }
          );

          return (
            <div className={styles.rowSurveyButtonWrapper}>
              {SURVEY_FORM_INFO.dogBasicInfo.gender.options.map((option) => (
                <ImageButton
                  key={option.id}
                  label={option.label}
                  value={option.value}
                  inputType="radio"
                  imageSrc={option.imageUrl}
                  imageWidth={80}
                  imageHeight={80}
                  isChecked={isSelected(option.value)}
                  onToggle={onToggle}
                />
              ))}
            </div>
          );
        }}
      />
      <div className={styles.rowSurveyButtonWrapper}>
      <Controller
        name="step1.name"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            placeholder="이름을 입력해주세요"
            error={errors.step1?.name?.message}
            onChange={(e) => {
              field.onChange(e);
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
        size="inputButton"
        buttonColor="gray800"
        onClick={handleDuplicateCheck}
      >
        확인
      </Button>
      </div>
    </div>
  );
}
