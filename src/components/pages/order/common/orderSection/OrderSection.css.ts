import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const OrderSectionContainer = style({
  padding: "32px 20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  gap: "16px",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const OrderSectionTitleWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
})


export const OrderSectionSubtitle = recipe({
  base: {
    color: themeVars.colors.gray.gray600,
  },
  variants: {
    isPoint: {
      true: {
        color: themeVars.colors.red.red,
      },
      false: {
        color: themeVars.colors.gray.gray600,
      },
    },
  },
  defaultVariants: {
    isPoint: false,
  },
});
