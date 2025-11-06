import { style } from "@vanilla-extract/css";

export const storeItem = style({
  width: 'calc(100% / 2 - 4px)',
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