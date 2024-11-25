import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

export const cartItem = style({
  display: 'flex',
  padding: '20px 0',
  borderBottom: `1px solid ${themeVars.borderColors.greyDD}`,
})

export const itemInfoBox = style({
  marginLeft: '10px',
})

export const itemInfo = style({
  display: 'flex',
  gap: '6px',
  marginBottom: '10px',
})

export const itemInfoText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '6px',
})

export const originalPrice = style({
  textDecoration: 'line-through',
  color: themeVars.fontColors.grey89,
  fontSize: themeVars.fontSize["text-sm"],
  marginLeft: '5px'
})

export const totalPrice = style({
  marginTop: 'auto',
  marginLeft: 'auto',
})
