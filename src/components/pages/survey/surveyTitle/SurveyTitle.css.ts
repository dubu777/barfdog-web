import { style } from "@vanilla-extract/css";

export const surveyTitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  paddingBottom: "20px",
});

export const surveySubtitleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: '4px',
});

export const surveyColSubtitleWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: '4px',
});

export const surveyRowSubtitleWrapper = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '4px',
});

export const surveyChipWrapper = style({
  marginTop: '8px',
});

export const surveyInfoBoxWrapper = style({
  marginTop: '12px',
  width: '100%',
});