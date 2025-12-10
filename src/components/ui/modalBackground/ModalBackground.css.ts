import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const modalBackground = recipe({
  base: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflowY: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 300,
  },
  variants: {
    isDimmed: {
      true: {
        backgroundColor: themeVars.colors.dimmed.gary60,
      },
      false: {},
    },
  },
});
