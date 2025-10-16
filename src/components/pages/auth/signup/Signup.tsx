"use client";
import {
  signupStepsSchema,
  SignupStepKeys,
  defaultSignupStepValues,
} from "@/utils/validation/auth/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import yup from "yup";
import SignupStep1 from "./steps/SignupStep1";
import SignupStep2 from "./steps/SignupStep2";
import SignupStep3 from "./steps/SignupStep3";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useSurveyStep } from "@/hooks/survey/useSurveyStep";
import { useSurveyNavigator } from "@/hooks/survey/useSurveyNavigator";
import { SIGNUP_NO_AUTO_STEP, SIGNUP_OPTIONAL_FIELDS } from "@/constants/auth";
import Header from "@/components/layout/header/Header";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import TermsBottomSheet from "./termsBottomSheet/TermsBottomSheet";
import { signupContainer } from "./steps/SignupStep.css";
import Text from "@/components/common/text/Text";

export default function Signup() {
  const router = useRouter();
  const { isOpen, onClose, onToggle } = useModal();
  const methods = useForm<yup.InferType<typeof signupStepsSchema>>({
    resolver: yupResolver(signupStepsSchema),
    defaultValues: defaultSignupStepValues,
    mode: "all",
  });
  const {
    watch,
    formState: { errors },
  } = methods;
  console.log("watch", watch());
  console.log("errors", errors);
  const stepKeys = Object.keys(defaultSignupStepValues) as SignupStepKeys[];

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    isLastStep,
    isFirstStep,
    direction,
  } = useSurveyStep<SignupStepKeys>(stepKeys);

  console.log(isLastStep);
  console.log(direction);

  const { isCanNextStep, handleChange } = useSurveyNavigator({
    methods,
    currentStepKey,
    handleNextStep,
    noAutoStepSet: SIGNUP_NO_AUTO_STEP,
    optionalField: SIGNUP_OPTIONAL_FIELDS,
  });

  const onSubmit = () => {
    console.log("제출"); // 임시
  };

  const handleFooterButtonClick = () => {
    if (currentStepKey === "step3") {
      onToggle();
    } else {
      handleNextStep();
    }
  };

  return (
    <>
      <Header
        showBackButton={!isFirstStep}
        onClose={() => router.back()}
        onBack={handlePrevStep}
        showCloseButton
        leftElement={
          !isFirstStep && (
            <Text type="headline3" color="gray700">
              이전
            </Text>
          )
        }
        leftSlotGap="sm"
        backgroundColor="gray50"
      />
      <div className={signupContainer}>
        <FormProvider {...methods}>
          {currentStep === 1 && <SignupStep1 />}
          {currentStep === 2 && <SignupStep2 />}
          {currentStep === 3 && <SignupStep3 handleChange={handleChange} />}
        </FormProvider>
        <ButtonDocked
          type="full-button"
          primaryButtonLabel="확인"
          onPrimaryClick={handleFooterButtonClick}
          primaryButtonSize="lg"
          isPrimaryDisabled={!isCanNextStep()}
        />
      </div>
      {isOpen && (
        <TermsBottomSheet
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
