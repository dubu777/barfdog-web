import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const orderSheetWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  width: "100%",
});

export const orderCommonWrapper = recipe({
  base: {
    display: "flex",
    gap: "8px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  variants: {
    direction: {
      row: {},
      col: {
        flexDirection: "column",
      },
    },
  },
  defaultVariants: {
    direction: "col",
  },
});

export const orderSheetContentBox = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
});

export const inputButtonWrapper = style({
  height: "48px",
  width: "84px",
});

export const completedContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  padding: "60px 20px 125px 20px",
  minHeight: "100vh",
  backgroundColor: themeVars.colors.gray.gray50,
});
