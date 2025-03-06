import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const applyCouponContainer = style({
  padding: '20px',
  background: themeVars.colors.gray.gray0,
})

export const couponListContainer = style({
  padding: '20px',
  background: themeVars.colors.gray.gray50
})

export const couponSortBy = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const couponList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  marginTop: '20px',
})
