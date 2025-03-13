import { ReactNode } from "react";
import { chipsVariants, chipsSize, chipsBorderRadius, chipsSwitchOff } from "./Chips.css";

interface ChipsProps {
  variant: keyof typeof chipsVariants;
  size: 'sm' | 'md' | 'lg';
  children: ReactNode;
  borderRadius?: keyof typeof chipsBorderRadius;
  switchOff?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Chips({
  variant,
  children,
  size,
  borderRadius = 'small',
  switchOff = false,
  style,
}: ChipsProps) {
  return (
    <span
      className={`
      ${chipsVariants[variant]}
      ${chipsBorderRadius[borderRadius]} 
      ${chipsSize[size]}
      ${switchOff && chipsSwitchOff[variant] || ''}
    `}
    style={style}
    >
      {children}
    </span>
  );
}
