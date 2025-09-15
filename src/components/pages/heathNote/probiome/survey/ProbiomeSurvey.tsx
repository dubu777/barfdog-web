"use client";

import { useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateProbiomeResult } from "@/api/healthNote/probiome/mutations/useCreateProbiomeResult";
import { useToastStore } from "@/store/useToastStore";
import { useSurveyNavigator } from "@/hooks/survey/useSurveyNavigator";
import { SkipCondition, useSurveyStep } from "@/hooks/survey/useSurveyStep";
import useModal from "@/hooks/useModal";
import { useProbiomeStepElements } from "./steps/StepElements";
import Text from "@/components/common/text/Text";
import Header from "@/components/layout/header/Header";
import SurveyProgressBar from "@/components/common/survey/surveyProgressBar/SurveyProgressBar";
import SurveyStepViewport from "@/components/common/survey/surveyStepViewport/SurveyStepViewport";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import {
  PROBIOME_NO_AUTO_STEP,
  PROBIOME_OPTIONAL_FIELDS,
  PROBIOME_SECTIONS,
} from "@/constants/healthNote/probiome";
import { Gender } from "@/types";
import {
  defaultProbiomeStepValues,
  ProbiomeStepKeys,
  probiomeStepSchema,
} from "@/utils/validation/probiomeValidation";
import { buildProbiomePayload } from "@/utils/healthNote/probiome/buildProbiomePayload";

interface ProbiomeSurveyProps {
  petId: number;
  kitId: number;
  petName: string;
  gender: Gender;
}

export default function ProbiomeSurvey({
  petId,
  kitId,
  petName,
  gender,
}: ProbiomeSurveyProps) {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useModal();

  const addToast = useToastStore((state) => state.addToast);

  const { mutate: submitResult } = useCreateProbiomeResult({
    onSuccess: (res) => {
      if (res.success) {
        router.push(`/health-note/${petId}/probiome`);
        addToast("장내 미생물 설문이 완료됐어요", "above-button");
      } else {
        addToast("장내 미생물 설문에 실패했어요", "above-button");
      }
    },
    onError: () => {
      addToast("장내 미생물 설문에 실패했어요", "above-button");
    },
  });

  const methods = useForm<yup.InferType<typeof probiomeStepSchema>>({
    resolver: yupResolver(probiomeStepSchema),
    defaultValues: defaultProbiomeStepValues,
    mode: "all",
  });

  const { trigger, getValues, setValue, clearErrors } = methods;

  const stepKeys = Object.keys(defaultProbiomeStepValues) as ProbiomeStepKeys[];

  const skipConditions = useMemo<SkipCondition<ProbiomeStepKeys>[]>(
    () => [
      {
        from: "step4",
        to: "step6",
        predicate: () => gender === "MALE",
      },
    ],
    [gender]
  );

  const CLEAR_ERRORS_ON_PREV = useMemo(
    () => new Set<ProbiomeStepKeys>(["step15"]),
    []
  );

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    isLastStep,
    isFirstStep,
    direction,
  } = useSurveyStep<ProbiomeStepKeys>(stepKeys, skipConditions);

  const { isCanNextStep, handleChange, handleBlur, handleKeyDown } =
    useSurveyNavigator({
      methods,
      currentStepKey,
      handleNextStep,
      noAutoStepSet: PROBIOME_NO_AUTO_STEP,
      optionalField: PROBIOME_OPTIONAL_FIELDS,
    });

  const steps = useProbiomeStepElements({
    handleChange,
    handleBlur,
    handleKeyDown,
    handleNextStep,
    dogName: petName,
  });

  useEffect(() => {
    if (gender === "MALE") {
      setValue("step5.pregnancyStatus", "NONE");
    }
  }, [gender, setValue]);

  const handleSurveySubmit = useCallback(async () => {
    if (!(await trigger())) {
      addToast("유효하지 않은 항목이 있습니다", "above-button");
      return;
    }
    const values = getValues();
    const payload = buildProbiomePayload(values, petId, kitId);

    submitResult(payload);
  }, [trigger, getValues, submitResult, addToast, petId, kitId]);

  const handleFooterButtonClick = () => {
    if (isLastStep) {
      onOpen();
    } else {
      handleNextStep();
    }
  };

  // 뒤로 가기 시 에러 클리어
  const handlePrevStepWithClear = useCallback(() => {
    if (CLEAR_ERRORS_ON_PREV.has(currentStepKey)) {
      clearErrors(["step15"]);
    }
    handlePrevStep();
  }, [currentStepKey, clearErrors, handlePrevStep, CLEAR_ERRORS_ON_PREV]);

  return (
    <div>
      <Header
        leftElement={
          !isFirstStep && (
            <Text type="headline3" color="gray700">
              이전
            </Text>
          )
        }
        showBackButton={!isFirstStep}
        showCloseButton
        onClose={() => router.back()}
        onBack={handlePrevStepWithClear}
        backgroundColor="gray50"
        leftSlotGap="sm"
      />
      <SurveyProgressBar
        currentStep={currentStep}
        sections={PROBIOME_SECTIONS}
      />
      <FormProvider {...methods}>
        <SurveyStepViewport
          currentStep={currentStep}
          direction={direction}
          steps={steps}
        />
      </FormProvider>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={isLastStep ? "결과 보기" : "다음"}
        onPrimaryClick={handleFooterButtonClick}
        isPrimaryDisabled={!isCanNextStep()}
      />
      <AlertModal
        title="문진을 제출하시겠어요?"
        content="한 번 제출한 문진은 다시 수정할 수 없어요"
        confirmText="제출하기"
        cancelText="돌아가기"
        onConfirm={handleSurveySubmit}
        onCancel={onClose}
        onClose={onClose}
        isOpen={isOpen}
      />
    </div>
  );
}
