import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./SurveyTitle.css";

interface SurveyTitleProps {
  petName: string;
  titleTemplates: string[];
  textType?: "title1" | "title2";
}

export default function SurveyTitle({
  petName,
  titleTemplates,
  textType = "title2",
}: SurveyTitleProps) {
  return (
    <div className={styles.surveyTitleContainer}>
      {titleTemplates.map((template, index) => {
        // {petName} 자리표시자를 실제 petName 값으로 치환
        const text = template.replace("{petName}", petName);
        return <DefaultText key={index} type={textType}>{text}</DefaultText>;
      })}
    </div>
  );
}
