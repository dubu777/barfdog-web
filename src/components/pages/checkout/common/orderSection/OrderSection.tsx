import Text from "@/components/common/text/Text";
import * as styles from "./OrderSection.css";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { fontColors, textStyles } from "@/components/common/text/Text.css";
import { forwardRef } from "react";
import { commonWrapper } from "@/styles/common.css";

interface OrderSectionProps {
  title?: string;
  subTitleParts?: Array<{
    text: string;
    color?: keyof typeof fontColors;
  }>;
  subTitleType?: keyof typeof textStyles;
  children?: React.ReactNode;
  showArrowIcon?: boolean;
  padding?: "32/20" | 20;
  gap?: 16 | 20;
  onSubtitleClick?: () => void;
}

const OrderSection = forwardRef<HTMLElement, OrderSectionProps>(
  (
    {
      title,
      subTitleParts,
      subTitleType = "label4",
      children,
      showArrowIcon,
      padding = "32/20",
      gap = 16,
      onSubtitleClick,
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap,
          padding,
        })}
      >
        {(title || subTitleParts) && (
          <div className={styles.OrderSectionTitleWrapper}>
            <Text type="title4">{title}</Text>
            {subTitleParts && (
              <div className={styles.subTitleWrapper} onClick={onSubtitleClick}>
                {subTitleParts.map(({ text, color }, idx) => (
                  <Text key={idx} type={subTitleType} color={color}>
                    {text}
                  </Text>
                ))}
                {showArrowIcon && (
                  <SvgIcon src={ArrowIcon} size={20} color="gray600" />
                )}
              </div>
            )}
          </div>
        )}
        {children}
      </section>
    );
  }
);

OrderSection.displayName = "OrderSection";

export default OrderSection;
