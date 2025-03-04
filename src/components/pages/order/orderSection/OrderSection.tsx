import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./OrderSection.css";
import { themeVars } from "@/styles/theme.css";

interface OrderSectionProps {
  title: string;
  subTitleParts?: Array<{
    text: string;
    isPoint?: boolean;
  }>;
  children?: React.ReactNode;
}

export default function OrderSection({
  title,
  subTitleParts,
  children,
}: OrderSectionProps) {
  return (
    <section className={styles.OrderSectionContainer}>
      <DefaultText type="title4">{title}</DefaultText>

      {subTitleParts && (
        <DefaultText type="headline4">
          {subTitleParts.map(({ text, isPoint }, idx) => (
            <span
              key={idx}
              className={styles.OrderSectionSubtitle({ isPoint })}
            >
              {text}
            </span>
          ))}
        </DefaultText>
      )}

      <div>{children}</div>
    </section>
  );
}
