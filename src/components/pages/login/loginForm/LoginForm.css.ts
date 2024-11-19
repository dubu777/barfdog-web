import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const loginForm = style({
  width: '100%',
  margin: '30px 0',
});

export const lineBox = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  fontSize: themeVars.fontSize["text-sm"],
  color: themeVars.fontColors.greyA8,
  marginBottom: '30px',
});

export const line = style({
  width: '26%',
  height: '2px',
  background: themeVars.backgroundColors.greyF2
});

export const loginInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const loginControls = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '20px',
});

export const findAccount = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  fontSize: themeVars.fontSize["text-sm"],
});

export const findById = style({
  position: 'relative',
  ':after': {
    content: '',
    display: 'block',
    width: '1px',
    height: '100%',
    background: themeVars.colors.black,
    position: 'absolute',
    top: 0,
    right: '-10px',
  }
});
