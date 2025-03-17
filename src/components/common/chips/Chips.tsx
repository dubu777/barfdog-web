import { ReactNode } from "react";
import {
  chipsVariants,
  chipsSize,
  chipsBorderRadius,
  chipsSwitchOff,
  chipsColors,
  chipsTailStyle,
  chipsTailPosition
} from "./Chips.css";

interface ChipsProps {
  variant: keyof typeof chipsVariants;
  size: 'sm' | 'md' | 'lg';
  children: ReactNode;
  borderRadius?: keyof typeof chipsBorderRadius;
  switchOff?: boolean;
  className?: string;
  color?: 'black';
  tailVisible?: boolean;
  tailPosition?: 'top' | 'bottom';
  style?: React.CSSProperties;
}

export default function Chips({
  variant,
  children,
  size,
  borderRadius = 'small',
  switchOff = false,
  color,
  tailVisible = false,
  tailPosition = 'top',
  style,
}: ChipsProps) {
  return (
    <span
      className={`
      ${chipsVariants[variant]}
      ${chipsBorderRadius[borderRadius]} 
      ${chipsSize[size]}
      ${switchOff && chipsSwitchOff[variant] || ''}
      ${color && chipsColors[color] || ''}
    `}
    style={style}
    >
      {tailVisible &&
        <span className={`${chipsTailStyle} ${chipsTailPosition[tailPosition]}`} />
      }
      {children}
    </span>
  );
}
