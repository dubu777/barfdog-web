import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const manageSubscriptionTitle = style({
  padding: '20px',
  borderBottom: `2px solid ${themeVars.colors.gray.gray50}`,
  backgroundColor: themeVars.colors.gray.gray0,
  display: 'flex',
  flexDirection: 'column',
})

export const manageSubscriptionCount = style({
  margin: '28px 0 8px'
})

export const manageSubscriptionTabBar = style({
  padding: '20px',
  backgroundColor: themeVars.colors.gray.gray0,
})

export const manageSubscriptionList = style({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})