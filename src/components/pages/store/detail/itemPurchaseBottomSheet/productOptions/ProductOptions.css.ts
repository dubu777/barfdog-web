import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const productOptionsContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: "12px",
  padding: "20px",
  backgroundColor: themeVars.colors.gray.gray50,
  maxHeight: "405px",
});

export const productOptionCard = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "normal",
  gap: "8px",
  padding: "12px",
  backgroundColor: themeVars.colors.gray.gray100,
});

export const productOptionInfo = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
