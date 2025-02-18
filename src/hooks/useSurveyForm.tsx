import { DefaultValues, Path, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SurveyStepKeys } from "@/utils/validation/surveyValidation";

export interface UseFormHandlerOptions {
  mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
  reValidateMode?: "onChange" | "onBlur" | "onSubmit";
}

// 자동 다음 스텝으로 넘어가지 말아야 하는 스텝들을 Set으로 관리합니다.
const noAutoNextStepSet = new Set<SurveyStepKeys>([
  "step1",
  "step6",
  "step12",
  "step13",
  "step15",
]);

// defaultNoneFields도 Set을 사용하여 제외할 필드들을 관리합니다.
const defaultNoneFields = new Set([
  // step7
  "specificDogStatus",
  "specificDogStatusEtc",
  "expectedPregnancyDay",
  // step12
  "supplementEtc",
  // step13
  "inedibleFoodEtc",
  // step15
  "cautionEtc",
]);

/**
 * useSurveyForm 훅은 Yup 스키마와 React Hook Form을 결합하여 폼 상태와 유효성 검증을 쉽게 관리할 수 있도록 도와줍니다.
 *
 * @param schema - Yup 객체 스키마 (검증 규칙 정의)
 * @param defaultValues - 폼의 초기 값 (스키마 기반으로 자동 타입 추론)
 * @param options - React Hook Form 옵션 (mode와 reValidateMode 등)
 */
export function useSurveyForm<S extends yup.ObjectSchema<any>>(
  schema: S,
  defaultValues: DefaultValues<yup.InferType<S>>,
  currentStepKey: SurveyStepKeys,
  handleNextStep: () => void
) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<yup.InferType<S>>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "all",
  });

  const isCanNextStep = () => {
    const stepValues = watch(currentStepKey as Path<yup.InferType<S>>);
    if (!stepValues) return false;

    // defaultNoneFields에 포함된 필드는 검증에서 제외하고, 나머지 필드에 대해 값이 채워졌는지 확인합니다.
    const allFilled = Object.entries(stepValues).every(([key, value]) => {
      if (defaultNoneFields.has(key)) return true;
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return value !== null && value !== undefined;
    });

    const stepErrorKeys = Object.keys(errors).filter((key) =>
      key.startsWith(currentStepKey)
    );
    const noErrors = stepErrorKeys.length === 0;
    return allFilled && noErrors;
  };

  const handleChange = async () => {
    const valid = await trigger(currentStepKey as Path<yup.InferType<S>>);
    // 자동 넘김이 허용되어 있지 않은 스텝이면 아무 작업도 하지 않음
    if (noAutoNextStepSet.has(currentStepKey)) return;

    // 현재 스텝의 모든 필드가 채워지고 에러가 없으면 다음 스텝으로 넘어갑니다.
    if (valid && isCanNextStep()) {
      handleNextStep();
    }
  };

  /**
   * handleBlur: 필드가 포커스를 잃을 때 해당 필드에 대해 검증을 실행한 후,
   * 현재 스텝이 모두 채워지고 에러가 없으면 handleNextStep()을 호출합니다.
   */
  const handleBlur = async (fieldName: string) => {
    const isValidField = await trigger(
      `${currentStepKey}.${fieldName}` as Path<yup.InferType<S>>
    );
    if (isValidField && isCanNextStep()) {
      handleNextStep();
    }
  };

  /**
   * handleKeyDown: 엔터 키 입력 시 해당 필드에 대해 검증을 실행한 후,
   * 현재 스텝이 모두 채워지고 에러가 없으면 handleNextStep()을 호출합니다.
   */
  const handleKeyDown = async (e: React.KeyboardEvent, fieldName: string) => {
    if (e.key === "Enter") {
      const isValidField = await trigger(
        `${currentStepKey}.${fieldName}` as Path<yup.InferType<S>>
      );
      if (isValidField && isCanNextStep()) {
        handleNextStep();
      }
    }
  };


  return {
    register,
    control,
    handleSubmit,
    errors,
    reset,
    watch,
    setValue,
    trigger,
    isValid,
    isCanNextStep: isCanNextStep(),
    handleChange,
    handleBlur,
    handleKeyDown,
  };
}
