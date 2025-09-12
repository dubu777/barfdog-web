"use client";

import Text from "@/components/common/text/Text";
import Header from "@/components/layout/header/Header";
import SurveyProgressBar from "@/components/common/survey/surveyProgressBar/SurveyProgressBar";
import {
  PROBIOME_NO_AUTO_STEP,
  PROBIOME_OPTIONAL_FIELDS,
  PROBIOME_SECTIONS,
} from "@/constants/healthNote/probiome";
import { useSurveyNavigator } from "@/hooks/survey/useSurveyNavigator";
import { SkipCondition, useSurveyStep } from "@/hooks/survey/useSurveyStep";
import {
  defaultProbiomeStepValues,
  ProbiomeStepKeys,
  probiomeStepSchema,
} from "@/utils/validation/probiomeValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useProbiomeStepElements } from "./steps/StepElements";
import SurveyStepViewport from "@/components/common/survey/surveyStepViewport/SurveyStepViewport";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useCreateProbiomeResult } from "@/api/healthNote/probiome/mutations/useCreateProbiomeResult";
import { Gender } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import useModal from "@/hooks/useModal";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
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

  const {
    trigger,
    getValues,
    setValue,
    formState: { errors, isValid },
    watch,
  } = methods;

  console.log("watch", watch());
  console.log("errors", errors);

  const stepKeys = Object.keys(defaultProbiomeStepValues) as ProbiomeStepKeys[];

  // gender가 MALE일 때 step5의 pregnancyStatus를 "NONE"으로 설정
  useEffect(() => {
    if (gender === "MALE") {
      setValue("step5.pregnancyStatus", "NONE");
    }
  }, [gender, setValue]);

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

  const handleSurveySubmit = useCallback(async () => {
    if (!(await trigger())) {
      addToast("유효하지 않은 항목이 있습니다", "above-button");
      return;
    }

    const values = getValues();

    // TODO: petId, kitId를 실제 사용자 데이터에서 가져오도록 수정 필요
    const payload = buildProbiomePayload(values, petId, kitId);

    submitResult(payload);
  }, [trigger, getValues, submitResult, addToast]);

  const handleFooterButtonClick = () => {
    if (isLastStep) {
      onOpen();
    } else {
      handleNextStep();
    }
  };

  console.log("isValid>>>>>>>>>>>>", isValid);

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
        onBack={handlePrevStep}
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
