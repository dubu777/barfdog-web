import { initialErrorValues, initialSurveyValue } from '@/constants';
import { SurveyFormData } from '@/types/survey';
import { create } from 'zustand';

export type ErrorValuesType = Record<string, Record<string, string | null>>;

interface SurveyStore {
  formData: SurveyFormData;
  canNextStep: boolean;
  errorMessages: ErrorValuesType; 
  updateFormData: (key: keyof SurveyFormData, value: SurveyFormData[keyof SurveyFormData], isMultiSelect?: boolean) => void;
  updateErrorMessages: (stepKey: string, key: string, errorMessage: string | null) => void;
  hasErrorMessages: (stepKey: string) => boolean; 
  setCanNextStep: (canNext: boolean) => void;
  stepLength: () => number;
}

export const useSurveyStore = create<SurveyStore>((set, get) => ({
  formData: initialSurveyValue,
  canNextStep: false,
  errorMessages: initialErrorValues as ErrorValuesType,

  // 설문 폼 데이터 관리
  updateFormData: (key, value, isMultiSelect) => set((state) => {
    if (isMultiSelect) {
      // 만약 값이 "NONE"이라면 기존 배열을 모두 지우고 "NONE"만 배열에 넣음
      if (value === "NONE") {
        return { formData: { ...state.formData, [key]: ["NONE"] } };
      }
  
      // 기존 선택된 배열을 가져옴
      const selectedArray = Array.isArray(state.formData[key]) 
        ? (state.formData[key] as SurveyFormData[keyof SurveyFormData][]) 
        : [];
  
      // "NONE"이 이미 선택된 상태에서 다른 값을 추가할 경우 "NONE"을 제거
      const updatedSelections = selectedArray.includes("NONE")
        ? selectedArray.filter((item) => item !== "NONE")
        : selectedArray;
  
      // 이미 선택된 값이면 제거, 그렇지 않으면 추가
      const newSelection = updatedSelections.includes(value as SurveyFormData[keyof SurveyFormData])
        ? updatedSelections.filter((v) => v !== value)
        : [...updatedSelections, value as SurveyFormData[keyof SurveyFormData]];
  
      return { formData: { ...state.formData, [key]: newSelection } };
    } else {
      return { formData: { ...state.formData, [key]: value } };
    }
  }),

  // 스탭별, 스탭내 항목이 여러개라면 각각 항목의 에러 여부 관리
  updateErrorMessages: (stepKey, key, errorMessage) => set((state) => ({
    errorMessages: {
      ...state.errorMessages,
      [stepKey]: {
        ...state.errorMessages[stepKey],
        [key]: errorMessage,
      },
    },
  })),

  // 스텝 내 에러가 있는지 확인하여 설문 완료 여부 판단
  hasErrorMessages: (stepKey) => {
    const stepErrors = get().errorMessages[stepKey];
    return Object.values(stepErrors).some((errorMessage) => errorMessage !== null);
  },

  // 다음 버튼 활성화
  setCanNextStep: (canNext) => set({ canNextStep: canNext }),
  
  stepLength: () => Object.keys(get().errorMessages).length,
}));
