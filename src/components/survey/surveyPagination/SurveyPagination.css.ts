import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';


export const surveyPaginationContainer = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  left: 0,
  right: 0,
  bottom: 0,
  margin: "0 auto",
  gap: '35px',
  width: '100%',
  height: '66px',
  backgroundColor: themeVars.colors.white,
  zIndex: 10,
});

export const surveyPaginationButtonWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});
