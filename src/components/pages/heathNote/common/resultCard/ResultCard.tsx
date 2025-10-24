import { commonWrapper } from "@/styles/common.css";
import { ReactNode } from "react";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";

interface ResultCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subTitle?: string;
  gap?: "none" | 4 | 8 | 12 | 16 | 20 | 32 | 40;
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
      gap={gap !== "none" ? gap : undefined}
      className={`${className || ""}`}
    >
      <div className={commonWrapper({ direction: 'col', gap: 4 })}>
        {title && (
          <Text type="title3" align="center" preLine>
            {title}
          </Text>
        )}
        {subTitle && (
          <Text type="body3" color="gray600" align="center" preLine>
            {subTitle}
          </Text>
        )}
      </div>
      {children}
    </Card>
  );
};

export default ResultCard;
