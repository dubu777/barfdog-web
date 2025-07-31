import { Path, useFormContext, useController } from "react-hook-form";
import SurveyTitle from "@/components/common/survey/surveyTitle/SurveyTitle";
import { GUT_CHECK_TITLES } from "@/constants/healthNote/gutCheck";
import { GutCheckStepValues } from "@/utils/validation/gutCheckValidation";
import InputField from "@/components/common/inputField/InputField";

interface SurveyStepProps {
  handleBlur: (fieldName: Path<GutCheckStepValues>) => Promise<void>;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldName: Path<GutCheckStepValues>
  ) => Promise<void>;
  dogName: string;
}

export default function GutCheckStep17({
  handleBlur,
  handleKeyDown,
  dogName,
}: SurveyStepProps) {
  const { control } = useFormContext<GutCheckStepValues>();
  const { field: otherCommentField } = useController({
    name: "step17.otherComment",
    control,
  });

  return (
    <>
      <SurveyTitle dogName={dogName} config={GUT_CHECK_TITLES.step17} />
      <InputField
        {...otherCommentField}
        label="문진 항목 외 기타 특이사항을 적어주세요"
        labelType="headline4"
        labelColor="gray800"
        placeholder="기타 특이 사항을 적어주세요"
        onChange={(e) => {
          otherCommentField.onChange(e);
          console.log("field.name", otherCommentField.name);
        }}
        onKeyDown={(e) => handleKeyDown(e, otherCommentField.name)}
        onBlur={() => handleBlur(otherCommentField.name)}
      />
    </>
  );
}
