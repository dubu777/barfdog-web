import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./OrderSection.css";
import Button from "@/components/common/button/Button";
import ArrowIcon from "/public/images/icons/chevron-right.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";


interface OrderSectionProps {
  title: string;
  subTitleParts?: Array<{
    text: string;
    isPoint?: boolean;
  }>;
  children?: React.ReactNode;
  showArrowIcon?: boolean;
  style?: React.CSSProperties;
  onSubtitleClick?: () => void;
}

export default function OrderSection({
  title,
  subTitleParts,
  children,
  showArrowIcon,
  style,
  onSubtitleClick,
}: OrderSectionProps) {
  return (
    <section className={styles.OrderSectionContainer} style={style}>
      <div className={styles.OrderSectionTitleWrapper}>
        <DefaultText type="title4">{title}</DefaultText>
        {subTitleParts && (
          <Button
            type="assistive"
            variant="text"
            size="sm"
            onClick={onSubtitleClick}
          >
            {subTitleParts.map(({ text, isPoint }, idx) => (
              <span
                key={idx}
                className={styles.OrderSectionSubtitle({ isPoint })}
              >
                {text}
              </span>
            ))}
            {showArrowIcon && (
              <SvgIcon icon={ArrowIcon} size={20} color="gray600" />
            )}
          </Button>
        )}
      </div>
      {children}
    </section>
  );
}
