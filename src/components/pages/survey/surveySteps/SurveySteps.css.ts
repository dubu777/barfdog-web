import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const surveyStep4Container = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

export const birthContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.25rem",
  fontSize: themeVars.fontSize["text-md"],
});

export const walkingContainer = style({
  display: "flex",
  flexDirection: 'column',
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1.25rem",
  fontSize: themeVars.fontSize["text-md"],
});
