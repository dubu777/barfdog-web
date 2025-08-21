import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const spinnerContainer = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  variants: {
    fullscreen: {
      true: { height: "calc(100vh - 52px)" },
    },
  },
});

export const spinner = style({
  position: "relative",
  width: "64px",
  height: "64px",
  display: "inline-block",
});

export const spinnerOuter = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  animation: `${rotate} 0.8s linear infinite`,
});

export const spinnerInner = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "24px",
  height: "24px",
  transform: "translate(-50%, -50%)",
});
