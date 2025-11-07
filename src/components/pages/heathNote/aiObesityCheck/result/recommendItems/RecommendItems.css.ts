import { style } from "@vanilla-extract/css";

export const recommendItemBox = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px 8px',
})

export const recommendItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
})

export const recommendItemImage = style({
  width: '100%',
  height: 'auto',
  aspectRatio: '1 / 1',
  objectFit: 'cover',
  borderRadius: '6px',
})