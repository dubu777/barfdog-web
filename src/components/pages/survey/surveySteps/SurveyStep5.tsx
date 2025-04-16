"use client";


import * as styles from "./SurveySteps.css";
import SelectBox from "../selectBox/SelectBox";
import { surveyInputWrapper, surveyTitle } from "@/app/survey/Survey.css";
import { useEffect, useState } from "react";
import { getNameWithPossessiveSuffix2 } from "@/utils";
import { SURVEY_FORM_INFO } from "@/constants";
import { SurveyStepValues } from "@/utils/validation/surveyValidation";
import { Control, Controller, useFormContext } from "react-hook-form";

interface SurveyStepProps {
  handleChange: () => void;
  petName: string;
}

export default function SurveyStep5({
  handleChange,
  petName,
}: SurveyStepProps) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const { control } = useFormContext<SurveyStepValues>();


  return (
<></>
  );
}