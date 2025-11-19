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
        transition: "transform 0.4s ease",
        transform: "translate3d(0, 0, 0)" /* 미리 GPU 레이어 생성 */,
        backfaceVisibility: "hidden",
        ":hover": {
          transform: "scale(0.99) translate3d(0, 0, 0)",
          willChange: "transform",
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
