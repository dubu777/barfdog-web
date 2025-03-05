import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./OrderSection.css";
import Button from "@/components/common/button/Button";

interface OrderSectionProps {
  title: string;
  subTitleParts?: Array<{
    text: string;
    isPoint?: boolean;
  }>;
  children?: React.ReactNode;
  onSubtitleClick?: () => void;
}

export default function OrderSection({
  title,
  subTitleParts,
  children,
  onSubtitleClick,
}: OrderSectionProps) {
  return (
    <section className={styles.OrderSectionContainer}>
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
          </Button>
        )}
      </div>
      {children}
    </section>
  );
}
