import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewRate = style({
  color: themeVars.fontColors.yellow,
})

export const reviewAccordionBox = style({
  background: themeVars.backgroundColors.greyEE
})

export const reviewTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '3px'
})

export const reviewContent = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

export const reviewImage = style({
  width: '100% !important',
  height: 'auto !important',
  position: 'relative !important' as unknown as 'relative',
  left: 'unset !important',
  top: 'unset !important',
})