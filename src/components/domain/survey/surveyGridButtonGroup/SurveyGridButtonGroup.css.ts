import { style } from "@vanilla-extract/css";

export const surveyGridButtonContainer = style({
  display: "flex",
  width: "100%",
  justifyContent: "center",
});

export const surveyGridButtonWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  rowGap: "12px",
  width: "100%",
});

export const surveyGridButtonLayoutWrapper = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "8px",
  flexWrap: "wrap",
});
