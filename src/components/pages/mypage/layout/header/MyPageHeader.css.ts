import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

export const myPageHeader = style({
  position: 'fixed',
  background: themeVars.colors.gray.gray0,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '14px 20px',
  zIndex: 900,
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