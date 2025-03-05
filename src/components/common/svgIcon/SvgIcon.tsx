import React from 'react';
import { themeVars } from '@/styles/theme.css';

export const iconColors = {
  white: themeVars.colors.gray.gray0,
  red: themeVars.colors.red.red,
  pastelRed: themeVars.colors.red.pastelRed,
  gray900: themeVars.colors.gray.gray900,
  gray800: themeVars.colors.gray.gray800,
  gray600: themeVars.colors.gray.gray600,
  gray500: themeVars.colors.gray.gray500,
  gray300: themeVars.colors.gray.gray300,
  blue500: themeVars.colors.blue.blue500,
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: keyof typeof iconColors;
}

const SvgIcon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 20,
  color = 'gray900',
  ...rest
}) => {
  return (
    <IconComponent
      width={size}
      height={size}
      style={{ color: iconColors[color] }}
      {...rest}
    />
  );
};

export default SvgIcon;
