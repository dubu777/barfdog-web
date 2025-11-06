import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { ReactNode } from "react";

interface ItemDetailLayoutProps {
  title?: string | ReactNode;
  children: ReactNode;
  padding?: boolean;
  hasTitlePadding?: boolean;
}
export default function ItemDetailLayout({ 
  title,
  children,
  padding = false,
  hasTitlePadding = true,
}: ItemDetailLayoutProps) {
  return (
    <div 
      className={commonWrapper({ 
        padding: padding ? 20 : undefined, 
        direction: 'col',
        gap: 20,
        align: 'start',
      })}
      >
      {title && 
        <Text type='title4' style={{ padding: hasTitlePadding ? '20px 20px 0' : undefined }}>{title}</Text>
      }
      {children}
    </div>
  );
}