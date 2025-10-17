import { commonWrapper } from "@/styles/common.css";
import { fontColors, textStyles } from "@/components/common/text/Text.css";
import Text from "@/components/common/text/Text";

interface InfoItemProps {
  label: string;
  value: string;
  labelType?: keyof typeof textStyles;
  labelColor?: keyof typeof fontColors;
  valueType?: keyof typeof textStyles;
  valueColor?: keyof typeof fontColors;
  justify?: 'start' | 'between';
  minWidth?: number;
}

export default function InfoItem({
  label,
  value,
  labelType = 'label4',
  labelColor = 'gray700',
  valueType = 'body3',
  valueColor = 'gray900',
  justify = 'between',
  minWidth,
}: InfoItemProps) {
  return (
    <div className={commonWrapper({ justify, gap: 6 })}>
      <Text 
        type={labelType} 
        color={labelColor} 
        style={{ minWidth: minWidth ?? 'auto' }}
      >
        {label}
      </Text>
      <Text type={valueType} color={valueColor}>{value}</Text>
    </div>
  );
}