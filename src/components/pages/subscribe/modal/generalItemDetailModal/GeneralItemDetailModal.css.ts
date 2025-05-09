import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const generalItemTopWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  paddingBottom: "40px",
})

export const quantitySelectorWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "20px",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const quantitySelectorBox = style({
  display: "flex",
  width: "159px",
  padding: "8px 16px",
  justifyContent: "space-between",
  alignItems: "center",
  border: `1px solid ${themeVars.colors.gray.gray200}`,
  borderRadius: "6px",
});
