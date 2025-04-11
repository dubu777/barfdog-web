import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const surveyButtonContainer = recipe({
  base: {
    display: "flex",
    gap: "12px",
    padding: "20px 24px",
    alignItems: "center",

    borderRadius: "8px",
    width: "100%",
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
      },
      false: {
        justifyContent: "flex-start",
      },
    }
  },
  defaultVariants: {
    isChecked: false,
  },
});
