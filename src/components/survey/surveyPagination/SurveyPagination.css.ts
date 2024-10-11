import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';


export const surveyPaginationContainer = style({
  position: 'fixed',
  bottom: 0,
  height: '62px',
  backgroundColor: themeVars.colors.white,
  zIndex: 10,
});

export const prevButton = style({
});

export const nextButton = style({
});
