import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const counterContainer = recipe({
  base: {
    width: "100px",
    height: "32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${themeVars.colors.gray.gray200}`,
    borderRadius: "6px",
    padding: "0 4px",
    background: themeVars.colors.gray.gray0,
  },
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});

export const countButton = style({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transform: "transform 0.3s ease",
  borderRadius: "4px",
  selectors: {
    "&:not(:disabled):hover": {
      backgroundColor: themeVars.colors.gray.gray50,
    },
    "&:disabled": {
      cursor: "auto",
    },
  },
});

export const countText = style({
  minWidth: "32px",
  textAlign: "center",
});
