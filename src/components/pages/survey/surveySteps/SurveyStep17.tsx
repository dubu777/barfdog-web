import { SurveyFormData } from "@/types/survey";
import { ADDITIONAL_INFO, HEALTH_INFO } from "@/constants";
import SurveyButtonList from "../surveyButtonList/SurveyButtonList";

interface SurveyStep17Props {
  formData: SurveyFormData;
  handleChange: <K extends keyof SurveyFormData>(
    key: K,
    value: SurveyFormData[K],
    isMultiSelect?: boolean
  ) => void;
}

const priorityConcernsToRecommendNum: Record<string, number> = {
  "구토·설사·복통": 5,
  "체중 조절": 6,
  "피로회복": 7,
  "눈물·눈곱": 8,
  "적은 음수량": 9,
  "피부·모질": 10,
  "관절 건강": 11,
  "자견 발육": 12,
  "노령견 건강": 13,
};

export default function SurveyStep17({
  formData,
  handleChange,
}: SurveyStep17Props) {
  const handlePriorityConcernsChange = (selectedLabel: string) => {
    handleChange(ADDITIONAL_INFO.priorityConcerns.name, selectedLabel as string, true);

    const priorityConcerns = formData.priorityConcerns

    const firstSelectedLabel = priorityConcerns[0] || selectedLabel;
    const recommendRecipeId = priorityConcernsToRecommendNum[firstSelectedLabel];

    if (recommendRecipeId) {
      handleChange("recommendRecipeId", recommendRecipeId as number);
    }
  };
  return (
      <SurveyButtonList
        options={ADDITIONAL_INFO.priorityConcerns.options}
        name={ADDITIONAL_INFO.priorityConcerns.name}
        title={ADDITIONAL_INFO.priorityConcerns.title}
        selectedValue={formData.priorityConcerns}
        petName={formData.name}
        layoutType="grid"
        isMultiSelect
        onChange={(value) =>
          handlePriorityConcernsChange(value as string)
        }
      />
  );
}
