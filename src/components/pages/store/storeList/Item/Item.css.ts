import { style } from "@vanilla-extract/css";

export const storeItem = style({
  width: 'calc(100% / 2 - 16px)',
})

export const storeLink = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
})

export const itemImageBox = style({
  width: '100%',
  minHeight: '270px',
  height: 'auto',
  position: 'relative',
  marginBottom: '10px'
})

export const itemTags = style({
  display: 'flex',
  gap: '3px',
  position: 'relative',
  top: 0,
  left: 0,
  zIndex: 100,
})

export const itemImage = style({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
})

export const itemSalePriceBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

export const itemSalePrice = style({
  textDecoration: 'line-through'
})

export const itemReviewInfo = style({
  display: 'flex',
  gap: '10px',
})

export const itemOriginPrice = style({
  display: 'flex',
  gap: '10px',
})