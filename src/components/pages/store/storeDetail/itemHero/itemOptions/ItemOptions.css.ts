import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const selectedOptionsContainer = style({
  paddingBottom: '20px',
  borderBottom: `1px solid ${themeVars.borderColors.greyDD}`,
})

export const selectedOption = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 1rem',
  backgroundColor: themeVars.backgroundColors.purpleFF,
})

export const optionName = style({
  width: '55% !important',
})

export const optionCounter = style({
  width: '20%',
})

export const optionPrice = style({
  width: '15%',
})

export const optionCloseButton = style({
  width: '5%',
  cursor: 'pointer'
})

export const totalPriceContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
})