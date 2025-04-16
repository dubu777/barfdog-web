import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const surveyStepContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  gap: "20px",
});

export const surveyButtonWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "8px",
  width: "100%",
});

export const surveyErrorWrapper = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
});

export const rowSurveyButtonWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "8px",
  width: "100%",
});

export const colSurveyButtonWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "12px",
  width: "100%",
});

export const birthContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.25rem",
  fontSize: themeVars.fontSize["text-sm"],
  width: '100%',
});

export const walkingContainer = style({
  display: "flex",
  flexDirection: 'column',
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.25rem",
  fontSize: themeVars.fontSize["text-sm"],
  width: '100%',
});

export const errorMessage = style({
  fontSize: themeVars.fontSize["text-xs"],
  color: themeVars.fontColors.mainRed,
  marginTop: '10px',
});
