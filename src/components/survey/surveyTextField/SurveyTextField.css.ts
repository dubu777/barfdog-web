import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const textFieldContainer = style({
  cursor: "pointer",
  width: '100%',
});



export const textInputWrapper = style({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: '54px',
  borderRadius: "9px",
  padding: '16px 19px',
  border: `0.2px solid ${themeVars.borderColors.greyDD}`,
  backgroundColor: themeVars.colors.white,
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  selectors: {
    "&:hover": {
      borderColor: themeVars.borderColors.redAF,
    },
    "&:focus-within": {
      borderColor: themeVars.borderColors.redAF,
    },
  },
});

export const textInput = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: '100%',
  fontSize: themeVars.fontSize["text-sm"],
  outline: "0",
  border: "0",
  textAlign: "start",
  "::selection": {
    backgroundColor: themeVars.colors.mainRed,
    color: themeVars.colors.white,
  },
});

export const unitStyle = style({
  color: themeVars.colors.mainRed
});