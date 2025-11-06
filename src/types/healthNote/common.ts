import { ComponentType, SVGProps } from "react";

interface SurveyOption {
  key: string;
  label: string;
  value: number;
}

interface SurveyQuestion {
  key: string;
  label?: string;
  options: SurveyOption[];
  imageUrl?: ComponentType<SVGProps<SVGSVGElement>>;
  title?: string | string[];
  multiple?: boolean;
  flexWrap?: boolean;
}

export type {
  SurveyOption,
  SurveyQuestion,
};
