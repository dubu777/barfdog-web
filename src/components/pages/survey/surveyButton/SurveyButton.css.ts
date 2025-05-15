import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const surveyButtonContainer = recipe({
  base: {
    position: "relative",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    borderRadius: "8px",
    width: "100%",
    height: "64px",
  },
  variants: {
    isChecked: {
      true: {
        backgroundColor: themeVars.colors.red.pinkWhite,
        border: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {
        backgroundColor: themeVars.colors.gray.gray0,
        border: `1px solid ${themeVars.colors.gray.gray200}`,
        boxShadow: themeVars.shadow.light,
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
    }
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
    }
  },
  defaultVariants: {
    isNormal: false,
  },
});