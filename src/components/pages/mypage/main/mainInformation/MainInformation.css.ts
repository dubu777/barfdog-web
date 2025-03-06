import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const userInfoContainer = style({
  background: themeVars.colors.gray.gray50,
})

export const accountLink = style({
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
})

export const accountImage = style({
  borderRadius: '50%',
  objectFit: 'cover',
})

export const userName = style({
  marginLeft: '16px',
  marginRight: '12px',
})

export const membership = style({
  background: themeVars.colors.gray.gray0,
  padding: '12px 20px',
})

export const membershipInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${themeVars.colors.gray.gray200}`,
  paddingBottom: '8px',
  marginBottom: '8px',
})

export const userReward = style({
  display: 'flex',
  gap: '4px',
  marginTop: '4px',
})

export const rewardItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: 'calc(100% / 3)',
  background: themeVars.colors.gray.gray0,
  padding: '8px 20px',
})