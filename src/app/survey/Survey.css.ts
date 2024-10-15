import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const surveyLayoutContainer = style({
  height: '100%',
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});


export const surveyTitle = style({
  fontSize: themeVars.fontSize["title-sm"],
  paddingBottom: "35px",
});