import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import useDeviceState from "@/hooks/useDeviceState";
import MobileDatePicker from "@/components/common/datePicker/mobileDatePicker/MobileDatePicker";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import { DIET_ANALYSIS_FORM_INFO, SURVEY_TITLES } from "@/constants";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import * as styles from "./StepElements.css";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import { format } from "date-fns";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import { commonWrapper } from "@/styles/common.css";
interface SurveyStepProps {
  handleChange: () => void;
  dogName: string;
  isResurvey: boolean;
}

export default function SurveyStep2({
  handleChange,
  dogName,
  isResurvey,
}: SurveyStepProps) {
  const { isMobileDevice } = useDeviceState();
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle dogName={dogName} config={SURVEY_TITLES.step2} />
      {!isResurvey && (
        <Controller
          name="step2.birthDay"
          control={control}
          render={({ field }) => (
            <>
              {isMobileDevice ? (
                <MobileDatePicker
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(format(date as Date, "yyyy-MM-dd"));
                    handleChange();
                  }}
                  label="생년월일"
                  isRequired
                />
              ) : (
                <CustomDatePicker
                  name={field.name}
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(format(date as Date, "yyyy-MM-dd"));
                  }}
                  dateFormat="yyyy-MM-dd"
                  marginBottom={false}
                />
              )}
            </>
          )}
        />
      )}
      <Controller
        name="step2.oldDog"
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
            <div className={commonWrapper({ align: "start", gap: 8 })}>
              {DIET_ANALYSIS_FORM_INFO.dogBasicInfo.oldDog.options.map(
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
            </div>
          );
        }}
      />
    </>
  );
}
