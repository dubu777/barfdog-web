"use client";

import { surveyValidation } from "@/utils";
import { SurveyFormData } from "@/types/survey";
import { useSurveyStore } from "@/store/useSurveyStore";
import { useEffect } from "react";

export default function useForm(

) {
  const {
    formData,
    errorMessages,
    updateFormData,
    updateErrorMessages,
    setCanNextStep,
    hasErrorMessages,
  } = useSurveyStore();




  return {

  };
}
