import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";


export const bundleDeliverySelectorContainer = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
})

export const bundleDeliverySelectorBox = recipe({
  base: {
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  variants: {
    isSelected: {
      true: {
        border: `1px solid ${themeVars.borderColors.mainRed}`,
        color: themeVars.colors.mainRed,
      },
      false: {
        border: `1px solid ${themeVars.borderColors.black}`,
        color: themeVars.colors.black,
      }
    }
  },
  defaultVariants: {
    isSelected: false,
  }
})