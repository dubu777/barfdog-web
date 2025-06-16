import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const inviteFriendsContainer = style({
  padding: '40px 0'
})

export const inviteFriendsInfo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const myRecommendationCode = style({
  padding: '8px 12px !important',
  height: 'auto !important',
  marginTop: '6px'
})

export const rewardInfoList = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 20px',
  gap: '12px',
})

export const rewardInfo = style({
  display: 'flex',
  gap: '10px',
})

export const recommendationCodeBox = style({
  padding: '20px',
})

export const recommendationCode = style({
  background: themeVars.colors.gray.gray0,
  padding: '20px 0 0',
  border: `1px solid ${themeVars.colors.gray.gray300}`,
})

export const recommendationCodeActions = style({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: '20px',
  padding: '8px',
  width: '100%',
  position: 'relative',
  selectors: {
    '&:after': {
      content: '',
      display: 'block',
      width: '1px',
      height: '70%',
      background: themeVars.colors.gray.gray300,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }
  }
})

export const codeActionButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  cursor: 'pointer',
})

export const rewardListTop = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '4px',
})

export const rewardListTopBox = style({
  width: 'calc(100% / 3)',
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 20px',
  background: themeVars.colors.gray.gray0,
  gap: '4px',
})

export const rewardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

export const rewardItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  background: themeVars.colors.gray.gray0,
  padding: '12px 20px',
})

export const rewardItemBottom = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const applyReferralCodeBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  background: themeVars.colors.gray.gray0,
  padding: '20px',
})