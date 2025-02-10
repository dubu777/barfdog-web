import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const blogDetailContainer = style({
  marginTop: '64px',
  paddingTop: '30px',
  marginBottom: '60px',
})

export const blogDetailHeader = style({
  padding: '40px 0',
  borderBottom: `1px solid ${themeVars.borderColors.greyDD}`
})

export const blogDetailContents = style({
  padding: '40px 16px',
})