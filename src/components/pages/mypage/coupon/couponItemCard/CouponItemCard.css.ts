import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const couponItem = style({
  border: `1px solid ${themeVars.borderColors.grey79}`,
  borderRadius: '3px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const couponControls = recipe({
  base: {
    width: '100%',
    display: 'flex',
    marginTop: '22px',
  },
  variants: {
    allTarget: {
      true: {
        gap: '14px',
      }
    }
  }
})

export const couponName = style({
  marginBottom: '9px',
})

export const discount = style({
  marginBottom: '11px',
})

export const minPrice = style({
  marginBottom: '4px',
})

export const couponType = style({
  marginBottom: '8px',
})