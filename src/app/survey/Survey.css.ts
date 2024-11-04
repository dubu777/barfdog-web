import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const surveyLayoutContainer = style({
  minHeight: 'calc(100vh - 153px)',
  width: '100%',
  marginTop: '62px',
  marginBottom: '50px',
  backgroundColor: themeVars.backgroundColors.pinkFa,
});

export const surveyTitle = style({
  fontSize: themeVars.fontSize["title-sm"],
  paddingBottom: "35px",
});

export const surveyInputWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  minWidth: '300px',
})