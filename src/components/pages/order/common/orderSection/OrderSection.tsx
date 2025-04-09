import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./OrderSection.css";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { fontColors, textStyles } from "@/components/common/defaultText/DefaultText.css";
import { forwardRef } from 'react';

interface OrderSectionProps {
  title?: string;
  subTitleParts?: Array<{
    text: string;
    color?: keyof typeof fontColors;
  }>;
  subTitleType?: keyof typeof textStyles;
  children?: React.ReactNode;
  showArrowIcon?: boolean;
  padding?: string;
  style?: React.CSSProperties;
  onSubtitleClick?: () => void;
}

const OrderSection = forwardRef<HTMLElement, OrderSectionProps>(({
  title,
  subTitleParts,
  subTitleType = "label4",
  children,
  showArrowIcon,
  padding = "32px 20px",
  style,
  onSubtitleClick,
}, ref) => {
  const combinedStyle = { padding, ...style };
  return (
    <section ref={ref} className={styles.OrderSectionContainer} style={combinedStyle}>
      {(title || subTitleParts) && (
        <div className={styles.OrderSectionTitleWrapper}>
          <DefaultText type="title4">{title}</DefaultText>
          {subTitleParts && (
            <>
                <div className={styles.subTitleWrapper} onClick={onSubtitleClick}>
                  {subTitleParts.map(({ text, color }, idx) => (
                    <DefaultText key={idx} type={subTitleType} color={color}>
                      {text}
                    </DefaultText>
                  ))}
                  {showArrowIcon && (
                    <SvgIcon src={ArrowIcon} size={20} color="gray600" />
                  )}
                </div>
            </>
          )}
        </div>
      )}
      {children}
    </section>
  );
});

OrderSection.displayName = 'OrderSection';

export default OrderSection;