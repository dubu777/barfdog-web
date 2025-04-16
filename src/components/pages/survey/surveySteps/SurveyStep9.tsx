"use client";


import * as styles from "./SurveySteps.css";
import SelectBox from "../selectBox/SelectBox";
import { surveyInputWrapper, surveyTitle } from "@/app/survey/Survey.css";
import { SURVEY_FORM_INFO } from "@/constants";
import { getNameWithPossessiveSuffix2 } from "@/utils";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, useFormContext } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep9({
  handleChange,
  petName,
}: SurveyStepProps) {
  const { control } = useFormContext<SurveyStepValues>();

  return (
  <></>
  );
}