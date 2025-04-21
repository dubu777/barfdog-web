import { SURVEY_FORM_INFO } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import * as styles from "./SurveySteps.css";

import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import InputField from "@/components/common/inputField/InputField";
import Button from "@/components/common/button/Button";
import SurveyButton from "../surveyButton/SurveyButton";
import ImageButton from "../imageButton/ImageButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SurveyButtonGroup from "../surveyButtonGroup/SurveyButtonGroup";
interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: string) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => Promise<void>;
}

export default function SurveyStep1({
  handleChange,
  handleBlur,
  handleKeyDown,
}: SurveyStepProps) {
  const {
    control,
    setValue,
    formState: { errors, touchedFields },
  } = useFormContext<SurveyStepValues>();

  const handleDuplicateCheck = () => {
    // 중복 체크 로직 작성
    setValue("step1.nameVerified", true, { shouldValidate: true });
    handleChange();
    console.log("중복 체크");
  };
  return (
    <>
      {/* 성별 선택 버튼 */}
      <DefaultText type="title2">반려견에 대해 알려주세요</DefaultText>
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

              // ── 성별이 male 이면 step5·6 자동 none 설정
              if (value === "male") {
                setValue("step5.pregnancy", "none", {
                  shouldValidate: false,
                  shouldDirty: true,
                });
                setValue("step6.lactation", "none", {
                  shouldValidate: false,
                  shouldDirty: true,
                });
              }
            }
          );
          return (
            <SurveyButtonGroup title="성별">
              {SURVEY_FORM_INFO.dogBasicInfo.gender.options.map((option) => (
                <ImageButton
                  key={option.value}
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
            </SurveyButtonGroup>
          );
        }}
      />
      <Controller
        name="step1.isNeutered"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption(
            field.value,
            "radio",
            (value) => {
              field.onChange(value);
              handleChange();

              // 중성화 여부에 따라 step5와 step6의 값을 초기화
              if (value === true) {
                setValue("step5.pregnancy", "none", {
                  shouldValidate: false,
                  shouldDirty: true,
                });
                setValue("step6.lactation", "none", {
                  shouldValidate: false,
                  shouldDirty: true,
                });
              }
            }
          );

          return (
            <SurveyButtonGroup title="중성화 여부">
              {SURVEY_FORM_INFO.dogBasicInfo.isNeutered.options.map(
                (option) => (
                  <SurveyButton
                    key={option.label}
                    label={option.label}
                    value={option.value}
                    inputType="normal"
                    isChecked={isSelected(option.value)}
                    onToggle={onToggle}
                  />
                )
              )}
            </SurveyButtonGroup>
          );
        }}
      />
      <SurveyButtonGroup
        title="반려견 이름"
        error={
          touchedFields.step1?.name ? errors.step1?.name?.message : undefined
        }
      >
        <Controller
          name="step1.name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="이름을 입력해주세요"
              onChange={(e) => {
                field.onChange(e);
                setValue("step1.nameVerified", false, { shouldValidate: true });
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
          중복체크
        </Button>
      </SurveyButtonGroup>
    </>
  );
}
