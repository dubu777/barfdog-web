import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const petModalContainer = style({
  maxWidth: "600px",
  width: "100%",
  height: "100vh",
  backgroundColor: themeVars.colors.gray.gray50,
});

export const completeCreateWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "80px 20px",
  width: "100%",
  height: "calc(100vh - 52px)",
  backgroundColor: themeVars.colors.gray.gray50,
});

export const completeCreateTitle = style({
  marginTop: "12px",
});
