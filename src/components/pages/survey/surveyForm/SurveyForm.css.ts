import { style } from '@vanilla-extract/css';

export const surveyFormContainer = style({
  width: '100%',
  height: '100%',
  padding: '40px 20px 20px 20px',
});

export const surveyFormWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "20px",
  width: '100%',
  height: '100%',
  maxWidth: '600px',
});
