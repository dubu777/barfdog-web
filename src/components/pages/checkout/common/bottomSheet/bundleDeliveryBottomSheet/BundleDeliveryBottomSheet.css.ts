import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const bundleBottomSheetTitleWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  padding: "20px",
  gap: "20px",
  backgroundColor: themeVars.colors.gray.gray0,
})

export const bundleBottomSheetCardWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "20px",
  backgroundColor: themeVars.colors.gray.gray50,
  gap: "8px",
  marginBottom: "85px",
})