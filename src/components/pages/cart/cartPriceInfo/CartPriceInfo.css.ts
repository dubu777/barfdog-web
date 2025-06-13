import { style } from "@vanilla-extract/css";

export const cartPriceInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '28px 20px',
})

export const priceInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})