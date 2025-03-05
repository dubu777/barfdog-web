import { style, styleVariants } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const dividerBase = style({
  width: '100%',
});

export const thicknessVariants = styleVariants({
  1: { borderBottom: `1px solid ${themeVars.borderColors.grey50}` },
  8: { borderBottom: `8px solid ${themeVars.borderColors.grey50}` },
  12: { borderBottom: `12px solid ${themeVars.borderColors.grey50}` },
});

export const marginTopBottomVariants = styleVariants({
  0: { marginTop: '0px', marginBottom: '0px' },
  16: { marginTop: '16px', marginBottom: '16px' },
  20: { marginTop: '20px', marginBottom: '20px' },
});

export const marginLeftRightVariants = styleVariants({
  0: { marginLeft: '0px', marginRight: '0px' },
  16: { marginLeft: '16px', marginRight: '16px' },
  20: { marginLeft: '20px', marginRight: '20px' },
});
