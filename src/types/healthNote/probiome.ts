import { FileChangeInfo } from "../common";
import { DogSize, Gender } from "../survey";

interface FileUrl {
  url: string;
}

interface ProbiomeSurvey {
  bodyFit: string; // "NORMAL" 등
  probioticsStatus: string; // "TAKING" 등
  probioticsProduct: string;
  antibioticsStatus: string; // "TAKING" 등
  allergyStatus: string; // "HAS_ALLERGY" 등
  allergenFoodList: string[]; // ["APPLE", "BEEF"] 등
  activityLevel: string; // "NORMAL" 등
  treatingDiseaseList: string[]; // ["HEART_DISEASE", ...]
  foodType: string; // "DRY" 등
  feedType: string; // "RESTRICTED" 등
  feedTime: string; // "NOON" 등
  foodProduct: string;
  defecationHabit: string; // "INDOOR" 등
  snackLevel: string; // "LOW" 등
  cohabitingPetList: string[]; // ["DOG", "CAT"] 등
  supplementTypeList: string[]; // ["IMMUNE", "TEETH"] 등
  supplementProduct: string;
  pregnancyStatus: string; // "PREGNANCY_EARLY" 등
  /** 필드명 변경: healthConcernTypeList -> healthConcernList */
  healthConcernList: string[]; // ["JOINT_CARE", "TEAR_STAIN"] 등
  acquisitionType: string; // "PURCHASE" 등
  otherComment: string; // "기타 특이사항 내용"
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
  | "SURVEY_SUBMITTED"
  | "KIT_PICKUP_REQUESTED"
  | "KIT_PICKUP_COMPLETED"
  | "ANALYSIS_IN_PROGRESS"
  | "REPORT_COMPLETED";

interface DeliveryAddressInfo {
  addressId: number | null;
  deliveryName: string | null;
  recipientName: string | null;
  phoneNumber: string | null;
  zipCode: string | null;
  city: string | null;
  street: string | null;
  detailAddress: string | null;
}

interface ProbiomeDto {
  diagnosisId: number;
  memberId: number;
  memberName: string;
  petId: number;
  petName: string;
  kitId: number;
  diagnosisStatus: ProbiomeStatus;
  submitDate: string;
  downloadReportUrl: FileUrl | null;
  deliveryInfo: DeliveryAddressInfo;
}

type ProbiomeList = ProbiomeDto[];

interface ProbiomeDiagnosisInfo {
  diagnosisId: number;
  memberId: number;
  memberName: string;
  petId: number;
  petName: string;
  kitId: number;
  diagnosisStatus: ProbiomeStatus;
  submitDate: string; // e.g. "2025-08-21"
  /** 기관 검진 결과 pdf 파일 URL (아직 없을 수 있으므로 null 허용) */
  downloadReportUrl: FileUrl | null;
  /** 배송지 정보 (상세 응답 기준 null 가능성 고려) */
}

interface ProbiomeDefecationFile {
  diagnosisId: number;
  petId: number;
  displayImageUrl: FileUrl;
}

interface ProbiomeDetailResponse {
  /** 미생물 진단 메타 정보(배송지 포함) */
  diagnosisInfo: ProbiomeDiagnosisInfo;
  /** 회수 요청 시 업로드한 똥 사진 파일 목록 */
  defecationFileList: ProbiomeDefecationFile[];
  /** 설문 작성 내용 */
  survey: ProbiomeSurvey;
  defaultDeliveryAddress: DeliveryAddressInfo | null;
  selectedDeliveryAddress: DeliveryAddressInfo | null;
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

interface ProbiomePickupFileItem {
  fileId: number;
  fileName: string;
  folder: string;
  fileStatus: string;
  diagnosisId: number | null;
  displayImageUrl: FileUrl;
}

interface ProbiomeFileChangeInfo {
  addFileList: ProbiomePickupFileItem[];
  deleteFileList: ProbiomePickupFileItem[];
}

interface CreateProbiomePickupResponse {
  diagnosisId: number;
  diagnosisStatus: ProbiomeStatus;
  selectedDeliveryAddress: DeliveryAddressInfo;
  fileChangeInfo: ProbiomeFileChangeInfo;
}

interface CreateProbiomePickupRequest {
  petId: number;
  deliveryAddressId: number;
  fileChangeInfo: FileChangeInfo;
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
  DeliveryAddressInfo,
  ProbiomeFileChangeInfo,
  ProbiomePickupFileItem,
  CreateProbiomePickupResponse,
  CreateProbiomePickupRequest,
};
