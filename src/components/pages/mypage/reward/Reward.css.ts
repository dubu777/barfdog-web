import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const totalRewardContainer = style({
  padding: '20px',
  background: themeVars.colors.gray.gray50,
});

export const totalRewardCard = style({
  marginTop: '10px',
  marginBottom: '12px',
});

export const rewardSummary = style({
  marginTop: '16px',
});

export const summaryInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  selectors: {
    '&:first-child': {
      marginBottom: '4px',
    }
  }
});

export const infiniteTrigger = style({
  height: '72px',
  background: themeVars.colors.gray.gray50,
});