import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const bcsCard = style({
  border: `1px solid ${themeVars.colors.gray.gray200}`,
})

export const bcsCardCategory = {
  danger: style({
    backgroundColor: themeVars.colors.red.pinkWhite,
    border: `1px solid ${themeVars.colors.red.pastelPink}`,
  }),
  warning: style({
    backgroundColor: themeVars.colors.yellow.yellow50,
    border: `1px solid ${themeVars.colors.yellow.yellow300}`,
  }),
  normal: style({
    backgroundColor: themeVars.colors.blue.blue50,
    border: `1px solid ${themeVars.colors.blue.blue200}`,
  })
}

export const bcsSvgIcon = recipe({
  base: {},
  variants: {
    isActive: {
      true: {
        backgroundColor: themeVars.colors.gray.gray0,
      },
      false: {
        backgroundColor: themeVars.colors.gray.gray50,
      },
    },
  }
})