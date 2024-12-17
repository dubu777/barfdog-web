import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const addressInfoTitle = style({
  lineHeight: 1.2,
  marginBottom: '22px',
});

export const addressBox = style({
  border: `1px solid ${themeVars.borderColors.greyDD}`,
  borderRadius: '3px',
  padding: '20px 11px',
});

export const subscriptionDogName = style({
  padding: '0 21px 13px',
  borderBottom: `1px solid ${themeVars.borderColors.greyDD}`,
});

export const addressContents = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  padding: '13px 21px',
});

export const productionDates = style({
  padding: '15px 21px',
  borderTop: `1px solid ${themeVars.borderColors.greyDD}`,
});

export const changeButtons = style({
  display: 'flex',
  gap: '14px',
  padding: '0 35px',
});