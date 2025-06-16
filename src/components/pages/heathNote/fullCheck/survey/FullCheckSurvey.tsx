"use client";
import * as yup from "yup";
import * as styles from "./FullCheckSurvey.css";
import { pointColor } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { Controller, useWatch } from "react-hook-form";
import BackIcon from "/public/images/header/chevron-left.svg";
import Header from "@/components/layout/header/Header";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useHealthNoteStore } from "@/store/useHealthNoteStore";
import { useSurveyFlow } from "@/hooks/healthNote/useSurveyFlow";
import { DISEASE_CATEGORY_LIST } from "@/constants";
import { AnySchema } from "yup";
import { createCleanedEntries } from "@/utils/healthNote/createCleanedEntries";

const fullCheckSurveySchema = yup.object(
  DISEASE_CATEGORY_LIST.reduce((acc, q) => {
    acc[q.key] = q.multiple
      ? yup.array().of(yup.number()).min(1, "최소 1개 선택")
      : yup.number().required("필수 선택");
    return acc;
  }, {} as Record<string, AnySchema>)
);

// 초기값 정의
const defaultFullCheckSurveyValues = DISEASE_CATEGORY_LIST.reduce((acc, q) => {
  acc[q.key] = q.multiple ? ([] as number[]) : null;
  return acc;
}, {} as Record<string, number | number[] | null>);

const FullCheckSurvey = () => {
  const router = useRouter();

  const { control, setValue, watch, handleSubmit, formState } = useFormHandler(
    fullCheckSurveySchema,
    defaultFullCheckSurveyValues
  );
  const { dogInfo } = useHealthNoteStore();
  const walkValue = useWatch({ control, name: "walk" });

  const onSpecialOptionSelect = (option) => {
    if (currentQuestion.key === "walk" && option === 0) {
      setValue("walkTime", 0);
      handleNextStep(currentStep + 1);
      return;
    }
  };

  const {
    currentStep,
    currentQuestion,
    isFirstStep,
    isLastStep,
    isButtonDisabled,
    handlePrevStep,
    handleNextStep,
    handleOptionSelect,
  } = useSurveyFlow({
    questions: DISEASE_CATEGORY_LIST,
    onSpecialOptionSelect,
    watch,
    setValue,
    formState,
    control,
  });

  const title =
    (typeof currentQuestion?.title === "string" &&
      currentQuestion?.title?.split("@")) ||
    "";

  const onPrevStep = () => {
    // 산책 횟수 값(walk)이 0인 경우 산책 시간 값(walkTime) 2단계 전으로 이동
    if (currentStep === 4 && walkValue === 0) {
      handlePrevStep(currentStep - 2);
    } else {
      handlePrevStep();
    }
  };

  const onNextStep = () => {
    // 마지막 질문 버튼 활성화시 제출 처리
    if (isLastStep && !isButtonDisabled) {
      handleSubmit(onSubmit)();
    } else {
      handleNextStep();
    }
  };

  const onSubmit = (data: typeof defaultFullCheckSurveyValues) => {
    const cleaned = createCleanedEntries(data, (key, value, fullData) => {
      if (key === "walkTime") return []; // walkTime 제거
      if (key === "walk") {
        // walk * walkTime 계산
        const total = (value as number) * (fullData.walkTime as number);
        // 8시간 이상 (≥ 480분)
        // 5–7시간 (300–479분)
        // 1–4시간 (60–299분)
        // 0시간 (0–59분)
        const score = total >= 480 ? 4 : total >= 300 ? 2 : total >= 60 ? 1 : 0;
        return [["walk", score]];
      }
    });

    const totalScore = Object.values(cleaned).reduce((sum: number, val) => {
      return typeof val === "number" ? sum + val : sum;
    }, 0);

    setTimeout(() => {
      router.push(`/health-note/full-check/result/${1}?score=${totalScore}`);
    }, 2000);
  };

  return (
    <NavigationGuard>
      <Header
        backgroundColor='gray50'
        leftElement={
          !isFirstStep && (
            <div className={styles.fullCheckSurveyHeader}>
              <SvgIcon
                src={BackIcon}
                size={24}
                color="gray900"
                onClick={onPrevStep}
              />
              <DefaultText type="headline3" color="gray500">
                이전
              </DefaultText>
            </div>
          )
        }
        onClose={() => router.back()}
        showCloseButton
      />
      <section className={styles.fullCheckSurveyContainer}>
        <article className={styles.fullCheckSurveyTitle}>
          <SvgIcon src={currentQuestion.imageUrl!} size={64} />
          <DefaultText type="title3">
            {currentQuestion?.title ? (
              <>
                {dogInfo ? `${dogInfo.name}` : "반려견"}의<br />
                <span className={pointColor}>{title[0]}</span>
                {title[1]}
              </>
            ) : (
              <>
                <span className={pointColor}>
                  {currentQuestion?.label} 관련 나타나는
                </span>
                <br />
                증상을 모두 체크해 주세요
              </>
            )}
          </DefaultText>
        </article>
        <article
          className={styles.surveyAnswerList({
            flexWrap: currentQuestion?.flexWrap || false,
          })}
        >
          <Controller
            control={control}
            name={currentQuestion?.key}
            render={({ field }) => (
              <>
                {currentQuestion?.options.map((option) => {
                  const watchedValue = watch(field.name);
                  const isSelected = currentQuestion?.multiple
                    ? Array.isArray(watchedValue) &&
                      watchedValue.includes(option.value as number)
                    : watchedValue === option.value;
                  return (
                    <div
                      key={option.label}
                      style={{
                        width: currentQuestion?.flexWrap
                          ? "calc(50% - 6px)"
                          : "100%",
                      }}
                    >
                      <SurveyButton
                        key={option.label}
                        label={option.label}
                        value={option.value}
                        inputType="checkbox"
                        onToggle={() => handleOptionSelect(option)}
                        isChecked={isSelected}
                      />
                    </div>
                  );
                })}
              </>
            )}
          />
        </article>
      </section>
      {currentStep >= 4 &&
        <ButtonDocked
          type="full-button"
          primaryButtonLabel={isLastStep ? "결과 보기" : "다음"}
          onPrimaryClick={onNextStep}
          isPrimaryDisabled={isButtonDisabled}
        />
      }
    </NavigationGuard>
  );
};

export default FullCheckSurvey;
