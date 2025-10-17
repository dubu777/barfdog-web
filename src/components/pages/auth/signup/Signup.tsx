"use client";

import {
  signupStepsSchema,
  SignupStepKeys,
  defaultSignupStepValues,
} from "@/utils/validation/auth/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useWatch } from "react-hook-form";
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
import TermsBottomSheet from "./terms/TermsBottomSheet";
import { signupContainer } from "./steps/SignupStep.css";
import Text from "@/components/common/text/Text";
import { buildSignupRequest } from "@/utils/auth/buildSignupRequest";
import { useSignup } from "@/api/auth/mutations/useSignup";

export default function Signup() {
  const router = useRouter();
  const { isOpen, onClose, onToggle } = useModal();
  const { mutate: signup } = useSignup();

  const methods = useForm<yup.InferType<typeof signupStepsSchema>>({
    resolver: yupResolver(signupStepsSchema),
    defaultValues: defaultSignupStepValues,
    mode: "all",
  });

  const {
    formState: { errors },
  } = methods;
  console.log("errors", errors);

  const stepKeys = Object.keys(defaultSignupStepValues) as SignupStepKeys[];

  const {
    currentStep,
    currentStepKey,
    handleNextStep,
    handlePrevStep,
    isFirstStep,
  } = useSurveyStep<SignupStepKeys>(stepKeys);

  const { isCanNextStep } = useSurveyNavigator({
    methods,
    currentStepKey,
    handleNextStep,
    noAutoStepSet: SIGNUP_NO_AUTO_STEP,
    optionalField: SIGNUP_OPTIONAL_FIELDS,
  });

  const onSubmit = () => {
    const formValues = methods.getValues();
    const signupRequest = buildSignupRequest(formValues);

    signup(signupRequest, {
      onSuccess: () => console.log("회원가입 성공"),
      onError: () => console.log("회원가입 실패"),
    });
  };

  const handleConfirmClick = () => {
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
      <FormProvider {...methods}>
        <div className={signupContainer}>
          {currentStep === 1 && <SignupStep1 onNextStep={handleNextStep} />}
          {currentStep === 2 && <SignupStep2 handleNextStep={handleNextStep} />}
          {currentStep === 3 && <SignupStep3 />}
          <ButtonDocked
            type="full-button"
            primaryButtonLabel="확인"
            onPrimaryClick={handleConfirmClick}
            primaryButtonSize="lg"
            isPrimaryDisabled={!isCanNextStep()}
          />
        </div>
        {isOpen && (
          <TermsBottomSheet
            isOpen={true}
            onClose={onClose}
            onSubmit={onSubmit}
          />
        )}
      </FormProvider>
    </>
  );
}
