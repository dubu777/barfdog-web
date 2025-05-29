import { ComponentType, SVGProps } from "react";

interface DogInfo {
  dogId: number;
  name: string;
  imageUrl: string | null;
}

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

export type { DogInfo, SurveyOption, SurveyQuestion };
