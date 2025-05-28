import { useCallback, useMemo, useState } from "react";
import { FieldValues, FormState, Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SurveyQuestion } from "@/types/healthNote";

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
	const currentValue = watch(currentQuestion?.key as PathValue<TFormValues, Path<TFormValues>>);

	const positiveValue = currentQuestion?.options.find(option => option.key === 'none')?.value as PathValue<TFormValues, Path<TFormValues>>;

	// 버튼 비활성화 여부 계산
	const isButtonDisabled = useMemo(() => {
		// 마지막 질문인 경우 전체 폼 유효성 검사
		if (isLastStep) return !formState.isValid;

		// 다중 선택 질문인 경우 최소 1개 이상 선택
		if (currentQuestion?.multiple) {
			return !(Array.isArray(currentValue) && currentValue.length > 0);
		}

		// 단일 선택 질문인 경우 선택 값이 있는지 여부
		return currentValue === undefined || currentValue === null;
	}, [currentValue, currentQuestion, isLastStep, formState.isValid]);

	// step 인자가 주어지면 해당 스텝으로 강제 이동
	const handleNextStep = useCallback((step?: number) => {
		setCurrentStep((prev) => step ?? Math.min(prev + 1, questions.length));
	}, []);

	const handlePrevStep = useCallback((step?: number) => {
		setCurrentStep((prev) => step ?? Math.max(prev - 1, 1));
	}, []);

	// 옵션 선택 처리
	const handleOptionSelect = useCallback((option: PathValue<TFormValues, Path<TFormValues>>, directPass = false) => {
		const key = currentQuestion.key as Path<TFormValues>;
		let updated: number[] | string[] = [];

		if (currentQuestion.multiple) {
			const prev = watch(key) ?? [];
			const isPositive = option === positiveValue;
			const hasPositive = prev.includes(positiveValue);
			const isSelected = prev.includes(option);

			const maxSelectable = currentQuestion.maxSelectable ?? 2;

			if (isPositive) {
				// 긍정 선택 항목[없어요] 클릭시 토글 처리
				updated = hasPositive ? [] : [option];
				setValue(key, updated as PathValue<TFormValues, Path<TFormValues>>, { shouldValidate: true });

				// 값 존재시 다음 스탭으로 이동
				if (updated.length > 0) handleNextStep();
				return;
			}

			// 긍정 선택 항목[없어요] 이미 선택한 상태에 다른 항목 선택시 긍정 항목 제거 및 일반 다중 선택 토글 처리
			if (hasPositive) {
				updated = [option];
			} else if (isSelected) {
				updated = prev.filter(v => v !== option);
			} else {
				if (prev.length >= maxSelectable) {
					return;
				}
				updated = [...prev, option];
			}
			setValue(key, updated as PathValue<TFormValues, Path<TFormValues>>, { shouldValidate: true });

			// 긍정 선택 항목[없어요] 을 선택했거나 2개 이상 선택된 경우 다음 스탭으로 이동
			if (directPass || updated.length >= maxSelectable) handleNextStep();
		} else {
			// 단일 선택인 경우 즉시 다음 스텝
			setValue(key, option, { shouldValidate: true });

			if (onSpecialOptionSelect) {
				onSpecialOptionSelect(option);
			}
			handleNextStep();
		}
	}, [currentQuestion, watch, setValue, handleNextStep, onSpecialOptionSelect]);

	return {
		currentStep,
		currentQuestion,
		currentValue,
		isLastStep,
		isFirstStep,
		isButtonDisabled,
		handleNextStep,
		handlePrevStep,
		handleOptionSelect
	}
}