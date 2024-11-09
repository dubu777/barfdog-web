import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";


export const planBoxContainer = recipe({
  base:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '360px',
    height: '40px',
    borderRadius: '20px',
    padding: '0 30px'
  },
  variants:{
    isSelected: {
      true: {
        border: `1px solid ${themeVars.borderColors.darkRed}`,
        color: themeVars.fontColors.darkRed,
      },
      false: {
        border: `1px solid ${themeVars.borderColors.black}`,
        color: themeVars.fontColors.black,
      },
    }
  },
})

export const planBoxWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const planTitleWrapper = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
})

export const planContentWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 3,
})

export const planBoxDivider = recipe({
  base: {
    borderRight: `1px solid ${themeVars.borderColors.black}`,
    margin: '0 15px',
    height: '65%',
  },
  variants:{
    isSelected: {
      true: {
        borderColor: themeVars.borderColors.darkRed,
      },
      false: {
        borderColor: themeVars.borderColors.black,
      },
    }
  }
})