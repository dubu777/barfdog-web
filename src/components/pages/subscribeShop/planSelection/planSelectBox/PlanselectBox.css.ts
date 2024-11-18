import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";


export const planBoxContainer = recipe({
  base:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '360px',
    height: '41px',
    borderRadius: '20px',
    padding: '0 25px',
    transition: 'background-color 0.3s ease, border 0.3s ease'
  },
  variants:{
    isSelected: {
      true: {
        border: `1px solid ${themeVars.borderColors.darkRed}`,
        color: themeVars.fontColors.darkRed,
        backgroundColor: '#FFE0E1',
      },
      false: {
        border: `1px solid ${themeVars.borderColors.greyBB}`,
        color: themeVars.fontColors.black,
        backgroundColor: themeVars.backgroundColors.white,
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
    flex: 1.25,
})

export const planContentWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '3px',
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