import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const bodyCheckChipsStyle = style({
  margin: "20px 0 12px 0",
});

export const phaseTextStyle = style({
  whiteSpace: "nowrap",
});

export const freshGutInfoBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "start",
  border: `1px dashed ${themeVars.colors.red.red}`,
  borderRadius: "20px",
  backgroundColor: themeVars.colors.gray.gray0,
  padding: "12px",
  width: "100%",
});
