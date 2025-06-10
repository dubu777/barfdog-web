import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const bodyCheckCardContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "12px",
  backgroundColor: themeVars.colors.gray.gray0,
  borderRadius: "12px",
  width: "100%",
  height: "120px",
  boxShadow: themeVars.shadow.light,
  cursor: "pointer",
});

export const bar = style({
  width: "100%",
  height: "8px",
  backgroundColor: themeVars.colors.gray.gray200,
  borderRadius: "8px",
});

export const barProgress = recipe({
  base: {
    borderRadius: "8px",
  },
  variants: {
    part: {
      gut: {
        backgroundColor: themeVars.colors.green.green400,
      },
      skin: {
        backgroundColor: themeVars.colors.blue.blue400,
      },
      obesity: {
        backgroundColor: themeVars.colors.yellow.yellow400,
      },
    },
  },
});
