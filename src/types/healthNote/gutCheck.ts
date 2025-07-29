import { GUT_CHECK_STATUS } from "@/constants/healthNote/gutCheck";

interface GutCheckSurvey {
  acquisitionType: string;
  activityLevel: string;
  allergenFoodList: string[];
  allergyStatus: string;
  antibioticsStatus: string;
  bodyFit: string;
  cohabitingPetList: string[];
  defecationHabit: string;
  feedTime: string;
  feedType: string;
  foodProduct: string;
  foodType: string;
  healthConcernTypeList: string[];
  otherComment: string;
  pregnancyStatus: string;
  probioticsProduct: string;
  probioticsStatus: string;
  snackLevel: string;
  supplementProduct: string;
  supplementTypeList: string[];
  treatingDiseaseList: string[];
}

interface CreateGutCheckRequest {
  kitId: number;
  petId: number;
  survey: GutCheckSurvey;
}

interface CreateGutCheckResponse {
  success: boolean;
  data: {
    diagnosisId: number;
  };
  message: string | null;
  detailMessage: string | null;
  errorCode: string | null;
}

export type GutCheckStatus = keyof typeof GUT_CHECK_STATUS;

interface GutCheckDto {
  downloadReportUrl: string | null;
  id: number;
  petName: string;
  status: GutCheckStatus;
  submitDate: string;
}

type GutCheckList = GutCheckDto[];

interface GutCheckDetailResponse {
  diagnosisId: number;
  petName: string;
  status: GutCheckStatus;
  submitDate: string;
  downloadReportUrl: string;
  survey: GutCheckSurvey;
}

// 필드의 한글 레이블 매핑
interface FieldLabels {
  [key: string]: string;
}

// 각 섹션별 필드 설정
interface SectionConfig {
  title: string;
  fieldLabels: FieldLabels;
}

// 섹션 타입 정의
type SectionType = 'healthStatus' | 'lifestyle' | 'additionalInfo';

// GutCheckDetailCard에서 사용하는 세분화된 타입들
interface GutCheckHealthStatus {
  bodyFit: string;
  probioticsStatus: string;
  antibioticsStatus: string;
  allergyStatus: string;
  allergenFoodList: string[];
  pregnancyStatus: string;
  activityLevel: string;
  treatingDiseaseList: string[];
}

interface GutCheckLifestyle {
  feedType: string;
  foodType: string;
  foodProduct: string;
  feedTime: string;
  defecationHabit: string;
  snackLevel: string;
  cohabitingPetList: string[];
  supplementTypeList: string[];
  supplementProduct: string;
}

interface GutCheckAdditionalInfo {
  healthConcernTypeList: string[];
  acquisitionType: string;
  otherComment: string;
}

// Union type으로 가능한 모든 data 타입 정의
type GutCheckDetailCardData =
  | GutCheckHealthStatus
  | GutCheckLifestyle
  | GutCheckAdditionalInfo;

// 상세 항목 인터페이스
interface DetailItem {
  label: string;
  value: string | string[];
}

export type {
  CreateGutCheckRequest,
  CreateGutCheckResponse,
  GutCheckDto,
  GutCheckList,
  GutCheckDetailResponse,
  GutCheckSurvey,
  GutCheckHealthStatus,
  GutCheckLifestyle,
  GutCheckAdditionalInfo,
  GutCheckDetailCardData,
  FieldLabels,
  SectionConfig,
  SectionType,
  DetailItem,
};
