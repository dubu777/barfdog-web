import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';


export const surveyPaginationContainer = style({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '600px',
  minWidth: '320px',
  left: 0,
  right: 0,
  bottom: 0,
  margin: "0 auto",
  width: '100%',
  backgroundColor: themeVars.colors.white,
  zIndex: 10,
});

export const surveyPaginationButtonWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '260px',
  gap: '35px',
  padding: '18px 0',
});

export const progressBarContainer = style({
  width: '100%',
  backgroundColor: themeVars.backgroundColors.greyF2,
  borderRadius: '8px',
  overflow: 'hidden',
  height: '10px',
});

export const progressBar = style({
  height: '100%',
  width: 0,
  backgroundColor: themeVars.backgroundColors.mainRed,
  borderRadius: 'inherit',
  transition: 'width 0.3s ease',
});