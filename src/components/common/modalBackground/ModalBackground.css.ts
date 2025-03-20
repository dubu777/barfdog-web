import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const modalBackground = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  zIndex: 300,
});

export const modalContent = style({
  background: themeVars.backgroundColors.white,
  padding: '20px',
  borderRadius: '10px',
  width: '100%',
  maxWidth: '300px',
  height: '300px',
  overflowY: 'auto',
});