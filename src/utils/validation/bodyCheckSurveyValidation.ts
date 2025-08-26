import { GASTRO_SURVEY_ITEMS } from "@/constants/healthNote/bodyCheck/gastro";
import { OBESITY_SURVEY_ITEMS } from "@/constants/healthNote/bodyCheck/obesity";
import { SKIN_SURVEY_ITEMS } from "@/constants/healthNote/bodyCheck/skin";
import { AnySchema } from "yup";
import * as yup from "yup";

const gastroSurveySchema = yup.object(
  GASTRO_SURVEY_ITEMS.reduce((acc, q) => {
    acc[q.key] = yup.number().required("필수 선택");
    return acc;
  }, {} as Record<string, AnySchema>)
);

const defaultGastroSurveyValues = GASTRO_SURVEY_ITEMS.reduce((acc, q) => {
  acc[q.key] = null;
  return acc;
}, {} as Record<string, number | null>);

const skinSurveySchema = yup.object(
  SKIN_SURVEY_ITEMS.reduce((acc, q) => {
    acc[q.key] = yup.number().required("필수 선택");
    return acc;
  }, {} as Record<string, AnySchema>)
);

const defaultSkinSurveyValues = SKIN_SURVEY_ITEMS.reduce((acc, q) => {
  acc[q.key] = null;
  return acc;
}, {} as Record<string, number | null>);

const obesitySurveySchema = yup.object(
  OBESITY_SURVEY_ITEMS.reduce((acc, q) => {
    acc[q.key] = yup.number().required("필수 선택");
    return acc;
  }, {} as Record<string, AnySchema>)
);

const defaultObesitySurveyValues = OBESITY_SURVEY_ITEMS.reduce((acc, q) => {
  acc[q.key] = null;
  return acc;
}, {} as Record<string, number | null>);

export {
  gastroSurveySchema,
  defaultGastroSurveyValues,
  skinSurveySchema,
  defaultSkinSurveyValues,
  obesitySurveySchema,
  defaultObesitySurveyValues,
};
