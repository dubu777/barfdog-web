import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const signupContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px 20px 105px 20px",
  minHeight: "calc(100vh - 52px)",
  backgroundColor: themeVars.colors.gray.gray50,
  overflowY: "auto",
});

export const signupTermsContent = style({
  padding: "10px",
  overflowY: "auto",
  height: "300px",
});
