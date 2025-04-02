import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const couponCardContainer = recipe({
  base: {
    display: "flex",
    alignItems: "flex-start",
    alignSelf: "stretch",
    padding: "20px",
    backgroundColor: themeVars.colors.gray.gray0,
    borderRadius: "8px",
    gap: "8px",
    border: "1px solid transparent",
    boxShadow: themeVars.shadow.light,
  },
  variants: {
    isSelected: {
      true: {
        border: `1px solid ${themeVars.colors.red.red}`,
      },
      false: {},
    },
  },
});

export const couponCardWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
});
