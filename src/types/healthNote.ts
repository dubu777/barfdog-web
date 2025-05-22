import { ComponentType, ReactNode, SVGProps } from "react";

interface DogInfo {
	dogId: number;
	name: string;
	imageUrl: string;
}

interface SurveyOption {
	key: string;
	label: string;
	value: string | number;
}

interface SurveyQuestion {
	key: string;
	label: string;
	options: SurveyOption[];
	imageUrl: string | ComponentType<SVGProps<SVGSVGElement>>;
	title?: string;
	multiple?: boolean;
	flexWrap?: boolean;
}

export type { DogInfo, SurveyOption, SurveyQuestion };