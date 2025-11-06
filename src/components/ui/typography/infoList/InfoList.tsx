import Text from "@/components/ui/text/Text";
import InfoText from "../infoText/InfoText";
import TextWithBreaks from "../textWithBreaks/TextWithBreaks";
import { InfoTextType } from "@/types";
import { TextColor, TextType } from "@/types/typography";
import { commonWrapper } from "@/styles/common.css";

interface InfoListProps {
  items: InfoTextType[];
  defaultType?: TextType;
  defaultColor?: TextColor;
}

export default function InfoList({
  items,
  defaultType = "body3",
  defaultColor = "gray700",
}: InfoListProps) {
  return (
    <ul
      role="list"
      className={commonWrapper({ direction: "col", align: "start", gap: 8 })}
    >
      {items.map((notice, idx) => {
        const baseType = notice.type ?? defaultType;
        const baseColor = notice.color ?? defaultColor;

        return (
          <InfoText key={idx} type={baseType} color={baseColor}>
            {notice.tokens.map((t, i) => (
              <Text
                key={i}
                type={t.type ?? baseType}
                color={t.color ?? baseColor}
              >
                <TextWithBreaks text={t.text} />
              </Text>
            ))}
          </InfoText>
        );
      })}
    </ul>
  );
}
