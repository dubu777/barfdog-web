import {style} from "@vanilla-extract/css";
import {defaultWidth} from "@/styles/common.css";
import {themeVars} from "@/styles/theme.css";

export const rewardsContainer = style([defaultWidth, {}]);

export const totalRewardsBox = style({
  border: `1px solid ${themeVars.borderColors.grey79}`,
  borderRadius: '5px',
  padding: '20px 26px',
  marginBottom: '31px',
});

export const questionMarkBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
});

export const totalReward = style({
  fontSize: themeVars.fontSize["text-md"],
  marginTop: '10px',
  marginBottom: '23px',
});

export const total = style({
  fontSize: themeVars.fontSize["text-xl"],
});

export const rewardInfoBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
});

export const rewardInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: themeVars.fontSize["text-sm"]
});
