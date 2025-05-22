import React from "react";
import { COLORS } from "@/constants/style";
import { svgIconStyle } from "./SvgIcon.css";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  src: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: keyof typeof COLORS;
  width?: number;
  height?: number;
  className?: string;
}

const SvgIcon: React.FC<IconProps> = ({
  src: IconComponent,
  size = 24,
  color = "gray900",
  width,
  height,
  className,
  ...rest
}) => {
  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      style={{ color: COLORS[color] }}
      className={`${svgIconStyle} ${className || ""}`}
      {...rest}
    />
  );
};

export default SvgIcon;
