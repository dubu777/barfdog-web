import { GI_SURVEY_ITEMS } from "@/constants";
import { AnySchema } from "yup";
import * as yup from "yup";

const giSurveySchema = yup.object(
  GI_SURVEY_ITEMS.reduce((acc, q) => {
    acc[q.key] = yup.number().required("필수 선택");
    return acc;
  }, {} as Record<string, AnySchema>)
);

const defaultGiSurveyValues = GI_SURVEY_ITEMS.reduce((acc, q) => {
  acc[q.key] = null;
  return acc;
}, {} as Record<string, number | null>);

export { giSurveySchema, defaultGiSurveyValues };
