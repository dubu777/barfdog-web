import { NONE_VALUE, surveyFormInfo, surveyTitles } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import * as styles from "./SurveySteps.css";
import SurveyButton from "../surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import useModal from "@/hooks/useModal";
import InedibleBottomSheet from "../bottomSheet/InedibleFoodBottomSheet";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  petName: string;
}

export default function SurveyStep10({
  handleChange,
  handleNextStep,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();
  const { isOpen, onToggle, onClose } = useModal();
  return (
    <>
      <SurveyTitle
        petName={petName}
        config={surveyTitles.step10}
        infoBoxContent="알러지 분류 참고사항"
        onInfoBoxClick={onToggle}
      />
      <Controller
        name="step10.inedibleFood"
        control={control}
        render={({ field }) => {
          const { onToggle, isSelected } = useSurveyToggleOption(
            field.value,
            "checkbox",
            (value) => {
              field.onChange(value);
              handleChange();
            }
          );

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
              {surveyFormInfo.dogLifestyle.inedibleFood.options.map(
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
