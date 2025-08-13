import { ComponentType, SVGProps } from "react";
import { BODY_PART_TO_CATEGORY } from "@/constants";
import { DOG_SIZE } from "@/constants/dog";

interface PetInfo {
  id: number;
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

interface DiseaseInfo {
  category: string;
  ko: string;
  en: string;
  diagnosis: string;
  causes: string;
  symptoms: string;
  management: string;
  value: number;
}

type DiseaseCategoryKey = keyof typeof BODY_PART_TO_CATEGORY;

type DiseaseCategory = (typeof BODY_PART_TO_CATEGORY)[DiseaseCategoryKey];

interface DiseaseData {
  categoryKey: DiseaseCategoryKey;
  category: DiseaseCategory;
  categoryImage: ComponentType<SVGProps<SVGSVGElement>>;
  disease: DiseaseInfo;
  score: number;
  diseaseKey: string;
}

interface Product {
  title: string;
  itemName: string;
  description: string;
  tag?: string;
}

// { ...Product } 형태
interface FlatProduct extends Product {
  tag: string;
}

// { tag: '', dogSize: '', products: ...Product[] } 형태
interface GroupedProduct {
  tag: string;
  dogSize?: keyof typeof DOG_SIZE;
  products: Product[];
}

// 유니언 타입 FlatProduct, GroupedProduct 둘 중 하나일 수 있음
type RecommendProduct = FlatProduct[] | GroupedProduct;

type BodyCheckPart = "gut" | "skin" | "obesity";

/**
 * 2) 영어 키로 들어오는 질병 이름 타입 정의
 */
type DiseaseName =
  | "hemorrhagicEnterocolitis" // 출혈성 장염
  | "gastricUlcer" // 위궤양
  | "enteritis" // 장염
  | "ibs" // IBS
  | "lifestyle"; // 생활습관

type DiseasePhaseType = "초기" | "중기" | "심화";

interface BodyCheckRecommendItem {
  step: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  practices: string[];
}

export type {
  PetInfo,
  SurveyOption,
  SurveyQuestion,
  DiseaseInfo,
  DiseaseData,
  Product,
  FlatProduct,
  GroupedProduct,
  RecommendProduct,
  BodyCheckPart,
  DiseaseName,
  DiseasePhaseType,
  BodyCheckRecommendItem,
};
