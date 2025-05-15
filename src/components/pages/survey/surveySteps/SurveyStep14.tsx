import { NONE_VALUE, surveyFormInfo, surveyTitles } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Controller, useFormContext } from "react-hook-form";
import SurveyTitle from "../surveyTitle/SurveyTitle";
import * as styles from "./SurveySteps.css";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import SurveyGridButtonGroup from "../surveyGridButtonGroup/SurveyGridButtonGroup";
import ImageButton from "../imageButton/ImageButton";
import { colStartWrapper } from "../../checkout/common/deliveryAddress/DeliveryAddress.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InfoBox from "@/components/common/infoBox/InfoBox";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  petName: string;
}

export default function SurveyStep14({
  handleChange,
  handleNextStep,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
    <>
      <SurveyTitle
        petName={petName}
        config={surveyTitles.step14}
        chipContent="마지막 질문이에요! 🎉"
        chipColor="red"
      />
      <Controller
        name="step14.healthIssues"
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
              <SurveyGridButtonGroup>
                {surveyFormInfo.dogDietHealth.healthIssues.options.map(
                  (option) => (
                    <ImageButton
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      inputType="checkbox"
                      defaultSvg={option.Icon}
                      selectedSvg={option.SelectedIcon}
                      isChecked={isSelected(option.value)}
                      onToggle={handleToggleAndNext}
                      display="grid"
                    />
                  )
                )}
              </SurveyGridButtonGroup>
          );
        }}
      />
    </>
  );
}
