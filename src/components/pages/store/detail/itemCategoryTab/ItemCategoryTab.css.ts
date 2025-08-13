import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const itemCategoryContainer = style({
  backgroundColor: themeVars.colors.gray.gray0,
})

export const itemCategoryTab = style({
  backgroundColor: themeVars.colors.gray.gray0,
  boxShadow: themeVars.shadow.light,
  position: 'sticky',
  top: '52px',
  zIndex: 299,
})