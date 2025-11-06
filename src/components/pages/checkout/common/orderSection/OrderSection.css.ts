import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const OrderSectionTitleWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
});
export const subTitleWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const OrderSectionSubtitle = recipe({
  base: {
    color: themeVars.colors.gray.gray600,
  },
  variants: {
    color: {
      true: {
        color: themeVars.colors.red.red,
      },
      false: {
        color: themeVars.colors.gray.gray600,
      },
    },
  },
  defaultVariants: {
    color: false,
  },
});
