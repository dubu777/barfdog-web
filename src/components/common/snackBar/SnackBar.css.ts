import { themeVars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const snackBarContainer = style({
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
  width: '100%',
  minHeight: "48px",
  maxWidth: "560px",
});

export const snackBarPosition = {
  'bottom': style({
    bottom: '20px',
  }),
  'above-button': style({
    bottom: '108px',
  })
}

export const snackBarItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: themeVars.colors.dimmed.gray80,
  boxShadow: themeVars.shadow.normal,
  borderRadius: '8px',
  padding: '14px 12px 14px 20px',
  opacity: 1,
});

export const snackBarContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: "3px",
});
