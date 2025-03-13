import React from "react";
import { COLORS } from "@/constants/style";


export interface IconProps extends React.SVGProps<SVGSVGElement> {
  src: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: keyof typeof COLORS;
  width?: number;
  height?: number;
}

const SvgIcon: React.FC<IconProps> = ({
  src: IconComponent,
  size = 20,
  color = "gray900",
  width,
  height,
  ...rest
}) => {
  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      style={{ color: COLORS[color] }}
      {...rest}
    />
  );
};

export default SvgIcon;
