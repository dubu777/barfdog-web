import { ReactNode } from "react";
import Card from "@/components/common/card/Card";

interface CardWrapperProps {
  children: ReactNode;
  gap?: 4 | 8 | 10 | 12 | 16 | 20 | 32 | 40;
  padding?: 12 | '16/12' | false;
  className?: string;
  shadow?: 'none' | 'light' | 'normal' | 'strong';
}

export default function CardWrapper({ 
  children, 
  gap = 12,
  padding = '16/12',
  className,
  shadow = 'light',
}: CardWrapperProps) {
  return (
    <Card
      direction="col"
      gap={gap}
      padding={padding ? padding : undefined}
      borderRadius={12}
      align='start'
      className={className ?? ''}
      shadow={shadow}
    >
      {children}
    </Card>
  );
}