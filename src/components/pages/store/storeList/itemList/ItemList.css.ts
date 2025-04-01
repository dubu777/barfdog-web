import { style } from "@vanilla-extract/css";

export const storeItemListContainer = style({
  marginTop: '50px'
})

export const storeItemList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '40px 20px',
  justifyContent: 'flex-start',
})