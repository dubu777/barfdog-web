import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { defaultWidth } from "@/styles/common.css";

export const inviteFriendsContainer = style([defaultWidth, {}])

export const referralCodeBox = style({
  border: `0.5px solid ${themeVars.borderColors.grey79}`,
  padding: '19px',
  borderRadius: '5px',
  marginBottom: '30px',
})

export const referralCodeButtons = style({
  display: 'flex',
  gap: '12px',
  marginTop: '22px',
})

export const infoText = style({
  lineHeight: '24px',
})

export const pointInfoText = style({
  display: 'inline-block',
  lineHeight: '24px',
  padding: '0 10px',
  background: themeVars.colors.mainRed,
  color: themeVars.colors.white,
  marginTop: '10px',
  marginBottom: '14px',
})