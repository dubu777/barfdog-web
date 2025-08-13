import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const cartContainer = style({
  backgroundColor: themeVars.colors.gray.gray0,
  paddingBottom: '85px',
})

export const cartItemControls = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px 16px',
  borderBottom: `1px solid ${themeVars.colors.gray.gray200}`
})

export const deleteButton = style({
  minWidth: '50px',
})

export const cartListBox = style({
  padding: '24px 20px',
})

export const cartItemList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
})

export const cartSoldOutTitle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: '24px 20px 0'
})
