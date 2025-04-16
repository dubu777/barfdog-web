// src/components/survey/SurveyProgressBar.css.ts
import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const progressBarContainer = style({
  display: 'flex',
  gap: '4px',
  height: '4px',
  margin: '8px 20px',
});

export const progressSection = style({
  position: 'relative',
  flexGrow: 1,
  backgroundColor: themeVars.colors.gray.gray200,
  borderRadius: '2px',
});

export const progressSectionFill = style({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  backgroundColor: themeVars.colors.red.red,
  borderRadius: '2px',
  transition: 'width 0.3s ease',
});