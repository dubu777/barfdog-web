import { commonWrapper } from "@/styles/common.css";
import { phaseTextStyle } from "../BodyCheckResult.css";
import SirenIcon from "public/images/healthNote/siren.svg";
import LightIcon from "public/images/healthNote/light-bulb.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Card from "@/components/common/card/Card";
import ResultCard from "../../../common/resultCard/ResultCard";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { getPhaseDescription } from "@/utils/healthNote/bodyCheck/bodyCheckScore";
import { DiseaseCategoryKey, DiseasePhaseType } from "@/types/healthNote/bodyCheck";
import { BODY_CHECK_DISEASE_INFO, DISEASE_PHASES_LIST } from "@/constants/healthNote/bodyCheck/common";

interface DiseasePhaseProps {
  diseaseName: DiseaseCategoryKey;
}

export default function DiseasePhase({ diseaseName }: DiseasePhaseProps) {
  const { management } = BODY_CHECK_DISEASE_INFO[diseaseName];

  return (
    <ResultCard gap={12} title={`${BODY_CHECK_DISEASE_INFO[diseaseName].name}이\n의심된다면 이렇게 관리해 주세요`}>
      <Card shadow="light" padding={16} backgroundColor="gray0" gap={8}>
        <div className={commonWrapper({ gap: 8, justify: "start" })}>
          <SvgIcon src={SirenIcon} size={24} />
          <DefaultText type="headline2" applyLineHeight={false}>
            증상별 경과
          </DefaultText>
        </div>
        {DISEASE_PHASES_LIST.map((phase, index) => (
          <div
            key={`${phase.value}-${index}`}
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
                {phase.label}
              </DefaultText>
              <DefaultText type="body3" color="gray700">
                {getPhaseDescription(diseaseName, phase.value as DiseasePhaseType)}
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
          {management}
        </DefaultText>
      </Card>
    </ResultCard>
  );
}
