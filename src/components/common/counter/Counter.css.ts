import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const counterContainer = recipe({
  base: {
    width: '120px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid #ddd`,
    borderRadius: '8px',
    padding: '10px',
    background: themeVars.colors.white
  },
  variants: {
    fullWidth: {
      true: {
        width: '100%',
      }
    }
  }
})

export const countButton = style({
  fontSize: themeVars.fontSize["text-lg"],
  cursor: 'pointer',
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
})

export const count = style({
  fontSize: themeVars.fontSize["text-md"],
})