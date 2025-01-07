import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const inviteRewardContainer = style({
  marginTop: '40px'
})

export const inviteCode = style({
  display: 'flex',
  gap: '9px',
  alignItems: 'center',
})

export const codeInput = style({
  width: '80%',
});

export const codeCreateButton = style({
  width: '20%',
});

export const inviteRewardInfo = style({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '40px',
  paddingBottom: '16px',
  borderBottom: `1px solid ${themeVars.borderColors.greyBB}`
})

export const inviteRewardList = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '16px'
})

export const inviteReward = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  padding: '16px 0'
})

export const rewardPrice = recipe({
  base: {
    marginLeft: 'auto',
    fontSize: themeVars.fontSize["text-md"],
  },
  variants: {
    color: {
      green: {
        color: themeVars.fontColors.green,
      },
      red: {
        color: themeVars.fontColors.mainRed,
      }
    }
  }
})