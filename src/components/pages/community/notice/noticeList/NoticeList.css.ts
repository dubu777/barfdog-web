import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const noticeContainer = style({
  backgroundColor: themeVars.colors.gray.gray0,
})

export const noticeFilter = style({
  padding: '20px',
})

export const noticeList = style({
  display: 'flex',
  flexDirection: 'column',
})

export const noticeItem = style({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  borderBottom: `2px solid ${themeVars.colors.gray.gray50}`,
})