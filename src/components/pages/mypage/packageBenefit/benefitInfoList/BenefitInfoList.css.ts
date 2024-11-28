import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const benefitsBox = style({
  border: `0.5px solid ${themeVars.borderColors.greyDD}`,
  borderRadius: '10px',
  padding: '18px 0',
  marginBottom: '31px',
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  // boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25)'
  // filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.25))'
});

export const benefitItem = style({
  marginBottom: '20px',
});

export const benefitItemInfo = style({
  fontSize: themeVars.fontSize["text-sm"],
  whiteSpace: 'pre-line',
  lineHeight: 0.8
});
