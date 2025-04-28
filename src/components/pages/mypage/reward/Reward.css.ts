import { style } from "@vanilla-extract/css";

export const totalRewardContainer = style({
  padding: '20px',
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