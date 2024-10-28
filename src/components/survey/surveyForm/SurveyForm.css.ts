import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';


export const surveyFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '32px 30px 0 30px',
  overflow: 'hidden',
  backgroundColor: themeVars.backgroundColors.pinkFa,
});

export const surveyFormWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});
