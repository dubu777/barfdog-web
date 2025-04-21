import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const dogImageButtonContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    height: "114px",
  },
  variants: {
    isChecked: {
      true: {
        backgroundColor: themeVars.colors.red.pinkWhite,
        outline: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {
        backgroundColor: themeVars.colors.gray.gray0,
        border: `1px solid ${themeVars.colors.gray.gray200}`,
        boxShadow: themeVars.shadow.light,
      },
    },
  },
  defaultVariants: {
    isChecked: false,
  },
})

export const dogImageButtonContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "4px",
  width: "100%",
});
