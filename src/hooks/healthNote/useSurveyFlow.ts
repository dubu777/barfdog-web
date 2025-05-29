import { useCallback, useMemo, useState } from "react";
import {
  Control,
  FieldValues,
  FormState,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { SurveyOption, SurveyQuestion } from "@/types/healthNote";
import { POSITIVE_KEY } from "@/constants";

interface UseSurveyFlowProps<TFormValues extends FieldValues> {
  questions: SurveyQuestion[];
  onSpecialOptionSelect?: (option: number) => void;
  watch: UseFormWatch<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  formState: FormState<TFormValues>;
}

export const useSurveyFlow = <TFormValues extends FieldValues>({
  questions,
  onSpecialOptionSelect,
  watch,
  setValue,
  formState,
}: UseSurveyFlowProps<TFormValues>) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === questions.length;

  const currentQuestion = questions[currentStep - 1];
  const { options, multiple = false } = currentQuestion;
  const fieldKey = currentQuestion.key as Path<TFormValues>;
  const currentValue = watch(fieldKey) as PathValue<
    TFormValues,
    Path<TFormValues>
  >;

  const isButtonDisabled = useMemo(() => {
    if (isLastStep) return !formState.isValid;
    if (multiple) {
      return !(Array.isArray(currentValue) && currentValue.length > 0);
    }
    return currentValue == null;
  }, [currentValue, multiple, isLastStep, formState.isValid]);

  // step을 지정하면 해당 단계로, 아니면 현재+1로 이동
  const handleNextStep = useCallback(
    (step?: number) =>
      setCurrentStep((prev) =>
        step != null ? step : Math.min(prev + 1, questions.length)
      ),
    [questions.length]
  );

  // step을 지정하면 해당 단계로, 아니면 현재-1로 이동
  const handlePrevStep = useCallback(
    (step?: number) =>
      setCurrentStep((prev) => (step != null ? step : Math.max(prev - 1, 1))),
    [questions.length]
  );

  // 옵션 선택 함수
  const handleOptionSelect = (selectedOption: SurveyOption) => {
    const selectedValue = selectedOption.value;
    const previousSelections = (watch(fieldKey) as number[]) ?? [];
    console.log("currentValue", currentValue);

    if (multiple) {
      // 1) "없어요" 옵션 선택 시: 기존 선택 모두 제거하고 none만 남김, 자동 다음 단계
      if (selectedOption.key === POSITIVE_KEY) {
        const newSelections = [selectedValue];
        setValue(
          fieldKey,
          newSelections as PathValue<TFormValues, Path<TFormValues>>,
          { shouldValidate: true }
        );
        handleNextStep();
        return;
      }

      // 2) 일반 옵션 클릭
      //   a) 만약 이전에 none이 선택되어 있었다면 none 제거
      const selectionsWithoutNone = previousSelections.filter((value) => {
        const option = options.find((o) => o.value === value);
        return option?.key !== POSITIVE_KEY;
      });

      //    b) 토글 on/off
      const isAlreadySelected = selectionsWithoutNone.includes(selectedValue);
      const newSelections = isAlreadySelected
        ? selectionsWithoutNone.filter((value) => value !== selectedValue)
        : [...selectionsWithoutNone, selectedValue];

      setValue(
        fieldKey,
        newSelections as PathValue<TFormValues, Path<TFormValues>>,
        { shouldValidate: true }
      );
      return;
    } else {
      // 단일 선택: 항상 선택 즉시 다음 단계
      setValue(
        fieldKey,
        selectedValue as PathValue<TFormValues, Path<TFormValues>>,
        { shouldValidate: true }
      );
      onSpecialOptionSelect?.(selectedValue);

      handleNextStep();
    }
  };

  return {
    currentStep,
    currentQuestion,
    currentValue,
    isLastStep,
    isFirstStep,
    isButtonDisabled,
    handleNextStep,
    handlePrevStep,
    handleOptionSelect,
  };
};
