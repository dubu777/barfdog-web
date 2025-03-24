import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./OrderSection.css";
import Button from "@/components/common/button/Button";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { fontColors, textStyles } from "@/components/common/defaultText/DefaultText.css";

interface OrderSectionProps {
  title?: string;
  subTitleParts?: Array<{
    text: string;
    color?: keyof typeof fontColors;
  }>;
  subTitleType?: keyof typeof textStyles;
  subTitleIsButton?: boolean;
  children?: React.ReactNode;
  showArrowIcon?: boolean;
  padding?: string;
  style?: React.CSSProperties;
  onSubtitleClick?: () => void;
}

export default function OrderSection({
  title,
  subTitleParts,
  subTitleType = "label4",
  subTitleIsButton = false,
  children,
  showArrowIcon,
  padding = "32px 20px",
  style,
  onSubtitleClick,
}: OrderSectionProps) {
  const combinedStyle = { padding, ...style };
  return (
    <section className={styles.OrderSectionContainer} style={combinedStyle}>
      {(title || subTitleParts) && (
        <div className={styles.OrderSectionTitleWrapper}>
          <DefaultText type="title4">{title}</DefaultText>
          {subTitleParts && (
            <>
              {subTitleIsButton ? (
                <Button
                  type="assistive"
                  variant="text"
                  size="sm"
                  onClick={onSubtitleClick}
                >
                  {subTitleParts.map(({ text, color }, idx) => (
                    <DefaultText key={idx} type={subTitleType} color={color}>
                      {text}
                    </DefaultText>
                  ))}
                  {showArrowIcon && (
                    <SvgIcon src={ArrowIcon} size={20} color="gray600" />
                  )}
                </Button>
              ) : (
                <div className={styles.subTitleWrapper}>
                  {subTitleParts.map(({ text, color }, idx) => (
                    <DefaultText key={idx} type={subTitleType} color={color}>
                      {text}
                    </DefaultText>
                  ))}
                  {showArrowIcon && (
                    <SvgIcon src={ArrowIcon} size={20} color="gray600" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
      {children}
    </section>
  );
}