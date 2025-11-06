import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const myRecommendationCode = style({
  padding: '8px 12px !important',
  height: 'auto !important',
  marginTop: '4px'
})

export const codeActionButton = style({
  width: '100%',
  padding: '6px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  cursor: 'pointer',
})

export const rewardListTopBox = style({
  width: 'calc(100% / 3)',
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 20px',
  background: themeVars.colors.gray.gray0,
  gap: '4px',
})

export const sendMessageInput = style({
  display: 'inline-block !important',
  maxWidth: '98px',
  margin: '0 4px 4px',
})