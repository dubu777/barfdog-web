import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const couponContainer = style({
  minHeight: 'calc(100vh - 60px)',
  background: themeVars.colors.gray.gray50
})

export const applyCouponContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  background: themeVars.colors.gray.gray0,
})

export const couponListContainer = style({
  padding: '20px',
})

export const couponSortBy = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const couponList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '20px',
})
