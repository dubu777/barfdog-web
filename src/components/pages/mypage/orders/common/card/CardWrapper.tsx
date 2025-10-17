import { ReactNode } from "react";
import { commonWrapper } from "@/styles/common.css";
import Card from "@/components/common/card/Card";

interface CardWrapperProps {
  children: ReactNode;
  gap?: 4 | 8 | 10 | 12 | 16 | 20 | 32 | 40;
  padding?: boolean;
  className?: string;
}

export default function CardWrapper({ 
  children, 
  gap = 12,
  padding = true,
  className,
}: CardWrapperProps) {
  return (
    <Card
      direction="col"
      gap={gap}
      padding={padding ? '16/12' : undefined}
      borderRadius={12}
      align='start'
      className={className ?? ''}
    >
      <div className={commonWrapper({ direction: 'col', gap: 12, justify: 'start' })}>
        {children}
      </div>
    </Card>
  );
}