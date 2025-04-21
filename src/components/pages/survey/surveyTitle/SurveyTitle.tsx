import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./SurveyTitle.css";
import { SurveyTitleConfig } from "@/types";
import Button from "@/components/common/button/Button";
import Chips from "@/components/common/chips/Chips";
import InfoBox from "@/components/common/infoBox/InfoBox";
import { CHIPS_COLORS } from "@/constants/style";
import { getNameWithPossessiveSuffix } from "@/utils";

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
  const nameWithSuffix = getNameWithPossessiveSuffix(petName);

  return (
    <div className={styles.surveyTitleContainer}>
      {titleTemplates.map((template, index) => {
        const text = template.replace("{petName}", nameWithSuffix);
        return (
          <DefaultText key={index} type="title2">
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
