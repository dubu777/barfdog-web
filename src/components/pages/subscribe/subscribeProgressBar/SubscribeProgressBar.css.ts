import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  margin: "40px 0 12px 20px",
});

export const step = recipe({
  base: {
    width: 24,
    height: 24,
    borderRadius: '8px',
    border: `1px solid ${themeVars.colors.gray.gray300}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: themeVars.colors.red.red,
        borderColor: themeVars.colors.red.red,
      },
      false: {
        backgroundColor: themeVars.colors.gray.gray0,
        borderColor: themeVars.colors.gray.gray300,
      },
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export const activeStep = style({
  backgroundColor: themeVars.colors.red.red,
  borderColor: themeVars.colors.red.red,
});

export const connector = style({
  display: 'flex',
  gap: 2,
  margin: '0 2px',
});

export const dot = style({
  width: 2,
  height: 2,
  borderRadius: '50%',
  backgroundColor: themeVars.colors.gray.gray300,
});