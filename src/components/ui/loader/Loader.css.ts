import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const loaderContainer = style({
  width: "100%",
  height: "calc(100vh - 52px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const loaderBox = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const rotation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const loader = style({
  width: "48px",
  height: "48px",
  border: "5px solid #FFF",
  borderBottomColor: "#FF3D00",
  borderRadius: "50%",
  display: "inline-block",
  boxSizing: "border-box",
  animation: `${rotation} 1s linear infinite`,
});

// Lottie 애니메이션용 recipe
export const lottieAnimation = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  variants: {
    size: {
      sm: {
        width: "60px",
        height: "60px",
      },
      md: {
        width: "80px",
        height: "80px",
      },
      lg: {
        width: "120px",
        height: "120px",
      },
      xl: {
        width: "160px",
        height: "160px",
      },
    },
  },
  defaultVariants: {
    size: "lg",
  },
});
