import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const bundleDeliveryContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
});

export const bundleDeliveryBox = recipe({
  base: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  variants: {
    isSelected: {
      true: {
        border: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {
        border: `1px solid ${themeVars.colors.gray.gray200}`,
      },
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});
