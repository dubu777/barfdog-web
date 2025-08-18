import { DogSize, Gender } from "../survey";

interface ProbiomeSurvey {
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

interface CreateProbiomeRequest {
  kitId: number;
  petId: number;
  survey: ProbiomeSurvey;
}

interface CreateProbiomeResponse {
  success: boolean;
  data: {
    diagnosisId: number;
  };
  message: string | null;
  detailMessage: string | null;
  errorCode: string | null;
}

type ProbiomeStatus =
  | "SUBMITTED"
  | "KIT_PICKUP_REQUESTED"
  | "KIT_PICKUP_DONE"
  | "ANALYZING"
  | "COMPLETED";

interface ProbiomeDto {
  downloadReportUrl: string | null;
  id: number;
  petName: string;
  status: ProbiomeStatus;
  submitDate: string;
}

type ProbiomeList = ProbiomeDto[];

interface ProbiomeDetailResponse {
  diagnosisId: number;
  petName: string;
  status: ProbiomeStatus;
  submitDate: string;
  downloadReportUrl: string;
  survey: ProbiomeSurvey;
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
type SectionType = "healthStatus" | "lifestyle" | "additionalInfo";

// ProbiomeDetailCard에서 사용하는 세분화된 타입들
interface ProbiomeHealthStatus {
  bodyFit: string;
  probioticsStatus: string;
  antibioticsStatus: string;
  allergyStatus: string;
  allergenFoodList: string[];
  pregnancyStatus: string;
  activityLevel: string;
  treatingDiseaseList: string[];
}

interface ProbiomeLifestyle {
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

interface ProbiomeAdditionalInfo {
  healthConcernTypeList: string[];
  acquisitionType: string;
  otherComment: string;
}

// Union type으로 가능한 모든 data 타입 정의
type ProbiomeDetailCardData =
  | ProbiomeHealthStatus
  | ProbiomeLifestyle
  | ProbiomeAdditionalInfo;

// 상세 항목 인터페이스
interface DetailItem {
  label: string;
  value: string | string[];
}

interface ProbiomeKit {
  id: number;
  name: string;
  serialNo: string;
  type: string;
  manufacturer: string;
  manufactureDate: string;
  used: false;
}

interface MemberPreInfo {
  id: number;
  name: string;
  phoneNumber: string;
}

interface PetPreInfo {
  id: number;
  name: string;
  breed: string;
  bodySize: DogSize;
  birthDay: string;
  gender: Gender;
  weight: number;
  neutralization: boolean;
}
interface ProbiomePreInfo {
  kit: ProbiomeKit;
  member: MemberPreInfo;
  pet: PetPreInfo;
}

export type {
  CreateProbiomeRequest,
  CreateProbiomeResponse,
  ProbiomeDto,
  ProbiomeList,
  ProbiomeDetailResponse,
  ProbiomeSurvey,
  ProbiomeHealthStatus,
  ProbiomeLifestyle,
  ProbiomeAdditionalInfo,
  ProbiomeDetailCardData,
  FieldLabels,
  SectionConfig,
  SectionType,
  DetailItem,
  ProbiomeKit,
  PetPreInfo,
  ProbiomePreInfo,
  ProbiomeStatus,
};
