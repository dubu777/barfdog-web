import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const progressBarBackground = style({
  position: "sticky",
  left: 0,
  right: 0,
  top: '52px',
  width: '100%',
  height: '20px',
  backgroundColor: themeVars.colors.gray.gray50,
  padding: '8px 20px',
  zIndex: 1,
})

export const progressBarContainer = style({
  display: 'flex',
  gap: '4px',
  height: '4px',
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