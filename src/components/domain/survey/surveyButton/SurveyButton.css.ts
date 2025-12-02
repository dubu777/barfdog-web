import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const surveyButtonContainer = recipe({
  base: {
    position: "relative",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    boxShadow: themeVars.shadow.light,
    transition: "box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    ":hover": {
      boxShadow: themeVars.shadow.normal,
    },
  },
  variants: {
    isChecked: {
      true: {
        backgroundColor: themeVars.colors.red.pinkWhite,
        border: `1px solid ${themeVars.colors.red.red}`,
        selectors: {
          "&:disabled": {
            backgroundColor: themeVars.colors.gray.gray200,
            border: `1px solid ${themeVars.colors.gray.gray500}`,
          },
        },
      },
      false: {
        backgroundColor: themeVars.colors.gray.gray0,
        border: `1px solid ${themeVars.colors.gray.gray200}`,
        selectors: {
          "&:disabled": {
            boxShadow: "unset",
            backgroundColor: themeVars.colors.gray.gray50,
            border: `1px solid ${themeVars.colors.gray.gray300}`,
          },
        },
      },
    },
    isNormal: {
      true: {
        justifyContent: "center",
        padding: "20px 10px",
      },
      false: {
        justifyContent: "flex-start",
        padding: "20px 24px",
      },
    },
  },
  defaultVariants: {
    isChecked: false,
    isNormal: false,
  },
});

export const surveyButtonContentWrapper = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "4px",
  },
  variants: {
    isNormal: {
      true: {
        justifyContent: "center",
      },
      false: {
        justifyContent: "flex-start",
      },
    },
  },
  defaultVariants: {
    isNormal: false,
  },
});

export const chipsButton = style({
  position: "absolute",
  top: "4px",
  left: "4px",
});
