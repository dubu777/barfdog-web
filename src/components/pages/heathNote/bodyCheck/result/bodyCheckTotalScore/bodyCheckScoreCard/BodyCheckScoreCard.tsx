import Chips from "@/components/common/chips/Chips";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import { DiseaseName } from "@/types/healthNote";
import {
  getBodyCheckDiseaseMeta,
  getBodyCheckScoreStatus,
} from "@/utils/healthNote/bodyCheckScore";

interface BodyCheckScoreCardProps {
  diseaseName: DiseaseName;
  score: number;
}

export default function BodyCheckScoreCard({
  diseaseName,
  score,
}: BodyCheckScoreCardProps) {
  const { label, color } = getBodyCheckScoreStatus(diseaseName, score);
  const { koreanName, scoreDescription } = getBodyCheckDiseaseMeta(diseaseName);
  console.log(
    `Disease: ${diseaseName}, Score: ${score}, Label: ${label}, Color: ${color}`
  );

  return (
    <div
      className={commonWrapper({
        direction: "col",
        gap: 12,
        padding: 12,
        backgroundColors: "gray0",
        borderRadius: 8,
        align: "start",
      })}
    >
      <div className={commonWrapper({ justify: "between" })}>
        <DefaultText type="headline2">{koreanName}</DefaultText>
        <Chips variant="solid" color={color} borderRadius="lg">
          {label}
        </Chips>
      </div>
      <DefaultText type="body3" color="gray700">
        {scoreDescription}
      </DefaultText>
    </div>
  );
}
