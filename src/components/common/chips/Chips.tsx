import { ReactNode } from "react";
import {
  chipsVariants,
  chipsSize,
  chipsBorderRadius,
  chipsSwitchOff,
  chipsTailStyle,
  chipsTailPosition,
  chipVariantStyles,
  chipsTailColor,
  chipsTailSize,
  chipsTailFixedFont,
} from "./Chips.css";
import { CHIPS_COLORS } from "@/constants/style";

interface ChipsProps {
  variant: keyof typeof chipsVariants;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  borderRadius?: keyof typeof chipsBorderRadius;
  switchOff?: boolean;
  className?: string;
  color?: keyof typeof CHIPS_COLORS;
  tailVisible?: boolean;
  tailPosition?: 'top' | 'bottom';
  style?: React.CSSProperties;
}


export default function Chips({
  variant,
  children,
  size = "sm",
  borderRadius = 'sm',
  switchOff = false,
  color = "gray700",
  tailVisible = false,
  tailPosition = 'top',
  style,
  className,
}: ChipsProps) {
  const colorStyle = color ? chipVariantStyles[variant as 'solid' | 'outlined'][color] : "";

  return (
    <span
      className={`
      ${chipsVariants[variant]}
      ${chipsBorderRadius[borderRadius]} 
      ${chipsSize[size]}
      ${switchOff && chipsSwitchOff[variant] || ''}
      ${colorStyle}
      ${className || ''}
      ${tailVisible ? chipsTailFixedFont : ''}
    `}
    style={style}
    >
      {tailVisible &&
        <span className={`${chipsTailStyle} ${chipsTailPosition[tailPosition]} ${chipsTailColor[color]} ${chipsTailSize[tailPosition][size]}`} />
      }
      {children}
    </span>
  );
}
