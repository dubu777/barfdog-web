import { style } from "@vanilla-extract/css";

export const storeItem = style({
  width: 'calc(100% / 2 - 4px)',
})

export const storeLink = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

export const itemImageBox = style({
  width: '100%',
  height: 'auto',
  aspectRatio: '1 / 1',
  position: 'relative',
})

export const itemTags = style({
  display: 'flex',
  gap: '3px',
  position: 'absolute',
  top: '4px',
  left: '4px',
  zIndex: '50 !important',
})

export const itemImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
})

export const itemInfoBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

export const itemDiscount = style({
  display: 'flex',
  flexDirection: 'column',
})

export const itemContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

export const itemSalePriceBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

export const itemSalePrice = style({
  textDecoration: 'line-through'
})