import { BodyCheckPart } from "@/types/healthNote";
import BodyCheckCard from "../bodyCheckCard/BodyCheckCard";
import { commonWrapper } from "@/styles/common.css";
import * as styles from "./BodyCheckMain.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useRouter } from "next/navigation";

interface BodyCheckMainProps {
  petId: number;
}

export default function BodyCheckMain({ petId }: BodyCheckMainProps) {
  const router = useRouter();
  const bodyCheckSurveyResult = [
    { name: "gut", score: 76, date: "2023-10-01" },
    { name: "skin", score: 85, date: "2023-10-02" },
    { name: "obesity" },
  ];

  const handleCardClick = (part: BodyCheckPart) => {
    router.push(`/health-note/${petId}/body-check/survey/${part}`);
  };

  return (
    <main className={styles.bodyCheckMainContainer}>
      <DefaultText type="title3">
        몇 가지 질문으로
        <br />
        질환 가능성을 예측해 드려요
      </DefaultText>
      <div className={commonWrapper({ gap: 8 })}>
        {bodyCheckSurveyResult.map((result) => (
          <BodyCheckCard
            part={result.name as BodyCheckPart}
            score={result?.score}
            date={result?.date}
            key={result.name}
            onClick={() => handleCardClick(result.name as BodyCheckPart)}
          />
        ))}
      </div>
    </main>
  );
}
