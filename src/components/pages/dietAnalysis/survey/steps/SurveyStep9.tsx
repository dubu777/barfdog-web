import {
  NONE_VALUE,
  DIET_ANALYSIS_FORM_INFO,
  SURVEY_TITLES,
} from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { useController, useFormContext, useWatch } from "react-hook-form";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useSurveyToggleOption } from "@/hooks/survey/useSurveyToggleOption";
import useModal from "@/hooks/useModal";
import InedibleBottomSheet from "../bottomSheet/InedibleFoodBottomSheet";
import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { PROBIOME_FORM_INFO } from "@/constants/healthNote/probiome";
import SurveyButtonGroup from "@/components/common/survey/surveyButtonGroup/SurveyButtonGroup";
import Chips from "@/components/common/chips/Chips";

interface SurveyStepProps {
  handleChange: () => void;
  handleNextStep: () => void;
  dogName: string;
}

export default function SurveyStep9({
  handleChange,
  handleNextStep,
  dogName,
}: SurveyStepProps) {
  const { control, setValue } = useFormContext<SurveyStepValues>();
  const { isOpen, onToggle: toggleModal, onClose } = useModal();

  // inedibleFoods field controller
  const { field: inedibleStatusField } = useController({
    name: "step9.inedibleFoodStatus",
    control,
  });
  const { field: inedibleField } = useController({
    name: "step9.inedibleFoods",
    control,
  });

  const { onToggle: onStatusToggle, isSelected: isStatusSelected } =
    useSurveyToggleOption<string>({
      selectedValue: inedibleStatusField.value ?? null,
      mode: "radio",
      onChange: (value) => {
        inedibleStatusField.onChange(value);
        handleChange();
        if (value === "NO_ALLERGY") {
          setValue("step9.inedibleFoods", [], {
            shouldValidate: true,
          });
          handleNextStep();
        }
      },
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

  const inedibleFoodStatus = useWatch({
    name: "step9.inedibleFoodStatus",
    control,
  });

  return (
    <>
      <SurveyTitle
        dogName={dogName}
        config={SURVEY_TITLES.step9}
        infoBoxContent="알러지 분류 참고사항"
        onInfoBoxClick={toggleModal}
      />

      <div className={commonWrapper({ align: "start", gap: 8 })}>
        {DIET_ANALYSIS_FORM_INFO.lifestyle.allergyStatus.options.map(
          (option) => (
            <SurveyButton
              key={option.label}
              label={option.label}
              value={option.value}
              isChecked={isStatusSelected(option.value)}
              onToggle={onStatusToggle}
            />
          )
        )}
      </div>
      {inedibleFoodStatus === "HAS_ALLERGY" && (
        <SurveyButtonGroup direction="col" isMultiple>
          {DIET_ANALYSIS_FORM_INFO.lifestyle.allergenFoodList.options.map(
            (option) => (
              <SurveyButton
                key={option.label}
                label={option.label}
                value={option.value}
                inputType="checkbox"
                isChecked={isFoodSelected(option.value)}
                onToggle={() => onFoodToggle(option.value)}
              />
            )
          )}
        </SurveyButtonGroup>
      )}
      <InedibleBottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
}
