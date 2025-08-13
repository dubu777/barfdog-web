import { style } from "@vanilla-extract/css";

export const itemPurchaseContainer = style({
  width: '100%',
})

export const itemPurchaseBox = style({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

export const itemPurchaseTitle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '6px',
})

export const itemPurchasePrice = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
})

export const itemPurchaseTotalPrice = style({
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})