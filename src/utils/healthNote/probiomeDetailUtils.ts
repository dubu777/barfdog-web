import { PROBIOME_FORM_INFO } from "@/constants/healthNote/probiome";

// ===== 1) 타입 선언 =====
interface ProbiomeOption {
  value: string;
  label: string;
}

interface ProbiomeGroup {
  options?: ProbiomeOption[];
}

interface ProbiomeField {
  key?: string;
  options?: ProbiomeOption[];
  groups?: ProbiomeGroup[];
}

// PROBIOME_FORM_INFO의 키 ('healthStatus' | 'lifestyle' | 'additionalInfo')
type SectionType = keyof typeof PROBIOME_FORM_INFO;

// 각 섹션은 필드 키 → ProbiomeField 로 매핑된 객체
type ProbiomeSection = Record<string, ProbiomeField>;

// ===== 2) 유틸 함수 수정 =====

// 필드의 라벨(key) 가져오기
export function getFieldLabel(
  fieldKey: string,
  sectionType: SectionType
): string {
  // PROBIOME_FORM_INFO가 이미 올바른 구조를 가진다고 가정
  const section = PROBIOME_FORM_INFO[sectionType] as ProbiomeSection;
  const field = section[fieldKey];

  // key가 있으면 반환, 없으면 원본 fieldKey
  return field?.key ?? fieldKey;
}

// 값을 라벨로 변환하기
export function formatFieldValue(
  value: string | string[] | undefined | null,
  fieldKey: string,
  sectionType: SectionType
): string {
  const EMPTY_TEXT = "없음";

  // null, undefined 체크
  if (value == null) return EMPTY_TEXT;

  if (Array.isArray(value)) {
    if (value.length === 0) return EMPTY_TEXT;
    return value
      .map((v) => formatSingleValue(v, fieldKey, sectionType))
      .join(", ");
  }

  // 문자열 타입 체크 및 trim 안전 호출
  if (typeof value !== 'string' || !value.trim()) return EMPTY_TEXT;
  return formatSingleValue(value, fieldKey, sectionType);
}

// 단일 값을 라벨로 변환
function formatSingleValue(
  value: string,
  fieldKey: string,
  sectionType: SectionType
): string {
  // 안전성 체크
  if (typeof value !== 'string') return String(value || '');
  
  const section = PROBIOME_FORM_INFO[sectionType] as ProbiomeSection;
  const field = section?.[fieldKey];
  if (!field) return value;

  // options가 있는 경우
  if (field.options) {
    const opt = field.options.find((o) => o.value === value);
    if (opt) return opt.label;
  }

  // groups가 있는 경우
  if (field.groups) {
    for (const group of field.groups) {
      const opt = group.options?.find((o) => o.value === value);
      if (opt) return opt.label;
    }
  }

  // 매칭되지 않으면 원본 값 반환
  return value;
}
