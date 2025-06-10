import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./SurveyTitle.css";
import { SurveyTitleConfig } from "@/types";
import Button from "@/components/common/button/Button";
import Chips from "@/components/common/chips/Chips";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { CHIPS_COLORS } from "@/constants/style";
import { getNameWithSubjectSuffix, getNameWithTopicSuffix } from "@/utils";

interface SurveyTitleProps {
  petName: string;
  config: SurveyTitleConfig;
  chipContent?: string;
  infoBoxContent?: string;
  chipColor?: keyof typeof CHIPS_COLORS;
  onReselect?: () => void;
  onInfoBoxClick?: () => void;
}

export default function SurveyTitle({
  petName,
  config: { titleTemplates, subtitleTemplates },
  chipContent,
  infoBoxContent,
  chipColor = "gray800",
  onReselect,
  onInfoBoxClick,
}: SurveyTitleProps) {
  const SUFFIXERS: Record<"topic" | "subject", (name: string) => string> = {
    topic: getNameWithTopicSuffix,
    subject: getNameWithSubjectSuffix,
  };
  return (
    <div className={styles.surveyTitleContainer}>
      {titleTemplates.map((template, idx) => {
        // {petName} 또는 {petName:topic}, {petName:subject} 만 캡처
        const text = template.replace(
          /\{petName(?::(topic|subject))?\}/g,
          (_match, suffixType) => {
            if (suffixType && SUFFIXERS[suffixType]) {
              return SUFFIXERS[suffixType](petName);
            }
            // suffixType이 없으면 그냥 petName
            return petName;
          }
        );
        return (
          <DefaultText key={idx} type="title2">
            {text}
          </DefaultText>
        );
      })}
      {subtitleTemplates && (
        <div className={styles.surveySubtitleContainer}>
          <div className={styles.surveyColSubtitleWrapper}>
            {subtitleTemplates.map((line, lineIndex) => (
              <div key={lineIndex} className={styles.surveyRowSubtitleWrapper}>
                {line.map(({ text, color }, idx) => (
                  <DefaultText
                    key={idx}
                    type="body3"
                    color={color}
                    applyLineHeight={false}
                  >
                    {text}
                  </DefaultText>
                ))}
              </div>
            ))}
          </div>
          {onReselect && (
            <Button
              type="assistive"
              variant="outline"
              size="sm"
              buttonColor="white"
              onClick={onReselect}
            >
              다시선택
            </Button>
          )}
        </div>
      )}

      {chipContent && (
        <div className={styles.surveyChipWrapper}>
          <Chips
            variant="solid"
            size="md"
            borderRadius="md"
            tailVisible
            tailPosition="top"
            color={chipColor}
          >
            {chipContent}
          </Chips>
        </div>
      )}
      {infoBoxContent && (
        <div className={styles.surveyInfoBoxWrapper}>
          <InfoBox
            type="info"
            color="gray"
            showRightArrowButton
            text={infoBoxContent}
            fullWidth
            onClick={onInfoBoxClick}
          />
        </div>
      )}
    </div>
  );
}
