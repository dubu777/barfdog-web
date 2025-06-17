import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const defaultButtonStyle = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease, opacity 0.3s ease",
    padding: "0 16px",
    gap: "10px",
    textAlign: "center",
    lineHeight: "1",
    verticalAlign: "middle",
  },
  variants: {
    type: {
      main: {
        border: "none",
        backgroundColor: themeVars.colors.red.red,
        color: themeVars.colors.gray.gray0,
      },
      white: {
        border: "none",
        backgroundColor: themeVars.colors.gray.gray0,
        color: themeVars.colors.gray.gray900,
      },
      black: {
        border: "none",
        backgroundColor: themeVars.colors.gray.gray900,
        color: themeVars.colors.gray.gray0,
      },
      gray: {
        border: "none",
        backgroundColor: themeVars.colors.gray.gray200,
        color: themeVars.colors.gray.gray0,
      },
      mainBorder: {
        border: `1px solid ${themeVars.colors.red.red}`,
        backgroundColor: themeVars.colors.gray.gray0,
        color: themeVars.colors.red.red,
      },
      grayBorder: {
        border: `1px solid ${themeVars.colors.gray.gray700}`,
        backgroundColor: themeVars.colors.gray.gray0,
        color: themeVars.colors.gray.gray900,
      },
      blackBorder: {
        border: `1px solid ${themeVars.colors.gray.gray900}`,
        backgroundColor: themeVars.colors.gray.gray0,
        color: themeVars.colors.gray.gray900,
      },
    },
    size: {
      xxs: { fontSize: "10px", minHeight: "19px", padding: "0 8px" },
      xs: { fontSize: "12px", minHeight: "23px", padding: "0 8px" },
      sm: { fontSize: "13px", minHeight: "35px", width: "100%" },
      md: { fontSize: "14px", minHeight: "40px", width: "100%" },
      lg: { fontSize: "16px", minHeight: "45px", width: "100%" },
      xl: { fontSize: "20px", minHeight: "50px", width: "100%" },
      xxl: { fontSize: "20px", minHeight: "54px", width: "100%" },
    },
    borderRadius: {
      sm: { borderRadius: "3px" },
      md: { borderRadius: "15.5px" },
      lg: { borderRadius: "22.5px" },
    },
    isBold: {
      true: { fontWeight: 700 },
      false: { fontWeight: 400 },
    },
    isDisabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.4,
      },
      false: {
        cursor: "pointer",
        opacity: 1,
      },
    },
    isHidden: {
      true: {
        cursor: "default",
        opacity: 0,
      },
      false: {
        cursor: "pointer",
        opacity: 1,
      },
    },
    hover: {
      true: {},
    },
    isActive: {
      true: {
        backgroundColor: themeVars.colors.red.red,
        color: themeVars.colors.gray.gray0,
      },
    },
  },
  compoundVariants: [
    {
      variants: { isDisabled: true, isHidden: false },
      style: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
    {
      variants: { type: "grayBorder", isActive: true },
      style: {
        border: `1px solid ${themeVars.colors.red.red}`,
        color: themeVars.colors.gray.gray0,
      },
    },
  ],
  defaultVariants: {
    size: "md",
    borderRadius: "md",
    isBold: false,
    isDisabled: false,
    hover: true,
  },
});

export const iconStyle = style({
  display: "flex",
  alignItems: "center",
});
