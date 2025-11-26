import { style } from "@vanilla-extract/css";

export const surveyResultLoadingContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  gap: "8px",
  padding: "100px 20px 0 20px",
});

export const titleText = style({
  display: "inline",
  "@media": {
    "(min-width: 330px)": {
      display: "inline",
    },
    "(max-width: 329px)": {
      display: "block",
    },
  },
});

export const descriptionText = style({
  display: "inline",
  textAlign: "center",
  "@media": {
    "(min-width: 381px)": {
      display: "inline",
    },
    "(max-width: 380px)": {
      display: "block",
    },
  },
});
