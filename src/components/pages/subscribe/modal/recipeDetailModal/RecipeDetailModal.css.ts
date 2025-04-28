import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const recipeDetailContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: themeVars.colors.gray.gray0,
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  marginTop: "26px",
  scrollPaddingTop: "109px",
})

export const recipeDetailTabBarWrapper = style({
  position: "sticky",
  top: "52px",
  zIndex: 1,
  width: "100%",
  backgroundColor: themeVars.colors.gray.gray0,
})

export const recipeDetailSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
  padding: "20px",
  gap: "20px",
  scrollMarginTop: "109px",
});