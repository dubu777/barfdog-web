import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const cardShadow = {
  light: style({
    boxShadow: themeVars.shadow.light,
  }),
  normal: style({
    boxShadow: themeVars.shadow.normal,
  }),
  strong: style({
    boxShadow: themeVars.shadow.strong,
  }),
  none: style({
    boxShadow: "none",
  }),
};

export const cardRecipe = recipe({
  base: {},
  variants: {
    hoverShadow: {
      true: {
        transition: "box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        ":hover": {
          boxShadow: themeVars.shadow.normal,
        },
      },
      false: {},
    },
    hoverScale: {
      true: {
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
        ":hover": {
          transform: "scale(0.99)",
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    hoverShadow: false,
    hoverScale: false,
  },
});
