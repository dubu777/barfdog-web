import { style } from '@vanilla-extract/css';
import { themeVars } from '@/styles/theme.css';

export const summaryBarContainer = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: '60px',
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  width: "100%",
  minWidth: "320px",
  maxWidth: "600px",
  margin: "0 auto",
  height: "70px",
  padding: '40px 10px',
  zIndex: 200,
  backgroundColor: themeVars.backgroundColors.pinkF1
});