import React, { ComponentType, ReactNode, SVGProps } from "react";
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
  chipsTailVisible,
} from "./Chips.css";
import { CHIPS_COLORS } from "@/constants/style";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import CheckIcon from "public/images/survey/check_small.svg";

interface ChipsProps {
  variant: keyof typeof chipsVariants;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  borderRadius?: keyof typeof chipsBorderRadius;
  switchOff?: boolean;
  color?: keyof typeof CHIPS_COLORS;
  tailVisible?: boolean;
  tailPosition?: "top" | "bottom";
  style?: React.CSSProperties;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  showCheckIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Chips({
  variant,
  children,
  size = "sm",
  borderRadius = "sm",
  switchOff = false,
  color = "gray700",
  tailVisible = false,
  tailPosition = "top",
  style,
  icon,
  showCheckIcon = false,
  className,
  onClick,
}: ChipsProps) {
  const colorStyle = color
    ? chipVariantStyles[variant as "solid" | "outlined"][color]
    : "";

  return (
    <span
      className={`
      ${chipsVariants[variant]}
      ${chipsBorderRadius[borderRadius]} 
      ${chipsSize({ size, showCheckIcon, switchOff })}
      ${(switchOff && chipsSwitchOff[variant]) || ""}
      ${colorStyle}
      ${className || ""}
      ${tailVisible ? chipsTailFixedFont : ""}
      ${chipsTailVisible({ tailVisible })}
    `}
      style={style}
      onClick={onClick}
    >
      {tailVisible && (
        <span
          className={`${chipsTailStyle} ${chipsTailPosition[tailPosition]} ${chipsTailColor[color]} ${chipsTailSize[tailPosition][size]}`}
        />
      )}
      {icon && <SvgIcon src={icon} color="white" />}
      {showCheckIcon && !switchOff && <SvgIcon src={CheckIcon} color="white" />}
      {children}
    </span>
  );
}
