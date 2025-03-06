import { style } from "@vanilla-extract/css";

export const myPageBanner = style({
  width: '100%',
  height: '35px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const bannerLink = style({
  display: 'block',
  width: '100%',
  height: '100%',
  position: 'relative',
})

export const bannerImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})