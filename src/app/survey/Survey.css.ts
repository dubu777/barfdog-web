import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const surveyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  padding: '32px 25px 0 25px',
  backgroundColor: themeVars.backgroundColors.pinkFa,
});

export const surveyLayoutContainer = style({
  height: '100%',
});

export const surveyTitle = style({
  fontSize: themeVars.fontSize["title-md"],
  paddingBottom: "35px",
});