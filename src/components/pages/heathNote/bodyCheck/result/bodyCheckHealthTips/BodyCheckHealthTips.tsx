import { commonWrapper } from "@/styles/common.css";
import CheckIcon from "public/images/healthNote/body-check/notice-check.svg";
import ResultCard from "../../../common/resultCard/ResultCard";
import ResultAccordion from "../../../common/resultAccordion/ResultAccordion";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Chips from "@/components/common/chips/Chips";
import { CHIPS_COLORS, Colors } from "@/constants/style";
import { bodyCheckChipsStyle } from "../BodyCheckResult.css";
import { BodyCheckHealthTip, BodyPartType } from "@/types/healthNote/bodyCheck";
import { BODY_PART_HEALTH_TIPS } from "@/constants/healthNote/bodyCheck/common";

interface BodyCheckHealthTipsProps {
  part: BodyPartType;
}
export default function BodyCheckHealthTips({
  part,
}: BodyCheckHealthTipsProps) {
  const COLOR_MAP: Record<
    string,
    { iconColor: Colors; chipColor: keyof typeof CHIPS_COLORS }
  > = {
    first: { iconColor: "red", chipColor: "lightPink" },
    second: { iconColor: "blue500", chipColor: "blue50" },
    third: { iconColor: "green500", chipColor: "green50" },
  };
  const { list: tips, title }  = BODY_PART_HEALTH_TIPS[part];

  return (
    <ResultCard gap={12} title={title}>
      {tips.map((item, idx) => {
        const tip = item as BodyCheckHealthTip;
        const { iconColor, chipColor } = COLOR_MAP[tip.step] || {};
        return (
          <ResultAccordion
            key={tip.step ?? idx}
            accordionButton={
              <div className={commonWrapper({ justify: "start", gap: 6 })}>
                <SvgIcon src={item.icon} color={iconColor} />
                <DefaultText type="headline4">{item.title}</DefaultText>
              </div>
            }
          >
            <div
              className={commonWrapper({ direction: "col", align: "start" })}
            >
              <DefaultText type="body3" color="gray700">
                {item.description}
              </DefaultText>
              <Chips
                variant="solid"
                color={chipColor}
                className={bodyCheckChipsStyle}
              >
                실천방법
              </Chips>
              <ul
                className={commonWrapper({
                  direction: "col",
                  gap: 8,
                  align: "start",
                })}
              >
                {item.practices.map((p) => (
                  <li
                    key={p}
                    className={commonWrapper({
                      justify: "start",
                      align: "start",
                      gap: 6,
                    })}
                  >
                    <SvgIcon src={CheckIcon} color={iconColor} size={20} />
                    <DefaultText type="body3">{p}</DefaultText>
                  </li>
                ))}
              </ul>
            </div>
          </ResultAccordion>
        );
      })}
    </ResultCard>
  );
}
