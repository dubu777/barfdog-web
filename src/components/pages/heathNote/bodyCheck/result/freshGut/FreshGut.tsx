import { commonWrapper } from "@/styles/common.css";
import ResultCard from "../../../common/resultCard/ResultCard";
import { freshGutInfoBox } from "../BodyCheckResult.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Microbe from "public/images/healthNote/body-check/microbe.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";

export default function FreshGut() {
  return (
    <ResultCard
      gap={20}
      title={`장내 미생물 균현이 무너지면\n위장이 예민해질 수 있어요`}
    >
      <div className={freshGutInfoBox}>
        <div className={commonWrapper({ gap: 6, justify: "start" })}>
          <SvgIcon src={Microbe} size={24} />
          <DefaultText type="headline2" color="red">
            장내 미생물 균형
          </DefaultText>
        </div>
        <DefaultText type="body3" color="gray700">
          장염이나 설사처럼 자주 반복되는 증상은 장내 미생물 균형이 무너졌다는
          신호일 수 있어요 우리 아이의 장 속 미생물을 확인하여 관리해보세요
        </DefaultText>
      </div>
    </ResultCard>
  );
}
