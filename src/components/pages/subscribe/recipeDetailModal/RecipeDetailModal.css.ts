import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const recipeDetailContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: themeVars.colors.gray.gray0,
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  scrollPaddingTop: "109px",
});

export const recipeDetailTabBarWrapper = style({
  position: "sticky",
  top: "52px",
  zIndex: 1,
  width: "100%",
  backgroundColor: themeVars.colors.gray.gray0,
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  boxShadow: themeVars.shadow.light,
});

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

export const mealSelectorBox = style({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  backgroundColor: themeVars.colors.gray.gray50,
  borderRadius: "8px",
  width: "100%",
  border: `1px solid ${themeVars.colors.gray.gray200}`,
  gap: "12px",
});

export const mealSelectorHelpIcon = style({
  cursor: "pointer",
});
