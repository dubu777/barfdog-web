import * as styles from "./ResultCard.css";
import { ReactNode } from "react";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface ResultCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subTitle?: string;
  gap?: "none" | 4 | 8 | 12 | 16 | 20;
}

const ResultCard = ({
  children,
  className,
  title,
  subTitle,
  gap,
}: ResultCardProps) => {
  return (
    <Card
      shadow="light"
      padding="20/16"
      backgroundColor="gray100"
      gap={gap}
      className={`${className || ""}`}
    >
      <div className={styles.resultCardHeader}>
        {title && (
          <DefaultText type="title3" align="center" preLine>
            {title}
          </DefaultText>
        )}
        {subTitle && (
          <DefaultText type="body3" color="gray600" align="center" preLine>
            {subTitle}
          </DefaultText>
        )}
      </div>
      {children}
    </Card>
  );
};

export default ResultCard;
