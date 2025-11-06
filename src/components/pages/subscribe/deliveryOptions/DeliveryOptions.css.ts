import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const deliveryOptionsContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const selectOptionWrapper = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    gap: "16px",
  },
  variants: {
    source: {
      edit: {
        padding: "20px",
      },
      order: {
        padding: "28px 20px",
      },
    },
  },
  defaultVariants: {
    source: "order",
  },
});

export const mealFrequencyButtonWrapper = style({
  width: "100%",
});

export const deliveryCycleGrid = style({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "8px",
});
