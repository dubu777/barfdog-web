import { style } from "@vanilla-extract/css";

export const cartPriceInfoContainer = style({
  padding: '40px 0',
})

export const priceInfoList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '10px'
})

export const priceInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
})