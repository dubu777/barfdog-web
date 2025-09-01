import { commonWrapper } from "@/styles/common.css";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import { getBodyCheckScoreStatus } from "@/utils/healthNote/bodyCheck/bodyCheckScore";
import { DiseaseCategoryKey } from "@/types/healthNote/bodyCheck";
import { BODY_CHECK_DISEASE_INFO } from "@/constants/healthNote/bodyCheck/common";

interface BodyCheckScoreCardProps {
  diseaseName: DiseaseCategoryKey;
  score: number;
}

export default function BodyCheckDiseaseCard({
  diseaseName,
  score,
}: BodyCheckScoreCardProps) {
  const { label, color } = getBodyCheckScoreStatus(diseaseName, score);
  const { name, description } = BODY_CHECK_DISEASE_INFO[diseaseName];

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
        <Text type="headline2">{name}</Text>
        <Chips variant="solid" color={color} borderRadius="lg">
          {label}
        </Chips>
      </div>
      <Text type="body3" color="gray700">
        {description}
      </Text>
    </div>
  );
}
