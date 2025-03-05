import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const couponCardContainer = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: "15px",
    padding: "10px",
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: themeVars.backgroundColors.mainRed,
        color: themeVars.colors.gray.gray0,
      },
      false: {},
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});
