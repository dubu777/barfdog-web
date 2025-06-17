import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const mainSurveyWrapper = style({
  width: "100%",
  minHeight: "680px",
  backgroundColor: themeVars.colors.red.pastelPink,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "53px 0 45px",
});

export const mainSurveyButton = style({
  width: "180px",
});

export const mainSliderWrapper = style({
  width: "100%",
  height: "auto",
  margin: "29px 0",
});

export const mainSliderContainer = style({
  height: "100%",
  paddingBottom: "27px !important",
});

export const mainSurveySlider = style({
  display: "flex !important",
  justifyContent: "center",
});
