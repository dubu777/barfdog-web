import * as styles from "./SurveyOptionCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";

import Image from "next/image";
import { commonWrapper } from "@/styles/common.css";

interface surveyOptionCardProps<T> {
  label: string;
  value: T;
  isChecked: boolean;
  imageSrc: string;
  subLabel: string[];
  imageSize: number;
  imageWrapperSize: 100 | 114;
  onToggle: (value: T) => void;
}

export default function SurveyOptionCard<T>({
  label,
  isChecked,
  imageSrc,
  imageSize,
  imageWrapperSize,
  value,
  subLabel,
  onToggle,
}: surveyOptionCardProps<T>) {
  return (
    <button
      className={styles.surveyOptionCardContainer({
        isChecked,
        imageWrapperSize,
      })}
      onClick={() => onToggle(value)}
    >
      <div
        className={styles.surveyOptionCardImageWrapper({
          imageWrapperSize,
        })}
      >
        <Image
          src={imageSrc}
          alt={label}
          height={imageSize}
          width={imageSize}
          priority
        />
      </div>
      <div className={styles.surveyOptionCardContentWrapper}>
        <DefaultText type="headline3" color={isChecked ? "red" : "gray900"}>
          {label}
        </DefaultText>
        <div className={commonWrapper({ direction: "col", align: "start" })}>
          {subLabel.map((text, index) => (
            <DefaultText key={index} type="body3" color="gray700">
              {text}
            </DefaultText>
          ))}
        </div>
      </div>
    </button>
  );
}
