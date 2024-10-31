interface SurveyFormData {
  name: string;
  gender: string;
  birth: string;
  oldDog: boolean;
  dogSize: string;
  dogType: string;
  weight: string;
  neutralization: boolean | null;
  activityLevel: string;
  walkingCountPerWeek: string;
  walkingTimePerOneTime: string;
  dogStatus: string;
  specificDogStatus: string;
  specificDogStatusEtc: string;
  snackCountLevel: string;
  waterCountLevel: string;
  supplement: string;
  supplementEtc: string;
  currentMeal: string;
  inedibleFood: string;
  inedibleFoodEtc: string;
  recommendRecipeId: number | null;
  caution: string;
  cautionEtc: string;
  expectedPregnancyDay: string;
  newToRawDiet: boolean | null;
  priorityConcerns: string;
}

interface TextField {
  id: string;
  inputType: "textField";
  title: string;
  placeholder?: string;
  unit?: string;
}

interface ButtonField {
  id: string;
  inputType: "button";
  title: string;
  isMultiSelect?: boolean;
  options: { id: string; value: string | boolean; label: string }[];
}

interface SelectBoxField {
  id: string;
  inputType: "selectBox";
  title: string;
  frontWord?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

interface SearchableSelectBoxField {
  id: string;
  inputType: "searchableSelectBox";
  title: string;
  placeholder: string;
  options: string[];
}

interface DateField {
  id: string;
  inputType: "date";
  title: string;
  years: { label: string; value: string }[];
  months: { label: string; value: string }[];
}

type SurveyField = TextField | ButtonField | SelectBoxField | SearchableSelectBoxField | DateField;

type StepFields = Record<string, SurveyField>;
type SurveyFormInfo = Record<`step${number}`, StepFields>;


export type{SurveyFormData, TextField, ButtonField, SelectBoxField, SearchableSelectBoxField, DateField, SurveyField, StepFields, SurveyFormInfo}