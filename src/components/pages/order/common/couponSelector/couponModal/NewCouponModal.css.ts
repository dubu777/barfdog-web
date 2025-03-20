import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const couponModalContainer = style({
  maxWidth: "600px",
  width: "100%",
  height: "100vh",
  backgroundColor: themeVars.colors.gray.gray0,
  padding: "52px 0 88px 0",
});

export const couponModalWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  selectors: {
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: themeVars.colors.gray.gray100,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: themeVars.colors.gray.gray300,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: themeVars.colors.gray.gray400, 
    },
  }
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
  padding: "20px 20px 20px 20px",
  backgroundColor: themeVars.colors.gray.gray50,
});
