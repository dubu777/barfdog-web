import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const cartContainer = style({
  marginTop: '62px',
  marginBottom: '60px',
  padding: '0 20px',
})

export const cartTitle = style({
  margin: '40px 0',
})

export const cartItemControls = style({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '12px',
  borderBottom: `1px solid ${themeVars.borderColors.greyBB}`
})

export const cartItemList = style({
  display: 'flex',
  flexDirection: 'column',
})
