import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const cardBaseStyle = style({
  // display: "flex",
  // flexDirection: "column",
});

export const cardColorStyle = {
  gray0: style({
    backgroundColor: themeVars.colors.gray.gray0,
  }),
  gray50: style({
    backgroundColor: themeVars.colors.gray.gray50,
  }),
  gray100: style({
    backgroundColor: themeVars.colors.gray.gray100,
  }),
};

export const cardShadow = {
  light: style({
    boxShadow: themeVars.shadow.light,
  }),
  normal: style({
    boxShadow: themeVars.shadow.normal,
  }),
  strong: style({
    boxShadow: themeVars.shadow.strong,
  }),
  none: style({
    boxShadow: "none",
  }),
};

export const cardPadding = {
  0: style({
    padding: "0",
  }),
  12: style({
    padding: "12px",
  }),
  16: style({
    padding: "16px",
  }),
  20: style({
    padding: "20px",
  }),
  "20/16": style({
    padding: "20px 16px",
  }),
};
export const cardGap = {
  0: style({
    gap: "0",
  }),
  4: style({
    gap: "4px",
  }),
  8: style({
    gap: "8px",
  }),
  12: style({
    gap: "12px",
  }),
  16: style({
    gap: "16px",
  }),
  "20": style({
    gap: "20px",
  }),
};

export const cardAlign = {
  left: style({
    textAlign: "left",
  }),
  center: style({
    textAlign: "center",
  }),
};

export const cardBorderRadius = {
  default: style({
    borderRadius: "8px",
  }),
  none: style({
    borderRadius: 0,
  }),
  "12": {
    borderRadius: "12px",
  },
};
