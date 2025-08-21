import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const loginContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "375px",
  width: "100%",
  gap: "20px",
});

export const lineBox = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  padding: "0 20px",
});

export const line = style({
  width: "26%",
  height: "2px",
  background: themeVars.colors.gray.gray200,
});
