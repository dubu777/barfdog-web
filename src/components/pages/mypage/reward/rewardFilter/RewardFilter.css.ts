import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const rewardFilterContainer = style({
  padding: '20px',
  background: themeVars.colors.gray.gray0,
});

export const rewardFilter = style({
  display: 'flex',
  gap: '8px',
  justifyContent: 'space-between',
});