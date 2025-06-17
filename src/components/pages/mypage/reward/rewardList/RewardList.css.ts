import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const rewardListContainer = style({
  backgroundColor: themeVars.colors.gray.gray50,
});

export const rewardListContents = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: themeVars.colors.gray.gray0,
});

export const rewardItem = style({
  display: "flex",
  flexDirection: "column",
  padding: "12px 20px",
  borderBottom: `2px solid ${themeVars.colors.gray.gray50}`,
});

export const rewardItemBottom = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

export const rewardName = style({
  marginTop: "16px",
});

export const tradeReward = recipe({
  base: {
    fontSize: themeVars.fontSize["text-sm"],
  },
  variants: {
    status: {
      USED: {
        color: themeVars.colors.gray.gray200,
      },
      SAVED: {
        color: themeVars.colors.green.green400,
      },
    },
  },
});
