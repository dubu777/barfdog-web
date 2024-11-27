import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const defaultButtonStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease, opacity 0.3s ease',
    padding: '0 16px',
    gap: '10px',
    textAlign: 'center',
    lineHeight: '1',
    verticalAlign: 'middle',
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
        color: themeVars.fontColors.black,
      },
      black: {
        border: 'none',
        backgroundColor: themeVars.backgroundColors.black,
        color: themeVars.fontColors.white,
      },
      gray: {
        border: 'none',
        backgroundColor: themeVars.buttonColors.greyB9,
        color: themeVars.fontColors.white,
      },
      mainBorder: {
        border: `1px solid ${themeVars.borderColors.mainRed}`,
        backgroundColor: themeVars.backgroundColors.white,
        color: themeVars.colors.mainRed,
      },
      grayBorder: {
        border: `1px solid ${themeVars.borderColors.greyBB}`,
        backgroundColor: themeVars.backgroundColors.white,
        color: themeVars.fontColors.black,
      },
      blackBorder: {
        border: `1px solid ${themeVars.borderColors.black}`,
        backgroundColor: themeVars.backgroundColors.white,
        color: themeVars.colors.black,
      },
    },
    size: {
      xxs: { fontSize: '10px', height: '19px', padding: '0 8px' },
      xs: { fontSize: '12px', height: '23px', padding: '0 8px' },
      sm: { fontSize: '13px', height: '35px', width: '100%' },
      md: { fontSize: '14px', height: '40px', width: '100%' },
      lg: { fontSize: '16px', height: '45px', width: '100%' },
      xl: { fontSize: '20px', height: '50px', width: '100%' },
      xxl: { fontSize: '20px', height: '54px', width: '100%' },
    },
    borderRadius: {
      sm: { borderRadius: '3px' },
      md: { borderRadius: '15.5px' },
      lg: { borderRadius: '22.5px' },
    },
    isBold: {
      true: { fontWeight: 700 },
      false: { fontWeight: 400 },
    },
    isDisabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.4,
      },
      false: {
        cursor: 'pointer',
        opacity: 1,
      },
    },
    isHidden: {
      true: {
        cursor: 'default',
        opacity: 0,
      },
      false: {
        cursor: 'pointer',
        opacity: 1,
      },
    },
    hover: {
      true: {}
    },
    isActive: {
      true: {
        backgroundColor: themeVars.backgroundColors.mainRed,
        color: themeVars.colors.white,
      }
    }
  },
  compoundVariants: [
    {
      variants: { isDisabled: true, isHidden: false },
      style: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
    // hover 시 효과 추가 시 적용
    // {
    //   variants: { type: 'main', hover: true },
    //   style: {
    //     ':hover': {
    //       background: themeVars.backgroundColors.pinkFF,
    //       border: `1px solid ${themeVars.borderColors.mainRed}`,
    //       color: themeVars.fontColors.mainRed,
    //     }
    //   }
    // },
    // {
    //   variants: { type: 'mainBorder', hover: true },
    //   style: {
    //     ':hover': {
    //       background: themeVars.backgroundColors.pinkFF,
    //       color: themeVars.fontColors.mainRed,
    //     }
    //   }
    // },
    {
      variants: { type: 'grayBorder', isActive: true },
      style: {
        border: `1px solid ${themeVars.borderColors.mainRed}`,
        color: themeVars.colors.white,
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    borderRadius: 'md',
    isBold: false,
    isDisabled: false,
    hover: true,
  },
});

export const iconStyle = style({
  display: 'flex',
  alignItems: 'center',
});
