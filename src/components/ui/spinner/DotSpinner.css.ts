import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

// Keyframes for each dot animation
export const dot1Keyframe = keyframes({
  "0%": { transform: "translateX(26px) scale(1)" },
  "30%": { transform: "translateX(26px) scale(0)" },
  "66%": { transform: "translateX(0)   scale(0)" },
  "100%": { transform: "translateX(0)   scale(0)" },
});

export const dot2Keyframe = keyframes({
  "0%": { transform: "translateX(13px) scale(1)" },
  "33%": { transform: "translateX(26px) scale(1)" },
  "66%": { transform: "translateX(26px) scale(0)" },
  "100%": { transform: "translateX(26px) scale(0)" },
});

export const dot3Keyframe = keyframes({
  "0%": { transform: "translateX(0)   scale(1)" },
  "33%": { transform: "translateX(13px) scale(1)" },
  "66%": { transform: "translateX(26px) scale(1)" },
  "100%": { transform: "translateX(26px) scale(0)" },
});

export const dot4Keyframe = keyframes({
  "0%": { transform: "translateX(0)   scale(0)" },
  "3%": { transform: "translateX(0)   scale(0)" },
  "33%": { transform: "translateX(0)   scale(1)" },
  "66%": { transform: "translateX(13px) scale(1)" },
  "100%": { transform: "translateX(26px) scale(1)" },
});

export const dot5Keyframe = keyframes({
  "0%": { transform: "translateX(0)   scale(0)" },
  "33%": { transform: "translateX(0)   scale(0)" },
  "36%": { transform: "translateX(0)   scale(0)" },
  "66%": { transform: "translateX(0)   scale(1)" },
  "100%": { transform: "translateX(13px) scale(1)" },
});

// Centered container wrapper
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

// Container for the five dots
export const placeLoadArea = style({
  position: "relative",
  width: "44px",
  height: "10px",
});

// Base style for all dots
export const dotBase = style({
  position: "absolute",
  width: "10px",
  height: "10px",
  borderRadius: "5px",
  animationDuration: "1.5s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
});

// Individual dot styles
export const dot1 = style([
  dotBase,
  {
    // backgroundColor: '#9e9e9e',
    backgroundColor: "#F1A3A6",
    animationName: dot1Keyframe,
  },
]);

export const dot2 = style([
  dotBase,
  {
    // backgroundColor: '#e0e0e0',
    backgroundColor: "#BE1A21",
    left: 0,
    animationName: dot2Keyframe,
  },
]);

export const dot3 = style([
  dotBase,
  {
    // backgroundColor: '#bdbdbd',
    backgroundColor: "#FBD7D8",
    left: 0,
    animationName: dot3Keyframe,
  },
]);

export const dot4 = style([
  dotBase,
  {
    // backgroundColor: '#9e9e9e',
    backgroundColor: "#F1A3A6",
    left: 0,
    animationName: dot4Keyframe,
  },
]);

export const dot5 = style([
  dotBase,
  {
    // backgroundColor: '#e0e0e0',
    backgroundColor: "#BE1A21",
    left: 0,
    animationName: dot5Keyframe,
  },
]);
