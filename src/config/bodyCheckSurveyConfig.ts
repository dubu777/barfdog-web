import { GUT_SURVEY_ITEMS, GUT_SURVEY_SECTION } from "@/constants";
import {
  OBESITY_SURVEY_ITEMS,
  OBESITY_SURVEY_SECTION,
} from "@/constants/healthNote/bodyCheck/obesity";
import {
  SKIN_SURVEY_ITEMS,
  SKIN_SURVEY_SECTION,
} from "@/constants/healthNote/bodyCheck/skin";
import { SurveySection } from "@/types";
import { BodyCheckPart, SurveyQuestion } from "@/types/healthNote";
import {
  defaultGutSurveyValues,
  defaultObesitySurveyValues,
  defaultSkinSurveyValues,
  gutSurveySchema,
  obesitySurveySchema,
  skinSurveySchema,
} from "@/utils/validation/bodyCheckSurveyValidation";
import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
import GutIcon from "public/images/healthNote/full-check/gut.svg";
import SkinIcon from "public/images/healthNote/full-check/skin.svg";
import ObesityIcon from "public/images/healthNote/full-check/diet.svg";

export const bodyCheckSurveyConfig: Record<
  BodyCheckPart,
  {
    schema: yup.ObjectSchema<any, any>; // 모두 yup.ObjectSchema 타입
    defaultValues: DefaultValues<Record<string, any>>; // DefaultValues<TFormValues>
    questions: SurveyQuestion[]; // SurveyQuestion[]
    sections: SurveySection[]; // SurveySection[]
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
> = {
  gut: {
    schema: gutSurveySchema,
    defaultValues: defaultGutSurveyValues,
    questions: GUT_SURVEY_ITEMS,
    sections: GUT_SURVEY_SECTION,
    Icon: GutIcon,
  },
  skin: {
    schema: skinSurveySchema,
    defaultValues: defaultSkinSurveyValues,
    questions: SKIN_SURVEY_ITEMS,
    sections: SKIN_SURVEY_SECTION,
    Icon: SkinIcon,
  },
  obesity: {
    schema: obesitySurveySchema,
    defaultValues: defaultObesitySurveyValues,
    questions: OBESITY_SURVEY_ITEMS,
    sections: OBESITY_SURVEY_SECTION,
    Icon: ObesityIcon,
  },
};
