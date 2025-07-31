import {
  NONE_VALUE,
  DIET_ANALYSIS_FORM_INFO,
  SURVEY_TITLES,
} from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext } from "react-hook-form";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import useModal from "@/hooks/useModal";
import InedibleBottomSheet from "../bottomSheet/InedibleFoodBottomSheet";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";

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
  const { isOpen, onToggle: toggleModal, onClose } = useModal();

  // inedibleFood field controller
  const { field: inedibleField } = useController({
    name: "step10.inedibleFood",
    control,
  });
  const { onToggle: onFoodToggle, isSelected: isFoodSelected } =
    useSurveyToggleOption<string>({
      selectedValue: inedibleField.value ?? null,
      mode: "checkbox",
      onChange: (value) => {
        inedibleField.onChange(value);
        handleChange();
      },
    });

  const handleToggleAndNext = (value: string) => {
    onFoodToggle(value);
    if (value === NONE_VALUE) {
      handleNextStep();
    }
  };

  return (
    <>
      <SurveyTitle
        dogName={dogName}
        config={SURVEY_TITLES.step10}
        infoBoxContent="알러지 분류 참고사항"
        onInfoBoxClick={toggleModal}
      />
      <div
        className={commonWrapper({ direction: "col", align: "start", gap: 12 })}
      >
        <DefaultText type="label2" color="gray500">
          *복수응답가능
        </DefaultText>
        {DIET_ANALYSIS_FORM_INFO.lifestyle.inedibleFood.options.map(
          (option) => (
            <SurveyButton
              key={option.value}
              label={option.label}
              value={option.value}
              inputType="checkbox"
              isChecked={isFoodSelected(option.value)}
              onToggle={() => handleToggleAndNext(option.value)}
            />
          )
        )}
      </div>
      <InedibleBottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
}
