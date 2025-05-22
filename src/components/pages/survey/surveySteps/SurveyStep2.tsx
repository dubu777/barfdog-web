import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import useDeviceState from "@/hooks/useDeviceState";
import MobileDatePicker from "@/components/common/datePicker/mobileDatePicker/MobileDatePicker";
import { formatDate } from "@/utils";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import { surveyFormInfo, surveyTitles } from "@/constants";
import SurveyButton from "../surveyButton/SurveyButton";
import * as styles from "./SurveySteps.css";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import { format } from "date-fns";
interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
  isResurvey: boolean;
}

export default function SurveyStep2({
  handleChange,
  petName,
  isResurvey,
}: SurveyStepProps) {
  const { isMobileDevice } = useDeviceState();
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle petName={petName} config={surveyTitles.step2} />
      {!isResurvey && (
        <Controller
          name="step2.birthDate"
          control={control}
          render={({ field }) => (
            <>
              {isMobileDevice ? (
                <MobileDatePicker
                  value={formatDate(field.value, "onlyDateDash")}
                  onChange={(date) => {
                    field.onChange(date);
                    handleChange();
                  }}
                  label="생년월일"
                  isRequired
                />
              ) : (
                <CustomDatePicker
                  name="birthday"
                  value={formatDate(field.value, "onlyDateDash")}
                  onChange={(date) => {
                    const selected: Date | null = Array.isArray(date)
                      ? date[0]
                      : date;

                    const formatted = selected
                      ? format(selected, "yyyy-MM-dd")
                      : "";
                    field.onChange(formatted);
                    handleChange();
                  }}
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
              {surveyFormInfo.dogBasicInfo.oldDog.options.map((option) => (
                <SurveyButton
                  key={option.label}
                  label={option.label}
                  value={option.value}
                  inputType="normal"
                  isChecked={isSelected(option.value)}
                  onToggle={onToggle}
                />
              ))}
            </div>
          );
        }}
      />
    </>
  );
}
