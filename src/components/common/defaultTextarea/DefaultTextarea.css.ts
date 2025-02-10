import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const defaultTextareaContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  position: 'relative',
  margin: '0 0 20px'
})

export const textareaLabel = recipe({
  base: {
    width: '20%',
    fontWeight: themeVars.fontWeight.semibold,
    paddingTop: '5px'
  },
  variants: {
    labelPosition: {
      left: {
        textAlign: 'left',
      },
      top: { }
    }
  }
})

export const textareaBox = style({
  width: '70%',
  minHeight: '260px',
})

export const textarea = style({
  width: '100%',
  minHeight: '260px',
  height: '100%',
  padding: '1rem',
  border: `1px solid ${themeVars.colors.lightGrey}`,
  color: themeVars.fontColors.grey38,
  borderRadius: '5px',
  transition: 'all .35s',
  outline: 'none',
  resize: 'vertical',
  '::placeholder': {
    color: themeVars.colors.lightGrey,
  },
  ':focus': {
    border: `1px solid ${themeVars.colors.red}`,
  },
})

export const charCount = style({
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
  fontSize: themeVars.fontSize["text-sm"],
  color: themeVars.colors.lightGrey,
})

export const errorText = style({
  margin: '5px'
})
