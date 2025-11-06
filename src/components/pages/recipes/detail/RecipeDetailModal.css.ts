import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const recipeDetailModalTabBar = style({
  width: '100%',
  position: 'sticky',
  top: 52,
  zIndex: 900,
  boxShadow: themeVars.shadow.light,
}); 