import { GUT_CHECK_FORM_INFO } from "@/constants/healthNote/gutCheck";

// 필드의 라벨(key) 가져오기
export function getFieldLabel(fieldKey: string, sectionType: 'healthStatus' | 'lifestyle' | 'additionalInfo'): string {
  const section = GUT_CHECK_FORM_INFO[sectionType];
  const field = section[fieldKey as keyof typeof section] as any;
  
  if (field && typeof field === 'object' && 'key' in field) {
    return field.key as string;
  }
  
  return fieldKey; // key 없으면 원본 필드명 반환
}

// 값을 라벨로 변환하기
export function formatFieldValue(value: string | string[], fieldKey: string, sectionType: 'healthStatus' | 'lifestyle' | 'additionalInfo'): string {
  const EMPTY_TEXT = "없음";
  
  if (Array.isArray(value)) {
    if (value.length === 0) return EMPTY_TEXT;
    
    const formattedValues = value.map(v => {
      const singleValue = formatSingleValue(v, fieldKey, sectionType);
      return singleValue;
    });
    
    return formattedValues.join(", ");
  }
  
  if (!value || value.trim() === "") return EMPTY_TEXT;
  
  return formatSingleValue(value, fieldKey, sectionType);
}

// 단일 값을 라벨로 변환
function formatSingleValue(value: string, fieldKey: string, sectionType: 'healthStatus' | 'lifestyle' | 'additionalInfo'): string {
  const section = GUT_CHECK_FORM_INFO[sectionType];
  const field = section[fieldKey as keyof typeof section] as any;
  
  if (!field || typeof field !== 'object') return value;
  
  // options가 있는 경우
  if ('options' in field && Array.isArray(field.options)) {
    const option = field.options.find((opt: any) => opt.value === value);
    if (option) return option.label;
  }
  
  // groups가 있는 경우 (allergenFoodList, treatingDiseaseList 등)
  if ('groups' in field && Array.isArray(field.groups)) {
    for (const group of field.groups) {
      const option = group.options?.find((opt: any) => opt.value === value);
      if (option) return option.label;
    }
  }
  
  // 매칭되지 않으면 원본 값 반환
  return value;
}