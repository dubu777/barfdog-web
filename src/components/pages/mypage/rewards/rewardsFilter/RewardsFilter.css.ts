import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const rewardFilterContainer = style({
  display: 'flex',
  gap: '11px',
  marginBottom: '31px',
});

export const rewardListHeader = style({
  borderBottom: `1px solid ${themeVars.borderColors.greyDD}`,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 6px 9px'
});

export const selectedMonth = style({
  width: 'auto',
  maxWidth: '100px',
});
