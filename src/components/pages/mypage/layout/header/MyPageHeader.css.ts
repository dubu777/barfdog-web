import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const myPageHeader = style({
  position: 'fixed',
  background: themeVars.colors.gray.gray0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px 20px',
  zIndex: 900,
  borderBottom: `2px solid ${themeVars.colors.gray.gray50}`,
})

export const headerLeft = style({
  display: 'flex',
  gap: '12px'
})

export const goBackButton = style({
  marginRight: 'auto',
  cursor: 'pointer',
})

export const title = style({
  width: '100%',
  textAlign: 'center',
  fontSize: themeVars.fontSize["text-xl"],
  fontWeight: themeVars.fontWeight.bold,
})

export const cartButton = style({
  position: 'relative',
  width: '24px',
  height: '24px',
})

export const cartCount = style({
  position: 'absolute',
  width: '17px',
  height: '18px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: themeVars.colors.gray.gray0,
  fontSize: themeVars.fontSize["text-xs"],
  top: -11,
  right: -5,
  background: `url('/images/icons/cartCircle.png') no-repeat center center / 17px 17px`,
})