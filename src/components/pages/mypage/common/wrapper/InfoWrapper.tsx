import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { ReactNode } from "react";

interface InfoWrapperProps {
  children: ReactNode;
  title: string | ReactNode;
  titleType?: 'title3' | 'title4';
  padding?: boolean;
  paddingTop?: boolean;
  gap?: 4 | 8 | 10 | 12 | 16 | 20 | 32 | 40;
}

export default function InfoWrapper({ 
  children, 
  title,
  titleType = 'title3',
  padding = true,
  paddingTop = false,
  gap = 8,
}: InfoWrapperProps) {
  return (
    <article className={commonWrapper({
      direction: 'col',
      align: 'start',
      gap: gap,
      padding: padding ? 20 : undefined,
      paddingTop: paddingTop ? 40 : undefined,
    })}>
      <Text type={titleType}>{title}</Text>
      {children}
    </article>
  );
}