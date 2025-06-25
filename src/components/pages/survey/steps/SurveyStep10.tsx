import {
  NONE_VALUE,
  DIET_ANALYSIS_FORM_INFO,
  SURVEY_TITLES,
} from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../../../common/survey/surveyTitle/SurveyTitle";
import * as styles from "./StepElements.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import useModal from "@/hooks/useModal";
import InedibleBottomSheet from "../bottomSheet/InedibleFoodBottomSheet";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function SurveyStep10({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();
  const { isOpen, onToggle, onClose } = useModal();
  return (
    <>
      <SurveyTitle
        dogName={dogName}
        config={SURVEY_TITLES.step10}
        infoBoxContent="알러지 분류 참고사항"
        onInfoBoxClick={onToggle}
      />
      <Controller
        name="step10.inedibleFood"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption({
            selectedValue: field.value,
            mode: "checkbox",
            onChange: (value) => {
              field.onChange(value);
              handleChange();
            },
          });

          const handleToggleAndNext = (value: string) => {
            onToggle(value);
            if (value === NONE_VALUE) {
              handleNextStep();
            }
          };
          return (
            <div className={styles.colSurveyButtonWrapper}>
              <DefaultText type="label2" color="gray500">
                *복수응답가능
              </DefaultText>
              {DIET_ANALYSIS_FORM_INFO.dogLifestyle.inedibleFood.options.map(
                (option) => (
                  <SurveyButton
                    key={option.label}
                    label={option.label}
                    value={option.value}
                    inputType="checkbox"
                    isChecked={isSelected(option.value)}
                    onToggle={handleToggleAndNext}
                  />
                )
              )}
            </div>
          );
        }}
      />
      <InedibleBottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
}
