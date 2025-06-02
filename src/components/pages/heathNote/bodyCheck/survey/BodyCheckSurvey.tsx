"use client";

import * as styles from "./BodyCheckSurvey.css";
import { commonWrapper } from "@/styles/common.css";
import BackIcon from "public/images/header/chevron-left.svg";
import Header from "@/components/layout/header/Header";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SurveyButton from "@/components/pages/survey/surveyButton/SurveyButton";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSurveyFlow } from "@/hooks/healthNote/useSurveyFlow";
import { useRouter } from "next/navigation";
import NavigationGuard from "@/components/common/navigationGuard/NavigationGuard";
import { Controller, FieldValues, Path } from "react-hook-form";
import SurveyProgressBar from "@/components/pages/survey/surveyProgressBar/SurveyProgressBar";
import { BodyCheckPart } from "@/types/healthNote";
import { bodyCheckSurveyConfig } from "@/config/bodyCheckSurveyConfig";

interface BodyCheckSurveyProps {
  part: BodyCheckPart;
}

export default function BodyCheckSurvey({ part }: BodyCheckSurveyProps) {
  const router = useRouter();
  const config = bodyCheckSurveyConfig[part];

  // 혹시 잘못된 part라면 클라이언트에서라도 리다이렉트
  if (!config) {
    router.replace("/health-note/body-check");
    return null;
  }

  const { schema, defaultValues, questions, sections, Icon } = config;
  const { control, setValue, watch, handleSubmit, formState } =
    useFormHandler<FieldValues>(schema, defaultValues);

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
    questions,
    watch,
    setValue,
    formState,
    control,
  });

  console.log("watch", watch());
  return (
    <NavigationGuard>
      <Header
        leftElement={
          !isFirstStep && (
            <div className={styles.bodyCheckSurveyHeader}>
              <SvgIcon
                src={BackIcon}
                size={24}
                color="gray900"
                onClick={() => handlePrevStep()}
              />
              <DefaultText type="headline3" color="gray500">
                이전
              </DefaultText>
            </div>
          )
        }
        onClose={() => router.push("/health-note/body-check")}
        showCloseButton
      />
      <SurveyProgressBar currentStep={currentStep} sections={sections} />
      <section className={styles.bodyCheckSurveyContainer}>
        <article
          className={commonWrapper({
            direction: "col",
            gap: 12,
            align: "start",
          })}
        >
          <SvgIcon src={Icon} size={64} />
          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
            })}
          >
            {(currentQuestion.title as string[]).map((text, idx) => (
              <DefaultText key={idx} type="title3" color="gray900">
                {text}
              </DefaultText>
            ))}
          </div>
        </article>
        <article className={commonWrapper({ direction: "col", gap: 12 })}>
          <Controller
            control={control}
            key={currentQuestion.key}
            name={currentQuestion.key as Path<FieldValues>}
            render={({ field }) => (
              <>
                {currentQuestion?.options.map((option) => (
                  <SurveyButton
                    key={option.key}
                    label={option.label}
                    value={option.value}
                    inputType="checkbox"
                    onToggle={() => {
                      handleOptionSelect(option);
                    }}
                    isChecked={field.value === option.value}
                  />
                ))}
              </>
            )}
          />
        </article>
      </section>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="다음"
        onPrimaryClick={handleNextStep}
        isPrimaryDisabled={isButtonDisabled}
      />
    </NavigationGuard>
  );
}
