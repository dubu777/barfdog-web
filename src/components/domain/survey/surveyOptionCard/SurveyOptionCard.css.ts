import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const surveyOptionCardContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
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
    imageWrapperSize: {
      100: { height: "100px" },
      114: { height: "114px" },
    },
  },
  defaultVariants: {
    isChecked: false,
  },
});

export const surveyOptionCardImageWrapper = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: themeVars.colors.gray.gray100,
    height: "100%",
  },
  variants: {
    imageWrapperSize: {
      100: { width: "100px" },
      114: { width: "114px" },
    },
  },
});

export const surveyOptionCardContentWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "4px",
  width: "100%",
});
