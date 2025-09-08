import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const inputContainerStyle = style({});

export const inputBoxStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const inputWrapStyle = style({
  height: "48px",
  textAlign: "left",
  display: "flex",
});

export const inputBaseStyle = style({
  width: "100%",
  padding: "12px 20px",
  color: themeVars.colors.gray.gray900,
});

export const inputVariants = {
  box: style({
    borderRadius: "8px",
    border: `1px solid ${themeVars.colors.gray.gray300}`,
    backgroundColor: themeVars.colors.gray.gray0,
    selectors: {
      "&::placeholder": {
        color: themeVars.colors.gray.gray300,
      },
      "&.disabled": {
        backgroundColor: themeVars.colors.gray.gray200,
      },
      "&.disabled::placeholder": {
        color: themeVars.colors.gray.gray500,
      },
    },
  }),
  line: style({
    border: "none",
    padding: "12px 4px",
    borderBottom: `1px solid ${themeVars.colors.gray.gray500}`,
  }),
};

export const inputError = {
  box: style({
    border: `1px solid ${themeVars.colors.red.red}`,
  }),
  line: style({
    borderBottom: `1px solid ${themeVars.colors.red.red}`,
  }),
};

export const inputStyle = style({
  width: "100%",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "148%",
  letterSpacing: "-0.4px",
  textAlign: "left",
  selectors: {
    "&::placeholder": {
      color: themeVars.colors.gray.gray300,
    },
    '&[type = "button"]': {
      cursor: "pointer",
      color: themeVars.colors.gray.gray300,
    },
  },
});

export const confirmButtonStyle = style({
  padding: "12px 14.5px !important",
  width: "20%",
  maxWidth: "84px",
});

export const searchButtonStyle = style({
  width: "24px",
  height: "24px",
  marginRight: "12px",
});

export const rightButtonsStyle = style({
  display: "flex",
  gap: "12px",
});
export const unitStyle = style({
  display: "flex",
  gap: "12px",
});

export const baseButtonStyle = style({
  width: "24px",
  height: "24px",
});
