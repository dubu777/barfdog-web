import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const loginContainer = style({
  padding: "0 55px",
  minWidth: "281px",
  width: "80%",
  height: "100vh",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const loginTitle = style({
  fontSize: themeVars.fontSize["title-md"],
  fontWeight: themeVars.fontWeight.bold,
  marginBottom: "7px",
});

export const loginDescription = style({
  fontSize: themeVars.fontSize["text-sm"],
  color: themeVars.colors.gray.gray700,
  marginBottom: "26px",
});

export const submitButtons = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
