import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const rewardFilterContainer = style({
  padding: '20px 20px 10px',
  borderBottom: `1px solid ${themeVars.colors.gray.gray200}`,
});

export const rewardFilter = style({
  display: 'flex',
  gap: '8px',
  justifyContent: 'space-between',
  marginBottom: '20px',
});