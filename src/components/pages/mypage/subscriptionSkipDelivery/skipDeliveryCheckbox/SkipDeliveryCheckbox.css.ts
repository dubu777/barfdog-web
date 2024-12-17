import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";
import {recipe} from "@vanilla-extract/recipes";

export const skipCheckContainer = style({
  display: 'flex',
  gap: '16px',
  marginBottom: '31px'
})

export const skipCheckButton = recipe({
  base: {
    width: '50%',
    borderRadius: '7px',
    padding: '24px 15px 18px',
    border: `1px solid ${themeVars.borderColors.greyDD}`,
    cursor: 'pointer',
  },
  variants: {
    active: {
      true: {
        border: `1px solid ${themeVars.colors.mainRed}`,
        background: themeVars.backgroundColors.pinkFF,
        color: themeVars.colors.mainRed,
      }
    }
  }
})

export const cycleTitle = recipe({
  base: {
    marginBottom: '31px',
    fontSize: themeVars.fontSize["text-lg"],
    fontWeight: themeVars.fontWeight.bold,
    position: 'relative',
    ':after': {
      content: '',
      display: 'block',
      width: '100%',
      height: '1px',
      background: themeVars.borderColors.greyDD,
      position: 'absolute',
      bottom: '-17px',
    }
  },
  variants: {
    active: {
      true: {
        ':after': {
          background: themeVars.colors.mainRed,
        }
      }
    }
  }
})
export const skipDate = style({
  lineHeight: '24px',
  fontSize: themeVars.fontSize["text-sm"],
})



export const skipInfoModal = style({
  lineHeight: '25px'
})
