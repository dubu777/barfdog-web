import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';


export const surveyFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '32px 25px 0 25px',
  backgroundColor: themeVars.backgroundColors.pinkFa,
});
