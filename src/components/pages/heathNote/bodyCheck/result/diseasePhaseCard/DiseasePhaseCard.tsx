import ResultCard from "../../../common/resultCard/ResultCard";
import { commonWrapper } from "@/styles/common.css";
import SirenIcon from "public/images/healthNote/siren.svg";
import LightIcon from "public/images/healthNote/light-bulb.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import {
  getBodyCheckDiseaseMeta,
  getPhaseDescription,
} from "@/utils/healthNote/bodyCheckScore";
import { DiseaseName, DiseasePhase } from "@/types/healthNote";
import Card from "@/components/common/card/Card";
import { phaseTextStyle } from "./DiseasePhaseCard.css";

interface DiseasePhaseCardProps {
  diseaseName: DiseaseName;
}

export default function DiseasePhaseCard({
  diseaseName,
}: DiseasePhaseCardProps) {
  const phases: DiseasePhase[] = ["초기", "중기", "심화"];
  const { healthGuide } = getBodyCheckDiseaseMeta(diseaseName);
  return (
    <ResultCard gap={12}>
      <Card shadow="light" padding={16} backgroundColor="gray0" gap={8}>
        <div className={commonWrapper({ gap: 8, justify: "start" })}>
          <SvgIcon src={SirenIcon} size={24} />
          <DefaultText type="headline2" applyLineHeight={false}>
            증상별 경과
          </DefaultText>
        </div>
        {phases.map((phase) => (
          <div
            key={phase}
            className={commonWrapper({
              direction: "col",
              gap: 6,
            })}
          >
            <div
              className={commonWrapper({
                justify: "start",
                gap: 8,
                align: "start",
              })}
            >
              <DefaultText
                type="headline2"
                className={phaseTextStyle}
                applyLineHeight={false}
              >
                {phase}
              </DefaultText>
              <DefaultText type="body3" color="gray700">
                {getPhaseDescription(diseaseName, phase)}
              </DefaultText>
            </div>
          </div>
        ))}
      </Card>
      <Card shadow="light" padding={16} backgroundColor="gray0" gap={8}>
        <div className={commonWrapper({ gap: 6, justify: "start" })}>
          <SvgIcon src={LightIcon} size={24} />
          <DefaultText type="headline2">건강 관리 가이드</DefaultText>
        </div>
        <DefaultText type="body3" color="gray700">
          {healthGuide}
        </DefaultText>
      </Card>
    </ResultCard>
  );
}
