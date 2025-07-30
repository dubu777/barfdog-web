import { Controller, Path, useFormContext, useWatch } from "react-hook-form";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import {
  GUT_CHECK_FORM_INFO,
  GUT_CHECK_TITLES,
} from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import InputField from "@/components/common/inputField/InputField";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { commonWrapper } from "@/styles/common.css";
import SurveyButtonGroup from "@/components/common/survey/surveyButtonGroup/SurveyButtonGroup";

interface SurveyStepProps {
  handleChange: () => void;
  handleBlur: (fieldName: Path<GutCheckStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<GutCheckStepValues>
  ) => Promise<void>;
  dogName: string;
}

export default function GutCheckStep10({
  handleChange,
  handleBlur,
  handleKeyDown,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step10} />
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        <Controller
          name="step10.foodProduct"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label={GUT_CHECK_FORM_INFO.lifestyle.foodProduct.title}
              labelType="headline4"
              labelColor="gray800"
              placeholder={
                GUT_CHECK_FORM_INFO.lifestyle.foodProduct.placeholder
              }
              onChange={(e) => {
                field.onChange(e);
                console.log("field.name", field.name);
              }}
              onKeyDown={(e) => handleKeyDown(e, field.name)}
              onBlur={() => handleBlur(field.name)}
            />
          )}
        />
        <InfoBox
          type="info"
          text={GUT_CHECK_FORM_INFO.lifestyle.foodProduct.info}
          fullWidth
        />
      </div>
      <Controller
        name="step10.feedTime"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "radio",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
            },
          });
          return (
            <SurveyButtonGroup
              title={GUT_CHECK_FORM_INFO.lifestyle.feedTime.title}
            >
              {GUT_CHECK_FORM_INFO.lifestyle.feedTime.options.map((option) => (
                <SurveyButton
                  key={option.label}
                  label={option.label}
                  value={option.value}
                  isChecked={isSelected(option.value)}
                  onToggle={onToggle}
                />
              ))}
            </SurveyButtonGroup>
          );
        }}
      />
    </>
  );
}
