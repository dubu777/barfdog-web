import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const rewardListContainer = style({
  paddingBottom: '80px',
});

export const rewardListContents = style({
  display: 'flex',
  flexDirection: 'column',
});

export const rewardItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: '15px 9px 15px 6px',
  borderBottom: `1px solid ${themeVars.borderColors.greyDD}`,
});

export const rewardName = style({
  marginTop: '10px',
});

export const tradeReward = recipe({
  base: {
    fontSize: themeVars.fontSize["text-sm"]
  },
  variants: {
    status: {
      USED: {
        color: themeVars.buttonColors.greyB9,
      },
      SAVED: {
        color: themeVars.fontColors.green,
      }
    }
  }
});