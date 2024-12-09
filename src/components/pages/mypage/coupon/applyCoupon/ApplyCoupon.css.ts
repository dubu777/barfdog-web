import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const couponInputContainer = style({
  display: 'flex',
  gap: '9px',
  alignItems: 'center',
  marginTop: '17px',
});

export const couponInput = style({
  width: '80%',
});

export const couponCreateButton = style({
  width: '20%',
});

export const errorMessage = style({
  width: '100%',
  fontSize: themeVars.fontSize["text-xs"],
  color: themeVars.colors.mainRed,
  textAlign: 'left',
  marginTop: '8px',
  marginLeft: '8px',
});
