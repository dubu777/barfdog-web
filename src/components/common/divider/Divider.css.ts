import { style, styleVariants } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const dividerBase = style({
  width: '100%',
});

export const thicknessVariants = styleVariants({
  1: { borderBottom: `1px solid ${themeVars.borderColors.grey50}` },
  2: { borderBottom: `2px solid ${themeVars.borderColors.grey50}` },
  8: { borderBottom: `8px solid ${themeVars.borderColors.grey50}` },
  12: { borderBottom: `12px solid ${themeVars.borderColors.grey50}` },
});