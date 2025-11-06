import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const textareaContainerStyle = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  variants: {
    fullWidth: {
      true: {
        width: '100%',
      }
    }
  }
})

export const textareaBoxStyle = style({
  width: '100%',
  minHeight: '160px',
  position: 'relative',
})

export const textareaStyle = recipe({
  base: {
    width: '100%',
    minHeight: '160px',
    height: '100%',
    padding: '12px',
    border: `1px solid ${themeVars.colors.gray.gray200}`,
    background: themeVars.colors.gray.gray0,
    borderRadius: '8px',
    transition: 'all .35s',
    outline: 'none',
    resize: 'vertical',
    '::placeholder': {
      color: themeVars.colors.gray.gray300,
    },
    ':focus': {
      color: themeVars.colors.gray.gray900,
      border: `1px solid ${themeVars.colors.gray.gray900}`,
    },
    ':disabled': {
      border: `1px solid ${themeVars.colors.gray.gray300}`,
      background: themeVars.colors.gray.gray200,
      color: themeVars.colors.gray.gray500,
    },
  },
  variants: {
    active: {
      true: {
        color: themeVars.colors.gray.gray900,
        background: themeVars.colors.gray.gray0,
      }
    }
  }
})

export const charCount = style({
  position: 'absolute',
  bottom: '12px',
  right: '12px',
})

export const errorTextStyle = style({
  display: 'flex',
  alignItems: 'center',
})