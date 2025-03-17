import { style } from "@vanilla-extract/css";

export const couponItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const discount = style({
  marginBottom: '4px',
})

export const couponName = style({
  marginBottom: '2px',
})

export const minPrice = style({
  marginTop: '16px',
  marginBottom: '4px',
})

export const expiredDateBox = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const viewItem = style({
  textDecoration: 'underline',
})