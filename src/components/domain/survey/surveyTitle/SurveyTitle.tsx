import Text from "@/components/ui/text/Text";
import * as styles from "./SurveyTitle.css";
import { SurveyTitleConfig } from "@/types";
import Button from "@/components/ui/button/Button";
import Chips from "@/components/ui/chips/Chips";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import { CHIPS_COLORS } from "@/constants/style";
import {
  getNameWithAndSuffix,
  getNameWithSubjectSuffix,
  getNameWithTopicSuffix,
} from "@/utils";

interface SurveyTitleProps {
  dogName: string;
  config: SurveyTitleConfig;
  chipContent?: string;
  infoBoxContent?: string;
  chipColor?: keyof typeof CHIPS_COLORS;
  onReselect?: () => void;
  onInfoBoxClick?: () => void;
}

export default function SurveyTitle({
  dogName,
  config: { titleTemplates, subtitleTemplates },
  chipContent,
  infoBoxContent,
  chipColor = "gray800",
  onReselect,
  onInfoBoxClick,
}: SurveyTitleProps) {
  const SUFFIXERS: Record<
    "topic" | "subject" | "and",
    (name: string) => string
  > = {
    topic: getNameWithTopicSuffix,
    subject: getNameWithSubjectSuffix,
    and: getNameWithAndSuffix,
  };
  return (
    <div className={styles.surveyTitleContainer}>
      {titleTemplates.map((template, idx) => {
        // {dogName} 또는 {dogName:topic}, {dogName:subject} 만 캡처
        const text = template.replace(
          /\{dogName(?::(topic|subject|and))?\}/g,
          (_match, suffixType) => {
            if (suffixType && SUFFIXERS[suffixType]) {
              return SUFFIXERS[suffixType](dogName);
            }
            // suffixType이 없으면 그냥 dogName
            return dogName;
          }
        );
        return (
          <Text key={idx} type="title2">
            {text}
          </Text>
        );
      })}
      {subtitleTemplates && (
        <div className={styles.surveySubtitleContainer}>
          <div className={styles.surveyColSubtitleWrapper}>
            {subtitleTemplates.map((line, lineIndex) => (
              <div key={lineIndex} className={styles.surveyRowSubtitleWrapper}>
                {line.map(({ text, color }, idx) => (
                  <Text
                    key={idx}
                    type="body3"
                    color={color}
                    applyLineHeight={false}
                  >
                    {text}
                  </Text>
                ))}
              </div>
            ))}
          </div>
          {onReselect && (
            <Button
              intent="assistive"
              variant="outline"
              size="sm"
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
