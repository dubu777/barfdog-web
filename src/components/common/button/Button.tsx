import { ComponentType, MouseEvent, SVGProps } from "react";
import { labelStyle, buttonClass, contentStyle } from "./Button.css";
import SvgIcon from "../svgIcon/SvgIcon";
import { COLORS } from "@/constants/style";

type Variant = "solid" | "outline" | "text";
type Intent = "primary" | "secondary" | "assistive";
type Size = "sm" | "md" | "lg" | "inputButton";
type IconPosition = "left" | "right";

interface ButtonProps {
  variant?: Variant;
  intent?: Intent;
  size?: Size;
  disabled?: boolean;
  fullWidth?: boolean;
  shadow?: boolean;
  onClick?: (() => void) | ((e: MouseEvent<HTMLButtonElement>) => void);
  children: React.ReactNode;
  buttonType?: "submit" | "button" | "reset";
  fill?: boolean;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconPosition?: IconPosition; // 기본 왼쪽
  iconSize?: number;
  iconColor?: keyof typeof COLORS;
  className?: string;
}

export default function Button({
  variant = "solid",
  intent = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  shadow = false,
  onClick,
  children,
  buttonType = "button",
  fill = true,
  icon,
  iconPosition = "left",
  iconSize = 20,
  iconColor = "gray900",
  className,
}: ButtonProps) {
  return (
    <button
      type={buttonType}
      className={`${buttonClass({
        variant,
        intent,
        size,
        fullWidth,
        shadow,
        fill,
        disabled,
      })} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={contentStyle}>
        {icon && iconPosition === "left" && (
          <SvgIcon src={icon} size={iconSize} color={iconColor} aria-hidden />
        )}
        <span className={labelStyle}>{children}</span>
        {icon && iconPosition === "right" && (
          <SvgIcon src={icon} size={iconSize} color={iconColor} aria-hidden />
        )}
      </span>
    </button>
  );
}
