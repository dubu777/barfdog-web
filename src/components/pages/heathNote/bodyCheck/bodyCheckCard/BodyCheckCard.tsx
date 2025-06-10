import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import ArrowIcon from "public/images/icons/chevron-right.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { format } from "date-fns";
import * as styles from "./BodyCheckCard.css";
import GutIcon from "public/images/survey/Icon-Bowel.svg";
import SkinIcon from "public/images/survey/Icon-Skin.svg";
import ObesityIcon from "public/images/survey/Icon-Diet.svg";
import { BodyCheckPart } from "@/types/healthNote";

interface BodyCheckCardProps {
  part: BodyCheckPart;
  score?: number;
  date?: string;
  onClick?: () => void;
}

export default function BodyCheckCard({
  part,
  score,
  date,
  onClick,
}: BodyCheckCardProps) {
  const partConfig = {
    gut: { label: "위/장", Icon: GutIcon },
    skin: { label: "피부", Icon: SkinIcon },
    obesity: { label: "비만", Icon: ObesityIcon },
  } as const;

  const { label, Icon: PartIcon } = partConfig[part];

  return (
    <div className={styles.bodyCheckCardContainer} onClick={onClick}>
      <div className={commonWrapper({ justify: "between" })}>
        <DefaultText type="headline2">{label}</DefaultText>
        <SvgIcon src={ArrowIcon} color="gray500" size={16} />
      </div>

      {score && date ? (
        <div className={commonWrapper({ direction: "col", gap: 4 })}>
          {/* 결과 뷰 */}
          <DefaultText type="title4">{score}점</DefaultText>
          <div className={styles.bar}>
            <div
              className={styles.barProgress({ part })}
              style={{ width: `${score}%`, height: "100%" }}
            />
          </div>
          <DefaultText type="caption" color="gray600">
            {format(new Date(date), "yyyy.MM.dd")}
          </DefaultText>
        </div>
      ) : (
        <div className={commonWrapper({ justify: "end" })}>
          {/* 결과 없을 때 아이콘 */}
          <SvgIcon src={PartIcon} size={60} />
        </div>
      )}
    </div>
  );
}
