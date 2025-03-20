import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const couponModalContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  maxWidth: "600px",
  width: "100%",
  height: "100vh",
  backgroundColor: themeVars.colors.gray.gray0,
  overflowY: "auto",
  padding: "52px 0 128px 0",
});

export const couponModalContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "8px",
  padding: "20px",
});

export const couponApplyWrapper = style({
  display: "flex",
  width: "100%",
  gap: "8px",
});

export const couponCardWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
  padding: "20px 20px 108px 20px",
  backgroundColor: themeVars.colors.gray.gray50,
});
