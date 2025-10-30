import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { ComponentType, SVGProps } from "react";

interface IngredientItemProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}
export default function IngredientItem({
  icon,
  label,
}: IngredientItemProps) {
  return (
    <div 
      className={commonWrapper({ 
        direction: 'col', 
        align: 'center', 
        gap: 4, 
        width: 'auto',
      })}
      style={{
        minWidth: 80,
        padding: '0 10px',
      }}
    >
      <SvgIcon src={icon} size={60} />
      <Text type="body3" color="gray500">{label}</Text>
    </div>
  );
}