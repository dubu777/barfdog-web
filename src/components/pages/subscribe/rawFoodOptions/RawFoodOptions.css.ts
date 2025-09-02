import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const subscribeOptionContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
  backgroundColor: themeVars.colors.gray.gray50,
});

export const recipeSelectTitleWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  gap: "20px",
  padding: "0 20px 10px 20px",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const recipeTabBarWrapper = style({
  position: "sticky",
  top: "52px",
  zIndex: 1,
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  padding: "10px 20px 20px 20px",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const recipeSelectWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export const recipeSelectBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "32px 20px",
  scrollMarginTop: "90px",
});

export const recipeTitleWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  marginBottom: "20px",
});

export const recipeCardWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "8px",
});
