import { style } from '@vanilla-extract/css';
import { themeVars } from './theme.css';

export const commonLayoutContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minWidth: '320px',
  maxWidth: '600px',
  minHeight: '100%',
  margin: '0 auto',
  backgroundColor: themeVars.colors.white,
});
