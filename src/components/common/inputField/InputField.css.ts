import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const container = recipe({
  base: {
    border: `1px solid ${themeVars.colors.gray.gray200}`,
    padding: '10px',
    transition: '0.3s ease',
    cursor: 'text',
    width: '100%',
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: themeVars.colors.gray.gray200,
        color: themeVars.colors.gray.gray900,
        cursor: 'not-allowed',
      },
    },
    error: {
      true: {
        borderColor: themeVars.colors.primary.red,
      },
    },
  },
});

export const innerContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const input = recipe({
  base: {
    fontSize: '16px',
    color: themeVars.colors.gray.gray900,
    border: 'none',
    outline: 'none',
    padding: '0',
    width: '100%',
    backgroundColor: 'transparent',
  },
  variants: {
    disabled: {
      true: {
        color: themeVars.colors.gray.gray300,
      },
    },
  },
});

export const errorText = style({
  color: themeVars.colors.primary.red,
  fontSize: '12px',
  marginTop: '5px',
});
