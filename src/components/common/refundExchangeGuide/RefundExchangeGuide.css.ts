import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const refundExchangeGuideContainer = style({
  marginTop: '10px',
  paddingBottom: '40px',
})

export const guideTitle = style({
  height: '50px',
  background: themeVars.backgroundColors.greyF7,
  textAlign: 'center',
  lineHeight: '50px',
})

export const guideContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  marginTop: '20px'
})

export const guideItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  lineHeight: 'inherit',
})