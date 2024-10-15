import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const defaultButtonStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    padding: '0 16px',
  },
  variants: {
    type: {
      main: {
        border: 'none',
        backgroundColor: themeVars.backgroundColors.mainRed,
        color: themeVars.colors.white,
      },
      white: {
        border: 'none',
        backgroundColor: themeVars.backgroundColors.white,
        color: themeVars.fonColors.black,
      },
      black: {
        border: 'none',
        backgroundColor: themeVars.backgroundColors.black,
        color: themeVars.fonColors.black,
      },
      mainBorder: {
        border: `1px solid ${themeVars.borderColors.mainRed}`,
        backgroundColor: themeVars.backgroundColors.white,
        color: themeVars.colors.mainRed,
      },
      grayBorder: {
        border: `1px solid ${themeVars.borderColors.greyBB}`,
        backgroundColor: themeVars.backgroundColors.white,
        color: themeVars.fonColors.black,
      },
      blackBorder: {
        border: `1px solid ${themeVars.borderColors.black}`,
        backgroundColor: themeVars.backgroundColors.white,
        color: themeVars.colors.black,
      },
    },
    size: {
      xs: { fontSize: '12px', height: '23px', padding: '8px' },
      sm: { fontSize: '13px', height: '30px', width: '100%' },
      md: { fontSize: '16px', height: '40px', width: '100%' },
      lg: { fontSize: '16px', height: '45px', width: '100%' },
      xl: { fontSize: '20px', height: '50px', width: '100%' },
    },
    borderRadius: {
      sm: { borderRadius: '3px' },
      md: { borderRadius: '15.5px' },
      lg: { borderRadius: '22.5px' },
      circle: { borderRadius: '50%' },
    },
    bold: {
      true: { fontWeight: 700 },
      false: { fontWeight: 400 },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      false: {
        cursor: 'pointer',
        opacity: 1,
      },
    },
  },
  defaultVariants: {
    size: 'md',
    borderRadius: 'md',
    bold: false,
    disabled: false,
  },
});

export const iconStyle = style({
  marginRight: '8px',
});
